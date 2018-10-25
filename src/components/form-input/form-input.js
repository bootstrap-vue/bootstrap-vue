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
  'date',
  'time',
  'datetime',
  'datetime-local',
  'month',
  'week'
]

export default {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin],
  render (h) {
    return h('input', {
      ref: 'input',
      class: this.inputClass,
      attrs: {
        id: this.safeId(),
        name: this.name,
        type: this.localType,
        disabled: this.disabled,
        required: this.required,
        readonly: this.readonly || (this.plaintext && this.readonly === null),
        placeholder: this.placeholder,
        autocomplete: this.autocomplete || null,
        'aria-required': this.required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      },
      domProps: {
        value: this.localValue
      },
      directives: [
        {
          name: 'model',
          rawName: 'v-model',
          value: (this.localValue),
          expression: 'localValue'
        }
      ],
      on: {
        ...this.$listeners,
        input: this.onInput,
        change: this.onChange
      }
    })
  },
  data () {
    return {
      localValue: null
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
      default: null
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
    },
    noWheel: {
      // Disable mousewheel to prevent wheel from changing values (i.e. number/date).
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
  mounted () {
    if (this.value) {
      this.localValue = this.lazyFormatter ? this.value : this.format(this.value, null)
      if (this.value !== this.localValue) {
        // If the value has changed, we need to emit an input event to update v-model
        this.$emit('input', this.localValue)
      }
    }
    this.setWheelStopper(this.noWheel)
  },
  beforeDestroy () {
    this.setWheelStopper(false)
  },
  watch: {
    value (newVal) {
      this.localValue = this.lazyFormatter ? newVal : this.format(newVal, null)
      if (newVal !== this.localValue) {
        // If the value has changed, we need to emit an input event to update v-model
        this.$emit('input', this.localValue)
      }
    },
    noWheel (newVal) {
      this.setWheelStopper(newVal)
    }
  },
  methods: {
    format (value, e) {
      if (this.formatter) {
        return this.formatter(value, e)
      }
      return value
    },
    onInput (evt) {
      if (evt.target.composing) return
      let value = evt.target.value
      if (!this.lazyFormatter) {
        value = this.format(value, evt)
      }
      this.localValue = this.lazyFormatter ? value : this.format(value, evt)
      this.$emit('input', value)
    },
    onChange (evt) {
      if (evt.target.composing) return
      const value = this.format(evt.target.value, evt)
      if (value !== evt.target.value) {
        this.localValue = value
        // We need to emit an input event to update the v-model
        this.$emit('input', value)
      }
      // We always emit the change event
      this.$emit('change', value)
    },
    setWheelStopper (on) {
      const input = this.$refs.input
      if (on) {
        input.addEventListener('focus', this.onFocus)
      } else {
        input.removeEventListener('focus', this.onFocus)
        input.removeEventListener('blur', this.onBlur)
        input.removeEventListener('wheel', this.stopWheel)
      }
    },
    onFocus (evt) {
      this.$refs.input.addEventListener('wheel', this.stopWheel)
    },
    onBlur (evt) {
      this.$refs.input.removeEventListener('wheel', this.stopWheel)
    },
    stopWheel (evt) {
      evt.preventDefault()
      evt.target.blur()
    }
  }
}
