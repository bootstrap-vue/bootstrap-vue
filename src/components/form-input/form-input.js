import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formSelectionMixin from '../../mixins/form-selection'
import formValidityMixin from '../../mixins/form-validity'
import { arrayIncludes } from '../../utils/array'
import { eventOn, eventOff } from '../../utils/dom'

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

// Custom event to update the model
const MODEL_EVENT = 'update:value'

export default {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formSelectionMixin, formValidityMixin],
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
      localValue: ''
    }
  },
  model: {
    prop: 'value',
    event: MODEL_EVENT
  },
  props: {
    value: {
      default: ''
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
      const val = this.lazyFormatter ? this.value : this.getFormatted(this.value, null)
      if (val !== this.value) {
        this.setValue(val)
      }
    }
    this.setWheelStopper(this.noWheel)
  },
  beforeDestroy () {
    /* istanbul ignore next */
    this.setWheelStopper(false)
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal !== oldVal) {
        const val = this.lazyFormatter ? newVal : this.getFormatted(newVal, null)
        if (val !== this.value) {
          this.setValue(val)
        }
      }
    },
    noWheel (newVal) {
      this.setWheelStopper(newVal)
    }
  },
  methods: {
    setValue (val) {
      this.localValue = val
      this.emit(MODEL_EVENT, this.localValue)
    },
    onInput (evt) {
      if (evt.target.composing) return
      const value = evt.target.value
      this.setValue(this.lazyFormatter ? value : this.getFormatted(value, evt))
      this.$emit('input', this.localValue, evt)
    },
    onChange (evt) {
      if (evt.target.composing) return
      this.setValue(this.format(evt.target.value, evt))
      this.$emit('change', this.localValue, evt)
    },
    getFormatted (value, event = null) {
      return this.formatter ? this.formatter(value, event) : value
    },
    setWheelStopper (on) {
      const input = this.$refs.input
      if (on) {
        eventOn(input, 'focus', this.onFocus)
        eventOn(input, 'blur', this.onBlur)
      } else {
        eventOff(input, 'focus', this.onFocus)
        eventOff(input, 'blur', this.onBlur)
        eventOff(document, 'wheel', this.stopWheel)
      }
    },
    onFocus (evt) {
      eventOn(document, 'wheel', this.stopWheel)
    },
    onBlur (evt) {
      eventOff(document, 'wheel', this.stopWheel)
    },
    stopWheel (evt) {
      evt.preventDefault()
      this.$refs.input.blur()
    },
    // Exposed methods
    format () {
      // Force the formatter to run
      this.setValue(this.getFormatted(this.localValue, null))
      return this.localValue
    },
    focus () {
      // Expose the input focus() method
      /* istanbul ignore next */
      if (!this.disabled) {
        this.$refs.input.focus()
      }
    },
    blur () {
      // Expose the input blur() method
      /* istanbul ignore next */
      if (!this.disabled) {
        this.$refs.input.blur()
      }
    }
  }
}
