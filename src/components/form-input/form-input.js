import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import { arrayIncludes } from '../../utils/array'

// Import styles
import './form-input.css'

// Valid supported input types
const TYPES = [
  'text',
  'password',
  'email',
  'number',
  'url',
  'tel',
  'search',
  'range',
  'color',
  `date`,
  `time`,
  `datetime`,
  `datetime-local`,
  `month`,
  `week`
]

export default {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin],
  render (h) {
    return h('input', {
      ref: 'input',
      class: this.inputClass,
      domProps: { value: this.localValue },
      attrs: {
        id: this.safeId(),
        name: this.name,
        type: this.localType,
        disabled: this.disabled,
        required: this.required,
        readonly: this.readonly || this.plaintext,
        placeholder: this.placeholder,
        autocomplete: this.autocomplete || null,
        'aria-required': this.required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      },
      on: {
        input: this.onInput,
        change: this.onChange
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
      default: null
    },
    type: {
      type: String,
      default: 'text',
      validator: type => arrayIncludes(TYPES, type)
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
    formatter: {
      type: Function
    },
    lazyFormatter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localType () {
      // We only allow certain types
      return arrayIncludes(TYPES, this.type) ? this.type : 'text'
    },
    inputClass () {
      return [
        this.plaintext ? 'form-control-plaintext' : 'form-control',
        this.sizeFormClass,
        this.stateClass
      ]
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
      // Most likely a string value (which could be 'true')
      return this.ariaInvalid
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.localValue = newVal
      }
    },
    localValue (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    }
  },
  methods: {
    format (value, e) {
      if (this.formatter) {
        const formattedValue = this.formatter(value, e)
        if (formattedValue !== value) {
          return formattedValue
        }
      }
      return value
    },
    onInput (evt) {
      const value = evt.target.value
      if (this.lazyFormatter) {
        // Update the model with the current unformated value
        this.localValue = value
      } else {
        this.localValue = this.format(value, evt)
      }
    },
    onChange (evt) {
      this.localValue = this.format(evt.target.value, evt)
      this.$emit('change', this.localValue)
    },
    focus () {
      if (!this.disabled) {
        this.$el.focus()
      }
    }
  }
}
