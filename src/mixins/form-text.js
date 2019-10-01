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
    lazyFormatter: {
      type: Boolean,
      default: false
    },
    trim: {
      type: Boolean,
      default: false
    },
    number: {
      type: Boolean,
      default: false
    },
    lazy: {
      // Only update the v-model on blur/change events
      type: Boolean,
      default: false
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
      const value = this.stringifyValue(newVal)
      if (value !== this.localValue) {
        this.localValue = value
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
    formatValue(value, evt, applyFormatter = true) {
      value = this.stringifyValue(value)
      // Emulate `.trim` modifier behaviour
      if (this.trim) {
        value = value.trim()
      }
      // Emulate `.number` modifier behaviour
      if (this.number) {
        const num = parseFloat(value)
        value = isNaN(num) ? value : num
      }
      if (applyFormatter && isFunction(this.formatter)) {
        value = this.formatter(value, evt)
      }
      return value
    },
    onInput(evt) {
      // `evt.target.composing` is set by Vue
      // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
      /* istanbul ignore if: hard to test composition events */
      if (evt.target.composing) {
        return
      }
      const value = evt.target.value
      const formattedValue = this.formatValue(value, evt, !this.lazyFormatter)
      // Exit when the `formatter` function strictly returned `false`
      // or prevented the input event
      /* istanbul ignore next */
      if (formattedValue === false || evt.defaultPrevented) {
        evt.preventDefault()
        return
      }
      this.localValue = value
      if (!this.lazy) {
        this.$emit('update', formattedValue)
      }
      this.$emit('input', value)
    },
    onChange(evt) {
      // `evt.target.composing` is set by Vue
      // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
      /* istanbul ignore if: hard to test composition events */
      if (evt.target.composing) {
        return
      }
      const value = evt.target.value
      const formattedValue = this.formatValue(value, evt)
      // Exit when the `formatter` function strictly returned `false`
      // or prevented the input event
      /* istanbul ignore next */
      if (formattedValue === false || evt.defaultPrevented) {
        evt.preventDefault()
        return
      }
      this.localValue = formattedValue
      this.$emit('update', formattedValue)
      this.$emit('change', formattedValue)
    },
    onBlur(evt) {
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
