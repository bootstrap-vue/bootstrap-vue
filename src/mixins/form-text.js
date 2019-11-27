import { isFunction, isUndefinedOrNull } from '../utils/inspect'

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
      // Only update the `v-model` on blur/change events
      type: Boolean,
      default: false
    },
    debounce: {
      // Debounce timout (in ms). Not applicable with `lazy` prop
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      localValue: this.stringifyValue(this.value),
      vModelValue: this.value
    }
  },
  computed: {
    computedDebounce() {
      // Ensure we have a positive number equal to or greater than 0
      return Math.max(parseInt(this.debounce, 10) || 0, 0)
    },
    computedClass() {
      return [
        {
          // Range input needs class `custom-range`
          'custom-range': this.type === 'range',
          // `plaintext` not supported by `type="range"` or `type="color"`
          'form-control-plaintext':
            this.plaintext && this.type !== 'range' && this.type !== 'color',
          // `form-control` not used by `type="range"` or `plaintext`
          // Always used by `type="color"`
          'form-control': (!this.plaintext && this.type !== 'range') || this.type === 'color'
        },
        this.sizeFormClass,
        this.stateClass
      ]
    },
    computedAriaInvalid() {
      if (!this.ariaInvalid || this.ariaInvalid === 'false') {
        // `this.ariaInvalid` is `null` or `false` or 'false'
        return this.computedState === false ? 'true' : null
      }
      if (this.ariaInvalid === true) {
        // User wants explicit `:aria-invalid="true"`
        return 'true'
      }
      // Most likely a string value (which could be the string 'true')
      return this.ariaInvalid
    }
  },
  watch: {
    value(newVal) {
      const stringifyValue = this.stringifyValue(newVal)
      if (stringifyValue !== this.localValue && newVal !== this.vModelValue) {
        // Clear any pending debounce timeout, as we are overwriting the user input
        this.clearDebounce()
        // Update the local values
        this.localValue = stringifyValue
        this.vModelValue = newVal
      }
    }
  },
  mounted() {
    // Create non-reactive property and set up destroy handler
    this.$_inputDebounceTimer = null
    this.$on('hook:beforeDestroy', this.clearDebounce)
    // Preset the internal state
    const value = this.value
    const stringifyValue = this.stringifyValue(value)
    /* istanbul ignore next */
    if (stringifyValue !== this.localValue && value !== this.vModelValue) {
      this.localValue = stringifyValue
      this.vModelValue = value
    }
  },
  methods: {
    clearDebounce() {
      clearTimeout(this.$_inputDebounceTimer)
      this.$_inputDebounceTimer = null
    },
    stringifyValue(value) {
      return isUndefinedOrNull(value) ? '' : String(value)
    },
    formatValue(value, evt, force = false) {
      value = this.stringifyValue(value)
      if ((!this.lazyFormatter || force) && isFunction(this.formatter)) {
        value = this.formatter(value, evt)
      }
      return value
    },
    modifyValue(value) {
      // Emulate `.trim` modifier behaviour
      if (this.trim) {
        value = value.trim()
      }
      // Emulate `.number` modifier behaviour
      if (this.number) {
        const number = parseFloat(value)
        value = isNaN(number) ? value : number
      }
      return value
    },
    updateValue(value, force = false) {
      const lazy = this.lazy
      const ms = this.computedDebounce
      if (lazy && !force) {
        return
      }
      value = this.modifyValue(value)
      if (value !== this.vModelValue) {
        this.clearDebounce()
        const doUpdate = () => {
          this.vModelValue = value
          this.$emit('update', value)
        }
        if (ms > 0 && !lazy && !force) {
          // Change/Blur/Force will not be debounced
          this.$_inputDebounceTimer = setTimeout(doUpdate, ms)
        } else {
          // Immediately update the v-model
          doUpdate()
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
      this.localValue = formattedValue
      this.updateValue(formattedValue)
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
      this.updateValue(formattedValue, true)
      this.$emit('change', formattedValue)
    },
    onBlur(evt) {
      // Apply the `localValue` on blur to prevent cursor jumps
      // on mobile browsers (e.g. caused by autocomplete)
      const value = evt.target.value
      const formattedValue = this.formatValue(value, evt, true)
      if (formattedValue !== false) {
        // We need to use the modified value here to apply the
        // `.trim` and `.number` modifiers properly
        this.localValue = this.stringifyValue(this.modifyValue(formattedValue))
        // We pass the formatted value here since the `updateValue` method
        // handles the modifiers itself
        this.updateValue(formattedValue, true)
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
