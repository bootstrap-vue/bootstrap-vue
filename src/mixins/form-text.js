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
    const value = this.stringifyValue(this.value)

    return {
      localValue: value,
      formattedValue: value
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
      const localValue = this.localValue
      if (
        this.trim && value === localValue.trim() ||
        this.number && value === Number(localValue)
      ) {
        // Emulate Vue .trim / .number modifiers
        return
      }
      if (value !== localValue) {
        this.localValue = value
        this.formattedValue = value
      }
    }
  },
  mounted() {
    const value = this.stringifyValue(this.value)
    if (value !== this.localValue) {
      /* istanbul ignore next */
      this.localValue = value
      this.formattedValue = value
    }
  },
  methods: {
    stringifyValue(value) {
      return isUndefined(value) || isNull(value) ? '' : String(value)
    },
    formatValue(value, evt, force = false) {
      value = this.stringifyValue(value)
      if (this.lazy && !force) {
        return value
      }
      // Emulate `.trim` modifier behaviour
      if (this.trim) {
        value = value.trim()
      }
      // Emulate `.number` modifier behaviour
      if (this.number) {
        const num = parseFloat(value)
        value = isNaN(num) ? value : num
      }
      if ((!this.lazyFormatter || force) && isFunction(this.formatter)) {
        value = this.formatter(value, evt)
      }
      return value
    },
    updateValue(value, lazy = false) {
      if (value !== this.formattedValue) {
        this.formattedValue = value
        if (!lazy) {
          this.$emit('update', value)
        }
      }
    },
    onInput(evt) {
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
      this.localValue = value
      this.updateValue(formattedValue, this.lazy)
      this.$emit('input', formattedValue)
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
      this.updateValue(formattedValue, this.lazy)
      this.$emit('change', formattedValue)
    },
    onBlur(evt) {
      // Lazy v-model handling
      if (this.lazy || this.lazyFormatter) {
        const value = evt.target.value
        const formattedValue = this.formatValue(value, evt, true)
        if (formattedValue !== false) {
          this.localValue = formattedValue
          this.updateValue(formattedValue)
        }
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
