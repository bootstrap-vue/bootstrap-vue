import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formSelectionMixin from '../../mixins/form-selection'
import formValidityMixin from '../../mixins/form-validity'
import { arrayIncludes } from '../../utils/array'
import { eventOn, eventOff } from '../../utils/dom'

// Import styles for input type=color
import './form-input-type-color.css'
// Import temp styles and fixes for input type=range (custom-range)
import './form-input-type-range.css'

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
    var self = this
    return h('input', {
      ref: 'input',
      class: self.inputClass,
      attrs: {
        id: self.safeId(),
        name: self.name,
        type: self.localType,
        disabled: self.disabled,
        required: self.required,
        readonly: self.readonly || (self.plaintext && self.readonly === null),
        placeholder: self.placeholder,
        autocomplete: self.autocomplete || null,
        min: self.min,
        max: self.max,
        step: self.step,
        'aria-required': self.required ? 'true' : null,
        'aria-invalid': self.computedAriaInvalid
      },
      domProps: {
        value: self.localValue
      },
      directives: [
        { name: 'model', rawName: 'v-model', value: self.localValue, expression: 'localValue' }
      ],
      on: {
        ...self.$listeners,
        input: self.onInput,
        change: self.onChange
      }
    })
  },
  data () {
    return {
      localValue: this.value
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
    },
    min: {
      type: [String, Number],
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    step: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    localType () {
      // We only allow certain types
      return arrayIncludes(TYPES, this.type) ? this.type : 'text'
    },
    inputClass () {
      return [
        {
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
      // Most likely a string value (which could be 'true')
      return this.ariaInvalid
    }
  },
  mounted () {
    this.setValue(this.lazyFormatter ? this.value : this.getFormatted(this.value, null))
    this.setWheelStopper(this.noWheel)
  },
  deactivated () {
    // Turn off listeners when keep-alive component deactivated
    /* istanbul ignore next */
    this.setWheelStopper(false)
  },
  activated () {
    // Turn on listeners (if no-wheel) when keep-alive component activated
    /* istanbul ignore next */
    this.setWheelStopper(this.noWheel)
  },
  beforeDestroy () {
    /* istanbul ignore next */
    this.setWheelStopper(false)
  },
  watch: {
    value (newVal) {
      this.setValue(this.lazyFormatter ? newVal : this.getFormatted(newVal, null))
    },
    noWheel (newVal) {
      this.setWheelStopper(newVal)
    }
  },
  methods: {
    setValue (val) {
      if (val !== this.localVal) {
        // Only update value if changed, to minimize duplicte emits
        this.localValue = val
        this.$emit(MODEL_EVENT, this.localValue)
      }
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
      const input = this.$el
      // We use native events, so that we don't interfere with prepgation
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
      this.$el.blur()
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
        this.$el.focus()
      }
    },
    blur () {
      // Expose the input blur() method
      /* istanbul ignore next */
      if (!this.disabled) {
        this.$el.blur()
      }
    }
  }
}
