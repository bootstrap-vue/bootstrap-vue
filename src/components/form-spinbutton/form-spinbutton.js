// b-form-spinbutton
import Vue from '../../utils/vue'
import { arrayIncludes, concat } from '../../utils/array'
import { eventOff, eventOn } from '../../utils/dom'
import { isFunction, isNull } from '../../utils/inspect'
import { toFloat } from '../../utils/number'
import { toString } from '../../utils/string'
import identity from '../../utils/identity'
import KeyCodes from '../../utils/key-codes'
import idMixin from '../../mixins/id'
import { BButton } from '../button/button'
import { BIconPlus, BIconDash } from '../../icons/icons'

// --- Constants ---

const NAME = 'BFormSpinbutton'

const { UP, DOWN, HOME, END } = KeyCodes

const DEFAULT_MIN = 1
const DEFAULT_MAX = 100
const DEFAULT_STEP = 1

// -- Helper functions ---

const defaultNumber = (val, def) => {
  val = toFloat(val)
  return isNaN(val) ? def : val
}

// --- BFormSpinbutton ---
// @vue/cpmponent
export const BFormSpinbutton = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [idMixin],
  inheritAttrs: false,
  props: {
    value: {
      // Should this really be String, to match native Number inputs?
      type: Number,
      default: null
    },
    min: {
      type: [Number, String],
      default: DEFAULT_MIN
    },
    max: {
      type: [Number, String],
      default: DEFAULT_MAX
    },
    step: {
      type: [Number, String],
      default: DEFAULT_STEP
    },
    wrap: {
      type: Boolean,
      default: false
    },
    formatterFn: {
      type: Function
      // default: null
    },
    size: {
      type: String
      // default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      // Only affects the `aria-invalid` attribute
      type: Boolean,
      default: false
    },
    name: {
      type: String
      // default: null
    },
    form: {
      type: String
      // default: null
    },
    state: {
      // Tri-state prop: true, false, or null
      type: Boolean,
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    buttonVariant: {
      type: String,
      default: 'outline-secondary'
    },
    labelIncrement: {
      type: String,
      default: 'Increment'
    },
    labelDecrement: {
      type: String,
      default: 'Decrement'
    },
    locale: {
      type: [String, Array],
      default: null
    }
  },
  data() {
    const value = toFloat(this.value)
    return {
      localValue: isNaN(value) ? null : value,
      hasFocus: false
    }
  },
  computed: {
    computedStep() {
      return defaultNumber(this.step, DEFAULT_STEP)
    },
    computedMin() {
      return defaultNumber(this.min, DEFAULT_MIN)
    },
    computedMax() {
      return defaultNumber(this.max, DEFAULT_MAX)
    },
    computedPrecision() {
      // Quick and dirty way to get the number of decimals
      const step = this.computedStep
      return Math.floor(step) === step ? 0 : (step.toString().split('.')[1] || '').length
    },
    computedMult() {
      return Math.pow(10, this.computedPrecision || 0)
    },
    valueAsFixed() {
      const value = this.localValue
      return isNull(value) ? '' : value.toFixed(this.computedPrecision)
    },
    computedLocale() {
      const locales = concat(this.locale).filter(identity)
      const nf = new Intl.NumberFormat(locales)
      return nf.resolvedOptions().locale
    },
    defaultFormatter() {
      // returns and Intl.NumberFormat formatter method reference
      const precision = this.computedPrecision
      const nf = new Intl.NumberFormat(this.computedLocale, {
        style: 'decimal',
        useGrouping: false,
        minimumIntegerDigits: 1,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
        notation: 'standard'
      })
      // Return the format method reference
      return nf.format
    }
  },
  watch: {
    value(value) /* istanbul ignore next: until tests are ready */ {
      value = toFloat(value) // Will be NaN if null
      this.localValue = isNaN(value) ? null : value
    },
    localValue(value) /* istanbul ignore next: until tests are ready */ {
      this.$emit('input', value)
    }
  },
  created() {
    // Create non reactive properties
    this.$_autoDelayTimer = null
    this.$_autoRepeatTimer = null
  },
  beforeDestroy() {
    this.resetTimers()
    this.setMouseup(false)
  },
  deactivated() /* istanbul ignore next */ {
    this.restTimers()
    this.setMouseup(false)
  },
  methods: {
    resetTimers() {
      clearTimeout(this.$_autoDelayTimer)
      clearInterval(this.$_autoRepeatTimer)
    },
    emitChange() /* istanbul ignore next: until tests are ready */ {
      this.$emit('change', this.localValue)
    },
    stepValue(direction) /* istanbul ignore next: until tests are ready */ {
      // Sets a new incremented or decremented value, supporting optional wrapping
      // Direction is either +1 or -1
      let value = this.localValue
      if (!this.disabled && !isNull(value)) {
        const step = this.computedStep * direction
        const min = this.computedMin
        const max = this.computedMax
        const mult = this.computedMult
        const wrap = this.wrap
        // We ensure that the value steps like a native input
        value = Math.round((value - min) / step) * step + min + step
        // We ensure that precision is maintained (decimals)
        value = Math.round(value * mult) / mult
        this.localValue =
          value > max ? (wrap ? min : max) : value < min ? (wrap ? max : min) : value
      }
    },
    onFocusBlur(evt) /* istanbul ignore next: until tests are ready */ {
      if (!this.disabled) {
        this.hasFocus = evt.type === 'focus'
      } else {
        this.hasFocus = false
      }
    },
    stepUp() /* istanbul ignore next: until tests are ready */ {
      const value = this.localValue
      if (isNull(value)) {
        this.localValue = this.computedMin
      } else {
        this.stepValue(+1)
      }
    },
    stepDown() /* istanbul ignore next: until tests are ready */ {
      const value = this.localValue
      if (isNull(value)) {
        this.localValue = this.wrap ? this.computedMax : this.computedMin
      } else {
        this.stepValue(-1)
      }
    },
    onKeydown(evt) /* istanbul ignore next: until tests are ready */ {
      const { keyCode, altKey, ctrlKey, metaKey } = evt
      if (this.disabled || this.readonly || altKey || ctrlKey || metaKey) {
        return
      }
      if (arrayIncludes([UP, DOWN, HOME, END], keyCode)) {
        // https://w3c.github.io/aria-practices/#spinbutton
        evt.preventDefault()
        if (keyCode === UP) {
          this.stepUp()
        } else if (keyCode === DOWN) {
          this.stepDown()
        } else if (keyCode === HOME) {
          this.localValue = this.computedMin
        } else if (keyCode === END) {
          this.localValue = this.computedMax
        }
      }
    },
    onKeyup(evt) /* istanbul ignore next: until tests are ready */ {
      // Emit a change event when the keyup happens
      const { keyCode, altKey, ctrlKey, metaKey } = evt
      if (this.disabled || this.readonly || altKey || ctrlKey || metaKey) {
        return
      }
      if (arrayIncludes([UP, DOWN, HOME, END], keyCode)) {
        // https://w3c.github.io/aria-practices/#spinbutton
        evt.preventDefault()
        this.emitChange()
      }
    },
    handleMousedown(evt, stepper) /* istanbul ignore next: until tests are ready */ {
      if (!this.disabled && !this.readonly) {
        // if (evt.cancelable) {
        //   evt.preventDefault()
        //   this.hasFocus = true
        // }
        // Enable body mouseup event handler
        this.setMouseup(true)
        // Step the counter initially
        stepper()
        // Initiate the delay/repeat interval
        this.$_autoDelayTimer = setTimeout(() => {
          let count = 0
          this.$_autoRepeatTimer = setInterval(() => {
            stepper()
            count++
            if (count > 10) {
              // After 10 initial repeteats, we speed up the incrementing
              clearInterval(this.$_autoRepeatTimer)
              this.$_autoRepeatTimer = setInterval(stepper, 25)
            }
          }, 100)
        }, 500)
      }
    },
    onBodyMouseup() /* istanbul ignore next: until tests are ready */ {
      // body listener, only enabled when mousedown starts
      this.setMouseup(false)
      this.resetTimers()
      // Trigger the change event
      this.emitChange()
    },
    setMouseup(on) {
      const method = on ? eventOn : eventOff
      try {
        // Use try/catch to handle case when called server side
        method(document.body, 'mouseup', this.onBodyMouseup, { passive: true })
        method(document.body, 'touchend', this.onBodyMouseup, { passive: true })
      } catch {}
    }
  },
  render(h) {
    const idSpin = this.safeId()
    const value = this.localValue
    const isVertical = this.vertical
    const isInline = this.inline && !isVertical
    const isDisabled = this.disabled
    const isReadonly = this.readonly && !isDisabled
    const isRequired = this.required && !isReadonly && !isDisabled
    const state = this.state
    const hasValue = !isNull(value)
    const formatter = isFunction(this.formatterFn) ? this.formatterFn : this.defaultFormatter

    const makeButton = (stepper, label, IconCmp, key) => {
      const $icon = h(IconCmp, {
        props: { scale: this.hasFocus ? 1.5 : 1.25 },
        attrs: { 'aria-hidden': 'true' }
      })
      const handler = evt => /* istanbul ignore next: until tests written */ {
        this.handleMousedown(evt, stepper)
      }
      return h(
        BButton,
        {
          key: key || null,
          staticClass: 'btn btn-sm border-0 rounded-0',
          class: { 'py-0': !isVertical },
          props: {
            variant: this.buttonVariant,
            disabled: isDisabled || isReadonly
          },
          attrs: {
            tabindex: '-1',
            'aria-controls': idSpin,
            'aria-label': label || null
          },
          on: {
            mousedown: handler,
            touchstart: handler
          }
        },
        [h('div', {}, [$icon])]
      )
    }
    const $increment = makeButton(this.stepUp, this.labelIncrement, BIconPlus, 'inc')
    const $decrement = makeButton(this.stepDown, this.labelDecrement, BIconDash, 'dec')

    let $hidden = h()
    if (this.name) {
      $hidden = h('input', {
        key: 'hidden',
        attrs: {
          type: 'hidden',
          name: this.name,
          form: this.form || null,
          // TODO: Should this be set to '' if value is out of range?
          value: this.valueAsFixed
        }
      })
    }

    const $spin = h(
      // We use 'output' element to make this accept a `<label for="id">` (Except IE)
      'output',
      {
        key: 'output',
        staticClass: 'border-0 px-1',
        class: {
          'w-100': !isVertical && !isInline,
          'flex-grow-1': !isVertical,
          'align-self-center': !isVertical,
          'py-1': isVertical,
          'border-top': isVertical,
          'border-bottom': isVertical,
          'border-left': !isVertical,
          'border-right': !isVertical
        },
        attrs: {
          id: idSpin,
          role: 'spinbutton',
          tabindex: isDisabled ? null : '0',
          'aria-live': 'off',
          'aria-label': this.ariaLabel || null,
          'aria-controls': this.ariaControls || null,
          // TODO: May want to check if the value is in range
          'aria-invalid': state === false || (!hasValue && isRequired) ? 'true' : null,
          'aria-required': isRequired ? 'true' : null,
          // These attrs are required for role spinbutton
          'aria-valuemin': toString(this.computedMin),
          'aria-valuemax': toString(this.computedMax),
          // These should be null if the value is out of range
          // They must also be non-existent attrs if the value is out of range or null
          'aria-valuenow': hasValue ? value : null,
          'aria-valuetext': hasValue ? formatter(value) : null
        }
      },
      hasValue ? formatter(value) : this.placeholder || '\u00a0' // '&nbsp;'
    )

    return h(
      'div',
      {
        staticClass: 'b-form-spinbutton form-control p-0',
        class: {
          disabled: isDisabled,
          readonly: isReadonly,
          focus: this.hasFocus,
          'd-inline-flex': isInline || isVertical,
          'd-flex': !isInline && !isVertical,
          'h-auto': isVertical,
          'align-items-stretch': !isVertical,
          'flex-column': isVertical,
          'is-valid': state === true,
          'is-invalid': state === false
        },
        attrs: {
          ...this.$attrs,
          role: 'group',
          lang: this.computedLocale,
          // We want to keep the order of the buttons regardless
          // of locale (flex wil re-order based on rtl/ltr)
          dir: 'ltr'
        },
        on: {
          keydown: this.onKeydown,
          keyup: this.onKeyup,
          // We use capture phase (`!` prefix) since focus and blur do not bubble
          '!focus': this.onFocusBlur,
          '!blur': this.onFocusBlur
        }
      },
      isVertical
        ? [$increment, $hidden, $spin, $decrement]
        : [$decrement, $hidden, $spin, $increment]
    )
  }
})
