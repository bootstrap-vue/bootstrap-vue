import { isFunction, isNull, isUndefined } from '../utils/inspect'

// @vue/component
export default {
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: [String, Number],
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
    formatter: {
      type: Function,
      default: null
    },
    trim: {
      type: Boolean,
      default: false
    },
    number: {
      type: Boolean,
      default: false
    },
    lazyFormatter: {
      type: Boolean,
      value: false
    }
  },
  data() {
    return {
      localValue: this.stringifyValue(this.value)
    }
  },
  computed: {
    computedClass() {
      return [
        {
          // Range input needs class custom-range
          'custom-range': this.type === 'range',
          // plaintext not supported by type=range or type=color
          'form-control-plaintext':
            this.plaintext && this.type !== 'range' && this.type !== 'color',
          // form-control not used by type=range or plaintext. Always used by type=color
          'form-control': (!this.plaintext && this.type !== 'range') || this.type === 'color'
        },
        this.sizeFormClass,
        this.stateClass
      ]
    },
    computedAriaInvalid() {
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
    value(newVal) {
      if (newVal !== this.localValue) {
        this.localValue = this.stringifyValue(newVal)
      }
    }
  },
  mounted() {
    const value = this.stringifyValue(this.value)
    if (value !== this.localValue) {
      /* istanbul ignore next */
      this.localValue = value
    }
  },
  methods: {
    stringifyValue(value) {
      return isUndefined(value) || isNull(value) ? '' : String(value)
    },
    getFormatted(value, evt, force = false) {
      value = this.stringifyValue(value)
      if ((!this.lazyFormatter || force) && isFunction(this.formatter)) {
        value = this.formatter(value, evt)
      }
      return value
    },
    updateValue(value) {
      value = this.stringifyValue(value)
      if (value !== this.localValue) {
        // Keep the input set to the value before modifiers
        this.localValue = value
        if (this.number) {
          // Emulate `.number` modifier behaviour
          const num = parseFloat(value)
          value = isNaN(num) ? value : num
        } else if (this.trim) {
          // Emulate `.trim` modifier behaviour
          value = value.trim()
        }
        // Update the v-model
        this.$emit('update', value)
      } else if (this.$refs.input && value !== this.$refs.input.value) {
        // When the `localValue` hasn't changed but the actual input value
        // is out of sync, make sure to change it to the given one.
        // Usually casued by browser autocomplete and how it triggers the
        // change or input event, or depending on the formatter function.
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/2657
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/3498
        /* istanbul ignore next: hard to test */
        this.$refs.input.value = value
      }
    },
    onInput(evt) {
      // `evt.target.composing` is set by Vue
      // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
      /* istanbul ignore if: hard to test composition events */
      if (evt.target.composing) {
        return
      }
      const formatted = this.getFormatted(evt.target.value, evt)
      // Exit when the `formatter` function strictly returned `false`
      // or prevented the input event
      if (formatted === false || evt.defaultPrevented) {
        /* istanbul ignore next */
        evt.preventDefault()
        return
      }
      this.updateValue(formatted)
      this.$emit('input', formatted)
    },
    onChange(evt) {
      // `evt.target.composing` is set by Vue
      // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
      /* istanbul ignore if: hard to test composition events */
      if (evt.target.composing) {
        return
      }
      const formatted = this.getFormatted(evt.target.value, evt)
      // Exit when the `formatter` function strictly returned `false`
      // or prevented the input event
      if (formatted === false || evt.defaultPrevented) {
        /* istanbul ignore next */
        evt.preventDefault()
        return
      }
      this.updateValue(formatted)
      this.$emit('change', formatted)
    },
    onBlur(evt) {
      // Lazy formatter
      if (this.lazyFormatter) {
        const formatted = this.getFormatted(evt.target.value, evt, true)
        // Exit when the `formatter` function strictly returned `false`
        if (formatted === false) {
          return
        }
        this.updateValue(formatted)
      }
      // Emit native blur event
      this.$emit('blur', evt)
    },
    focus() {
      // For external handler that may want a focus method
      if (!this.disabled) {
        this.$el.focus()
      }
    },
    blur() {
      // For external handler that may want a blur method
      if (!this.disabled) {
        this.$el.blur()
      }
    }
  }
}
