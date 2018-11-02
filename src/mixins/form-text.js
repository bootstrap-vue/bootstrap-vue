export default {
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
    formatter: {
      type: Function,
      value: null
    },
    lazyFormatter: {
      type: Boolean,
      value: false
    }
  },
  model: {
    prop: 'value',
    event: 'update'
  },
  data () {
    return {
      localValue: this.stringifyValue(this.value)
    }
  },
  watch: {
    value (newVal, oldVal) {
      this.setValue(this.lazyFormatter ? newVal : this.getFormatted(newVal, null))
    }
  },
  mounted () {
    this.setValue(this.lazyFormatter ? this.value : this.getFormatted(this.value, null))
  },
  computed: {
    computedClass () {
      return [
        this.plaintext ? 'form-control-plaintext' : 'form-control',
        {
          // Special class cases for b-form-input input types
          'custom-range': this.type === 'range',
          // plaintext not supported by type=range or type=color
          'form-control-plaintext': this.plaintext && this.type !== 'range' && this.type !== 'color',
          // form-control not used by type=range or plaintext. Always used by type=color
          'form-control': (!this.plaintext && this.type !== 'range') || this.type === 'color'
        },
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
      // Most likely a string value (which could be the string 'true')
      return this.ariaInvalid
    }
  },
  methods: {
    stringifyValue (value) {
      return (value === null || typeof value === 'undefined') ? '' : String(value)
    },
    getFormatted (value, event = null) {
      value = this.stringifyValue(value)
      return this.formatter ? this.formatter(value, event) : value
    },
    setValue (value) {
      value = this.stringifyValue(value)
      if (this.localValue !== value) {
        // Update the v-model only if value has changed
        this.localValue = value
        this.$emit('update', value)
      }
    },
    onInput (evt) {
      // evt.target.composing is set by Vue
      // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
      if (evt.target.composing) return
      this.$emit('input', evt.target.value, evt)
      if (evt.defaultPrevented) return
      const value = evt.target.value
      this.setValue(this.lazyFormatter ? value : this.getFormatted(value, evt))
    },
    onChange (evt) {
      this.setValue(this.getFormatted(evt.target.value, evt))
      this.$emit('change', this.localValue, evt)
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
