import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'

export default {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin],
  render (h) {
    const t = this
    return h('textarea', {
      ref: 'input',
      class: t.inputClass,
      style: t.inputStyle,
      directives: [
        {
          name: 'model',
          rawName: 'v-model',
          value: t.localValue,
          expression: 'localValue'
        }
      ],
      domProps: { value: t.value },
      attrs: {
        id: t.safeId(),
        name: t.name,
        disabled: t.disabled,
        placeholder: t.placeholder,
        required: t.required,
        autocomplete: t.autocomplete || null,
        readonly: t.readonly || t.plaintext,
        rows: t.rowsCount,
        wrap: t.wrap || null,
        'aria-required': t.required ? 'true' : null,
        'aria-invalid': t.computedAriaInvalid
      },
      on: {
        input: function (evt) {
          t.localValue = evt.target.value
        }
      }
    })
  },
  data () {
    return {
      localValue: this.value
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    plaintext: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    rows: {
      type: [Number, String],
      default: null
    },
    maxRows: {
      type: [Number, String],
      default: null
    },
    wrap: {
      // 'soft', 'hard' or 'off'. Browser default is 'soft'
      type: String,
      default: 'soft'
    },
    noResize: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rowsCount () {
      // A better option could be based on https://codepen.io/vsync/pen/frudD
      // As linebreaks aren't added until the input is submitted
      const rows = parseInt(this.rows, 10) || 1
      const maxRows = parseInt(this.maxRows, 10) || 0
      const lines = (this.localValue || '').toString().split('\n').length
      return maxRows
        ? Math.min(maxRows, Math.max(rows, lines))
        : Math.max(rows, lines)
    },
    inputClass () {
      return [
        this.plaintext ? 'form-control-plaintext' : 'form-control',
        this.sizeFormClass,
        this.stateClass
      ]
    },
    inputStyle () {
      // We set width 100% in plaintext mode to get around a shortcoming in bootstrap CSS
      // setting noResize to true will disable the ability for the user to resize the textarea
      return {
        width: this.plaintext ? '100%' : null,
        resize: this.noResize ? 'none' : null
      }
    },
    computedAriaInvalid () {
      if (!this.ariaInvalid || this.ariaInvalid === 'false') {
        // this.ariaInvalid is null or false or 'false'
        return this.computedState === false ? 'true' : null
      }
      if (this.ariaInvalid === true) {
        // User wants explicit aria-invalid=true
        return 'true'
      }
      // Most likely a string value (which could be the string 'true')
      return this.ariaInvalid
    }
  },
  watch: {
    value (newVal, oldVal) {
      // Update our localValue
      if (newVal !== oldVal) {
        this.localValue = newVal
      }
    },
    localValue (newVal, oldVal) {
      // update Parent value
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    }
  },
  methods: {
    focus () {
      // For external handler that may want a focus method
      if (!this.disabled) {
        this.$el.focus()
      }
    }
  }
}
