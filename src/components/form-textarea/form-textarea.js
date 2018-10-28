import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formSelectionMixin from '../../mixins/form-selection'
import formValidityMixin from '../../mixins/form-validity'
import { getCS, isVisible } from '../../utils/dom'

// Event to use for v-model updates
const MODEL_EVENT = 'update:value'

export default {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formSelectionMixin, formValidityMixin],
  render (h) {
    const self = this
    return h('textarea', {
      ref: 'input',
      class: self.computedClass,
      style: self.computedStyle,
      directives: [
        {
          name: 'model',
          rawName: 'v-model',
          value: self.localValue,
          expression: 'localValue'
        }
      ],
      attrs: {
        id: self.safeId(),
        name: self.name,
        disabled: self.disabled,
        placeholder: self.placeholder,
        required: self.required,
        autocomplete: self.autocomplete || null,
        readonly: self.readonly || self.plaintext,
        rows: self.computedRows,
        wrap: self.wrap || null,
        'aria-required': self.required ? 'true' : null,
        'aria-invalid': self.computedAriaInvalid
      },
      domProps: { value: self.value },
      on: {
        ...self.$listeners,
        input: self.onInput,
        change: self.onChange
      }
    })
  },
  data () {
    return {
      // We use the '==' operator here so that undefined will also equal null
      // to ensure that value is always a string
      localValue: this.value == null ? '' : String(this.value),
      // If we cannot auto resize height
      dontResize: true
    }
  },
  model: {
    prop: 'value',
    event: MODEL_EVENT
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
      default: 2
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
      // Use CSS to disable the resize handle of textarea
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (newVal, oldVal) {
      // Update our localValue
      if (newVal !== oldVal) {
        // We use the '==' operator here so that undefined will also = null
        // To ensure that value is always a string
        this.localValue = newVal == null ? '' : String(newVal)
      }
    }
  },
  mounted () {
    this.$nextTick(() => { this.dontResize = false })
  },
  activated () {
    this.$nextTick(() => { this.dontResize = false })
  },
  dectivated () {
    // If we are in a deactivated <keep-alive>, dont try resizing
    this.dontResize = true
  },
  computed: {
    computedClass () {
      return [
        this.plaintext ? 'form-control-plaintext' : 'form-control',
        this.sizeFormClass,
        this.stateClass
      ]
    },
    computedStyle () {
      return {
        // setting noResize to true will disable the ability for the user to
        // resize the textarea. We also disable when in auto resize mode
        resize: (!this.computedRows || this.noResize) ? 'none' : null,
        // The computed height for auto resize
        height: this.computedHeight
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
    },
    computedMinRows () {
      // Ensure rows is at least 1 and positive
      return Math.max(parseInt(this.rows, 10) || 1, 1)
    },
    computedMaxRows () {
      return Math.max(this.computedMinRows, parseInt(this.maxRows, 10) || 0)
    },
    computedRows () {
      return this.computedMinRows === this.computedMaxRows ? this.computedMinRows : null
    },
    computedHeight () {
      const el = this.$el

      // We compare this.localValue to null to ensure reactivity with content changes.
      if (this.localValue === null || this.computedRows || this.dontResize || this.$isServer) {
        return null
      }

      // Element must be visible (not hidden) and in document. *Must* be checked after above.
      if (!isVisible(el)) {
        return null
      }

      // Remember old height and reset it temporarily
      const oldHeight = el.style.height
      // el.style.height = 'auto'
      el.style.height = 'inherit'

      // Get current computed styles
      const computedStyle = getCS(el)
      // Height of one line of text in px
      const lineHeight = parseFloat(computedStyle.lineHeight)
      // Minimum height for min rows (browser dependant)
      const minHeight = parseInt(computedStyle.height, 10) || (lineHeight * this.computedMinRows)
      // Calculate height of content
      const offset = (parseFloat(computedStyle.borderTopWidth) || 0) +
                     (parseFloat(computedStyle.borderBottomWidth) || 0) +
                     (parseFloat(computedStyle.paddingTop) || 0) +
                     (parseFloat(computedStyle.paddingBottom) || 0)
      // Calculate content height in "rows"
      const contentRows = (el.scrollHeight - offset) / lineHeight
      // Put the old height back (needed when new height is equal to old height!)
      el.style.height = oldHeight
      // Calculate number of rows to display
      const rows = Math.min(Math.max(contentRows, this.computedMinRows), this.computedMaxRows)

      // return the new computed height in px units
      return `${Math.max(Math.ceil((rows * lineHeight) + offset), minHeight)}px`
    }
  },
  methods: {
    setValue (val) {
      if (this.localValue !== val) {
        // Update the v-model only if value has changed
        this.localValue = val
        this.$emit(MODEL_EVENT, this.localValue)
      }
    },
    onInput (evt) {
      if (evt.target.composing) return
      const val = evt.target.value
      this.setValue(val)
      this.$emit('input', val, evt)
    },
    onChange (evt) {
      if (evt.target.composing) return
      const val = evt.target.value
      this.setValue(val)
      this.$emit('change', val, evt)
    },
    focus () {
      // For external handler that may want a focus method
      if (!this.disabled) {
        this.$el.focus()
      }
    },
    blur () {
      // For external handler that may want a blur method
      if (!this.disabled) {
        this.$el.blur()
      }
    }
  }
}
