import Vue from '../../vue'
import { NAME_FORM_INPUT } from '../../constants/components'
import { arrayIncludes } from '../../utils/array'
import { attemptBlur } from '../../utils/dom'
import { eventOn, eventOff, eventOnOff, stopEvent } from '../../utils/events'
import formMixin from '../../mixins/form'
import formSelectionMixin from '../../mixins/form-selection'
import formSizeMixin from '../../mixins/form-size'
import formStateMixin from '../../mixins/form-state'
import formTextMixin from '../../mixins/form-text'
import formValidityMixin from '../../mixins/form-validity'
import idMixin from '../../mixins/id'
import listenersMixin from '../../mixins/listeners'

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
  name: NAME_FORM_INPUT,
  // Mixin order is important!
  mixins: [
    listenersMixin,
    idMixin,
    formMixin,
    formSizeMixin,
    formStateMixin,
    formTextMixin,
    formSelectionMixin,
    formValidityMixin
  ],
  props: {
    // `value` prop is defined in form-text mixin
    type: {
      type: String,
      default: 'text',
      validator: type => arrayIncludes(TYPES, type)
    },
    noWheel: {
      // Disable mousewheel to prevent wheel from
      // changing values (i.e. number/date)
      type: Boolean,
      default: false
    },
    min: {
      type: [String, Number]
      // default: null
    },
    max: {
      type: [String, Number]
      // default: null
    },
    step: {
      type: [String, Number]
      // default: null
    },
    list: {
      type: String
      // default: null
    }
  },
  computed: {
    localType() {
      // We only allow certain types
      return arrayIncludes(TYPES, this.type) ? this.type : 'text'
    },
    computedAttrs() {
      const { localType: type, disabled, placeholder, required, min, max, step } = this

      return {
        id: this.safeId(),
        name: this.name || null,
        form: this.form || null,
        type,
        disabled,
        placeholder,
        required,
        autocomplete: this.autocomplete || null,
        readonly: this.readonly || this.plaintext,
        min,
        max,
        step,
        list: type !== 'password' ? this.list : null,
        'aria-required': required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      }
    },
    computedListeners() {
      return {
        ...this.bvListeners,
        input: this.onInput,
        change: this.onChange,
        blur: this.onBlur
      }
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
  /* istanbul ignore next */
  deactivated() {
    // Turn off listeners when keep-alive component deactivated
    /* istanbul ignore next */
    this.setWheelStopper(false)
  },
  /* istanbul ignore next */
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
      stopEvent(evt, { propagation: false })
      attemptBlur(this.$el)
    }
  },
  render(h) {
    return h('input', {
      ref: 'input',
      class: this.computedClass,
      attrs: this.computedAttrs,
      domProps: { value: this.localValue },
      on: this.computedListeners
    })
  }
})
