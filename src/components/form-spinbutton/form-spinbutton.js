import Vue from '../../utils/vue'
import { arrayIncludes, concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { eventOnOff } from '../../utils/events'
import { isFunction, isNull } from '../../utils/inspect'
import { isLocaleRTL } from '../../utils/locale'
import { toFloat, toInteger } from '../../utils/number'
import { toString } from '../../utils/string'
import identity from '../../utils/identity'
import KeyCodes from '../../utils/key-codes'
import idMixin from '../../mixins/id'
import { BIconPlus, BIconDash } from '../../icons/icons'

// --- Constants ---

const NAME = 'BFormSpinbutton'

const { UP, DOWN, HOME, END, PAGEUP, PAGEDOWN } = KeyCodes

// Default for spin button range and step
const DEFAULT_MIN = 1
const DEFAULT_MAX = 100
const DEFAULT_STEP = 1

// Delay before auto-repeat in ms
const DEFAULT_REPEAT_DELAY = 500
// Repeat interval in ms
const DEFAULT_REPEAT_INTERVAL = 100
// Repeat rate increased after number of repeats
const DEFAULT_REPEAT_THRESHOLD = 10
// Repeat speed multiplier (step multiplier, must be an integer)
const DEFAULT_REPEAT_MULTIPLIER = 4

// --- Helper functions ---

const defaultNumber = (value, defaultValue = null) => {
  value = toFloat(value)
  return isNaN(value) ? defaultValue : value
}

const defaultInteger = (value, defaultValue = null) => {
  value = toInteger(value)
  return isNaN(value) ? Math.abs(defaultValue) : value
}

// --- BFormSpinbutton ---
// @vue/component
export const BFormSpinbutton = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [idMixin],
  inheritAttrs: false,
  props: {
    value: {
      // Should this really be String, to match native number inputs?
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
    placeholder: {
      type: String,
      default: null
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
      // Tri-state prop: `true`, `false`, or `null`
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
    ariaLabel: {
      type: String,
      default: null
    },
    ariaControls: {
      type: String,
      default: null
    },
    labelDecrement: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelDecrement')
    },
    labelIncrement: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelIncrement')
    },
    locale: {
      type: [String, Array],
      default: null
    },
    repeatDelay: {
      type: [Number, String],
      default: DEFAULT_REPEAT_DELAY
    },
    repeatInterval: {
      type: [Number, String],
      default: DEFAULT_REPEAT_INTERVAL
    },
    repeatThreshold: {
      type: [Number, String],
      default: DEFAULT_REPEAT_THRESHOLD
    },
    repeatStepMultiplier: {
      type: [Number, String],
      default: DEFAULT_REPEAT_MULTIPLIER
    }
  },
  data() {
    return {
      localValue: defaultNumber(this.value),
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
      // We round down to the nearest maximum step value
      const max = defaultNumber(this.max, DEFAULT_MAX)
      const step = this.computedStep
      const min = this.computedMin
      return Math.floor((max - min) / step) * step + min
    },
    computedDelay() {
      return defaultInteger(this.repeatDelay, DEFAULT_REPEAT_DELAY) || DEFAULT_REPEAT_DELAY
    },
    computedInterval() {
      return defaultInteger(this.repeatInterval, DEFAULT_REPEAT_INTERVAL) || DEFAULT_REPEAT_INTERVAL
    },
    computedThreshold() {
      return defaultInteger(this.repeatThreshold, DEFAULT_REPEAT_THRESHOLD) || 1
    },
    computedStepMultiplier() {
      return defaultInteger(this.repeatStepMultiplier, DEFAULT_REPEAT_MULTIPLIER) || 1
    },
    computedPrecision() {
      // Quick and dirty way to get the number of decimals
      const step = this.computedStep
      return Math.floor(step) === step ? 0 : (step.toString().split('.')[1] || '').length
    },
    computedMultiplier() {
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
    computedRTL() {
      return isLocaleRTL(this.computedLocale)
    },
    defaultFormatter() {
      // Returns and `Intl.NumberFormat` formatter method reference
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
    value(value) {
      value = toFloat(value) // Will be `NaN` if `value` is `null`
      this.localValue = isNaN(value) ? null : value
    },
    localValue(value) {
      this.$emit('input', value)
    },
    disabled(disabled) {
      if (disabled) {
        this.clearRepeat()
      }
    },
    readonly(readonly) {
      if (readonly) {
        this.clearRepeat()
      }
    }
  },
  created() {
    // Create non reactive properties
    this.$_autoDelayTimer = null
    this.$_autoRepeatTimer = null
    this.$_keyIsDown = false
  },
  beforeDestroy() {
    this.clearRepeat()
  },
  deactivated() /* istanbul ignore next */ {
    this.clearRepeat()
  },
  methods: {
    // --- Public methods ---
    focus() {
      if (!this.disabled) {
        try {
          this.$refs.spinner.focus()
        } catch {}
      }
    },
    blur() {
      if (!this.disabled) {
        try {
          this.$refs.spinner.blur()
        } catch {}
      }
    },
    // --- Private methods ---
    emitChange() {
      this.$emit('change', this.localValue)
    },
    stepValue(direction) {
      // Sets a new incremented or decremented value, supporting optional wrapping
      // Direction is either +1 or -1 (or a multiple thereof)
      let value = this.localValue
      if (!this.disabled && !isNull(value)) {
        const step = this.computedStep * direction
        const min = this.computedMin
        const max = this.computedMax
        const multiplier = this.computedMultiplier
        const wrap = this.wrap
        // We ensure that the value steps like a native input
        value = Math.round((value - min) / step) * step + min + step
        // We ensure that precision is maintained (decimals)
        value = Math.round(value * multiplier) / multiplier
        // Handle if wrapping is enabled
        this.localValue =
          value > max ? (wrap ? min : max) : value < min ? (wrap ? max : min) : value
      }
    },
    onFocusBlur(evt) {
      if (!this.disabled) {
        this.hasFocus = evt.type === 'focus'
      } else {
        this.hasFocus = false
      }
    },
    stepUp(multiplier = 1) {
      const value = this.localValue
      if (isNull(value)) {
        this.localValue = this.computedMin
      } else {
        this.stepValue(+1 * multiplier)
      }
    },
    stepDown(multiplier = 1) {
      const value = this.localValue
      if (isNull(value)) {
        this.localValue = this.wrap ? this.computedMax : this.computedMin
      } else {
        this.stepValue(-1 * multiplier)
      }
    },
    onKeydown(evt) {
      const { keyCode, altKey, ctrlKey, metaKey } = evt
      /* istanbul ignore if */
      if (this.disabled || this.readonly || altKey || ctrlKey || metaKey) {
        return
      }
      if (arrayIncludes([UP, DOWN, HOME, END, PAGEUP, PAGEDOWN], keyCode)) {
        // https://w3c.github.io/aria-practices/#spinbutton
        evt.preventDefault()
        /* istanbul ignore if */
        if (this.$_keyIsDown) {
          // Keypress is already in progress
          return
        }
        this.resetTimers()
        if (arrayIncludes([UP, DOWN], keyCode)) {
          // The following use the custom auto-repeat handling
          this.$_keyIsDown = true
          if (keyCode === UP) {
            this.handleStepRepeat(evt, this.stepUp)
          } else if (keyCode === DOWN) {
            this.handleStepRepeat(evt, this.stepDown)
          }
        } else {
          // These use native OS key repeating
          if (keyCode === PAGEUP) {
            this.stepUp(this.computedStepMultiplier)
          } else if (keyCode === PAGEDOWN) {
            this.stepDown(this.computedStepMultiplier)
          } else if (keyCode === HOME) {
            this.localValue = this.computedMin
          } else if (keyCode === END) {
            this.localValue = this.computedMax
          }
        }
      }
    },
    onKeyup(evt) {
      // Emit a change event when the keyup happens
      const { keyCode, altKey, ctrlKey, metaKey } = evt
      /* istanbul ignore if */
      if (this.disabled || this.readonly || altKey || ctrlKey || metaKey) {
        return
      }
      if (arrayIncludes([UP, DOWN, HOME, END, PAGEUP, PAGEDOWN], keyCode)) {
        this.resetTimers()
        this.$_keyIsDown = false
        evt.preventDefault()
        this.emitChange()
      }
    },
    handleStepRepeat(evt, stepper) {
      const { type, button } = evt || {}
      if (!this.disabled && !this.readonly) {
        /* istanbul ignore if */
        if (type === 'mousedown' && button) {
          // We only respond to left (main === 0) button clicks
          return
        }
        this.resetTimers()
        // Step the counter initially
        stepper(1)
        const threshold = this.computedThreshold
        const multiplier = this.computedStepMultiplier
        const delay = this.computedDelay
        const interval = this.computedInterval
        // Initiate the delay/repeat interval
        this.$_autoDelayTimer = setTimeout(() => {
          let count = 0
          this.$_autoRepeatTimer = setInterval(() => {
            // After N initial repeats, we increase the incrementing step amount
            // We do this to minimize screen reader announcements of the value
            // (values are announced every change, which can be chatty for SR users)
            // And to make it easer to select a value when the range is large
            stepper(count < threshold ? 1 : multiplier)
            count++
          }, interval)
        }, delay)
      }
    },
    onMouseup(evt) {
      // `<body>` listener, only enabled when mousedown starts
      const { type, button } = evt || {}
      /* istanbul ignore if */
      if (type === 'mouseup' && button) {
        // Ignore non left button (main === 0) mouse button click
        return
      }
      evt.preventDefault()
      this.resetTimers()
      this.setMouseup(false)
      // Trigger the change event
      this.emitChange()
    },
    setMouseup(on) {
      // Enable or disabled the body mouseup/touchend handlers
      // Use try/catch to handle case when called server side
      try {
        eventOnOff(on, document.body, 'mouseup', this.onMouseup, false)
        eventOnOff(on, document.body, 'touchend', this.onMouseup, false)
      } catch {}
    },
    resetTimers() {
      clearTimeout(this.$_autoDelayTimer)
      clearInterval(this.$_autoRepeatTimer)
    },
    clearRepeat() {
      this.resetTimers()
      this.setMouseup(false)
      this.$_keyIsDown = false
    }
  },
  render(h) {
    const spinId = this.safeId()
    const value = this.localValue
    const isVertical = this.vertical
    const isInline = this.inline && !isVertical
    const isDisabled = this.disabled
    const isReadonly = this.readonly && !isDisabled
    const isRequired = this.required && !isReadonly && !isDisabled
    const state = this.state
    const size = this.size
    const hasValue = !isNull(value)
    const formatter = isFunction(this.formatterFn) ? this.formatterFn : this.defaultFormatter

    const makeButton = (stepper, label, IconCmp, keyRef, shortcut, btnDisabled) => {
      const $icon = h(IconCmp, {
        props: { scale: this.hasFocus ? 1.5 : 1.25 },
        attrs: { 'aria-hidden': 'true' }
      })
      const handler = evt => {
        if (!isDisabled && !isReadonly) {
          evt.preventDefault()
          this.setMouseup(true)
          try {
            // Since we `preventDefault()`, we must manually focus the button
            evt.currentTarget.focus()
          } catch {}
          this.handleStepRepeat(evt, stepper)
        }
      }
      return h(
        'button',
        {
          key: keyRef || null,
          ref: keyRef,
          staticClass: 'btn btn-sm border-0 rounded-0',
          class: { 'py-0': !isVertical },
          attrs: {
            tabindex: '-1',
            type: 'button',
            disabled: isDisabled || isReadonly || btnDisabled,
            'aria-disabled': isDisabled || isReadonly || btnDisabled ? 'true' : null,
            'aria-controls': spinId,
            'aria-label': label || null,
            'aria-keyshortcuts': shortcut || null
          },
          on: {
            mousedown: handler,
            touchstart: handler
          }
        },
        [h('div', {}, [$icon])]
      )
    }
    // TODO: Add button disabled state when `wrap` is `false` and at value max/min
    const $increment = makeButton(this.stepUp, this.labelIncrement, BIconPlus, 'inc', 'ArrowUp')
    const $decrement = makeButton(this.stepDown, this.labelDecrement, BIconDash, 'dec', 'ArrowDown')

    let $hidden = h()
    if (this.name && !isDisabled) {
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
        ref: 'spinner',
        key: 'output',
        staticClass: 'flex-grow-1',
        class: {
          'w-100': !isVertical && !isInline,
          'd-flex': isVertical,
          'align-self-center': !isVertical,
          'align-items-center': isVertical,
          'py-1': isVertical,
          'px-1': !isVertical,
          'mx-1': isVertical,
          'border-top': isVertical,
          'border-bottom': isVertical,
          'border-left': !isVertical,
          'border-right': !isVertical
        },
        attrs: {
          dir: this.computedRTL ? 'rtl' : 'ltr',
          ...this.$attrs,
          id: spinId,
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
          // These should be `null` if the value is out of range
          // They must also be non-existent attrs if the value is out of range or `null`
          'aria-valuenow': hasValue ? value : null,
          'aria-valuetext': hasValue ? formatter(value) : null
        }
      },
      [h('bdi', { staticClass: 'w-100' }, hasValue ? formatter(value) : this.placeholder || '')]
    )

    return h(
      'div',
      {
        staticClass: 'b-form-spinbutton form-control p-0',
        class: {
          disabled: isDisabled,
          readonly: isReadonly,
          focus: this.hasFocus,
          [`form-control-${size}`]: !!size,
          'd-inline-flex': isInline || isVertical,
          'd-flex': !isInline && !isVertical,
          'align-items-stretch': !isVertical,
          'flex-column': isVertical,
          'is-valid': state === true,
          'is-invalid': state === false
        },
        attrs: {
          role: 'group',
          lang: this.computedLocale,
          tabindex: isDisabled ? null : '-1',
          title: this.ariaLabel
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
