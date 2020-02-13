import Vue from '../../utils/vue'
import { arrayIncludes } from '../../utils/array'
import { eventOn, eventOff, eventOnOff } from '../../utils/events'
import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formTextMixin from '../../mixins/form-text'
import formSelectionMixin from '../../mixins/form-selection'
import formValidityMixin from '../../mixins/form-validity'

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

// @vue/component
export const BFormInput = /*#__PURE__*/ Vue.extend({
  name: 'BFormInput',
  mixins: [
    idMixin,
    formMixin,
    formSizeMixin,
    formStateMixin,
    formTextMixin,
    formSelectionMixin,
    formValidityMixin
  ],
  props: {
    // value prop defined in form-text mixin
    // value: { },
    type: {
      type: String,
      default: 'text',
      validator: type => arrayIncludes(TYPES, type)
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
    },
    list: {
      type: String,
      default: null
    }
  },
  computed: {
    localType() {
      // We only allow certain types
      return arrayIncludes(TYPES, this.type) ? this.type : 'text'
    }
  },
  watch: {
    noWheel(newVal) {
      this.setWheelStopper(newVal)
    }
  },
  mounted() {
    this.setWheelStopper(this.noWheel)
  },
  deactivated() {
    // Turn off listeners when keep-alive component deactivated
    /* istanbul ignore next */
    this.setWheelStopper(false)
  },
  activated() {
    // Turn on listeners (if no-wheel) when keep-alive component activated
    /* istanbul ignore next */
    this.setWheelStopper(this.noWheel)
  },
  beforeDestroy() {
    /* istanbul ignore next */
    this.setWheelStopper(false)
  },
  methods: {
    setWheelStopper(on) {
      const input = this.$el
      // We use native events, so that we don't interfere with propagation
      eventOnOff(on, input, 'focus', this.onWheelFocus)
      eventOnOff(on, input, 'blur', this.onWheelBlur)
      if (!on) {
        eventOff(document, 'wheel', this.stopWheel)
      }
    },
    onWheelFocus() {
      eventOn(document, 'wheel', this.stopWheel)
    },
    onWheelBlur() {
      eventOff(document, 'wheel', this.stopWheel)
    },
    stopWheel(evt) {
      evt.preventDefault()
      this.$el.blur()
    }
  },
  render(h) {
    var self = this
    return h('input', {
      ref: 'input',
      class: self.computedClass,
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
        form: self.form || null,
        type: self.localType,
        disabled: self.disabled,
        placeholder: self.placeholder,
        required: self.required,
        autocomplete: self.autocomplete || null,
        readonly: self.readonly || self.plaintext,
        min: self.min,
        max: self.max,
        step: self.step,
        list: self.localType !== 'password' ? self.list : null,
        'aria-required': self.required ? 'true' : null,
        'aria-invalid': self.computedAriaInvalid
      },
      domProps: {
        value: self.localValue
      },
      on: {
        ...self.$listeners,
        input: self.onInput,
        change: self.onChange,
        blur: self.onBlur
      }
    })
  }
})
