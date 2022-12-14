import { extend } from '../../vue'
import { NAME_FORM_SPINBUTTON } from '../../constants/components'
import { EVENT_NAME_CHANGE } from '../../constants/events'
import {
  PROP_TYPE_ARRAY_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_NUMBER,
  PROP_TYPE_FUNCTION,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import {
  CODE_DOWN,
  CODE_END,
  CODE_HOME,
  CODE_PAGEUP,
  CODE_UP,
  CODE_PAGEDOWN
} from '../../constants/key-codes'
import { SLOT_NAME_DECREMENT, SLOT_NAME_INCREMENT } from '../../constants/slots'
import { arrayIncludes, concat } from '../../utils/array'
import { attemptBlur, attemptFocus } from '../../utils/dom'
import { eventOnOff, stopEvent } from '../../utils/events'
import { identity } from '../../utils/identity'
import { isNull } from '../../utils/inspect'
import { isLocaleRTL } from '../../utils/locale'
import { mathFloor, mathMax, mathPow, mathRound } from '../../utils/math'
import { makeModelMixin } from '../../utils/model'
import { toFloat, toInteger } from '../../utils/number'
import { omit, sortKeys } from '../../utils/object'
import { hasPropFunction, makeProp, makePropsConfigurable } from '../../utils/props'
import { toString } from '../../utils/string'
import { attrsMixin } from '../../mixins/attrs'
import { formSizeMixin, props as formSizeProps } from '../../mixins/form-size'
import { formStateMixin, props as formStateProps } from '../../mixins/form-state'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { props as formControlProps } from '../../mixins/form-control'
import { BIconPlus, BIconDash } from '../../icons/icons'

// --- Constants ---

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('value', {
  // Should this really be String, to match native number inputs?
  type: PROP_TYPE_BOOLEAN_NUMBER
})

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

const KEY_CODES = [CODE_UP, CODE_DOWN, CODE_HOME, CODE_END, CODE_PAGEUP, CODE_PAGEDOWN]

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...modelProps,
    ...omit(formControlProps, ['required', 'autofocus']),
    ...formSizeProps,
    ...formStateProps,
    ariaControls: makeProp(PROP_TYPE_STRING),
    ariaLabel: makeProp(PROP_TYPE_STRING),
    formatterFn: makeProp(PROP_TYPE_FUNCTION),
    inline: makeProp(PROP_TYPE_BOOLEAN, false),
    labelDecrement: makeProp(PROP_TYPE_STRING, 'Decrement'),
    labelIncrement: makeProp(PROP_TYPE_STRING, 'Increment'),
    locale: makeProp(PROP_TYPE_ARRAY_STRING),
    max: makeProp(PROP_TYPE_NUMBER_STRING, DEFAULT_MAX),
    min: makeProp(PROP_TYPE_NUMBER_STRING, DEFAULT_MIN),
    placeholder: makeProp(PROP_TYPE_STRING),
    readonly: makeProp(PROP_TYPE_BOOLEAN, false),
    repeatDelay: makeProp(PROP_TYPE_NUMBER_STRING, DEFAULT_REPEAT_DELAY),
    repeatInterval: makeProp(PROP_TYPE_NUMBER_STRING, DEFAULT_REPEAT_INTERVAL),
    repeatStepMultiplier: makeProp(PROP_TYPE_NUMBER_STRING, DEFAULT_REPEAT_MULTIPLIER),
    repeatThreshold: makeProp(PROP_TYPE_NUMBER_STRING, DEFAULT_REPEAT_THRESHOLD),
    step: makeProp(PROP_TYPE_NUMBER_STRING, DEFAULT_STEP),
    vertical: makeProp(PROP_TYPE_BOOLEAN, false),
    wrap: makeProp(PROP_TYPE_BOOLEAN, false)
  }),
  NAME_FORM_SPINBUTTON
)

// --- Main Component ---

// @vue/component
export const BFormSpinbutton = /*#__PURE__*/ extend({
  name: NAME_FORM_SPINBUTTON,
  // Mixin order is important!
  mixins: [attrsMixin, idMixin, modelMixin, formSizeMixin, formStateMixin, normalizeSlotMixin],
  inheritAttrs: false,
  props,
  data() {
    return {
      localValue: toFloat(this[MODEL_PROP_NAME], null),
      hasFocus: false
    }
  },
  computed: {
    required() {
      return false
    },
    spinId() {
      return this.safeId()
    },
    computedInline() {
      return this.inline && !this.vertical
    },
    computedReadonly() {
      return this.readonly && !this.disabled
    },
    computedRequired() {
      return this.required && !this.computedReadonly && !this.disabled
    },
    computedStep() {
      return toFloat(this.step, DEFAULT_STEP)
    },
    computedMin() {
      return toFloat(this.min, DEFAULT_MIN)
    },
    computedMax() {
      // We round down to the nearest maximum step value
      const max = toFloat(this.max, DEFAULT_MAX)
      const step = this.computedStep
      const min = this.computedMin
      return mathFloor((max - min) / step) * step + min
    },
    computedDelay() {
      const delay = toInteger(this.repeatDelay, 0)
      return delay > 0 ? delay : DEFAULT_REPEAT_DELAY
    },
    computedInterval() {
      const interval = toInteger(this.repeatInterval, 0)
      return interval > 0 ? interval : DEFAULT_REPEAT_INTERVAL
    },
    computedThreshold() {
      return mathMax(toInteger(this.repeatThreshold, DEFAULT_REPEAT_THRESHOLD), 1)
    },
    computedStepMultiplier() {
      return mathMax(toInteger(this.repeatStepMultiplier, DEFAULT_REPEAT_MULTIPLIER), 1)
    },
    computedPrecision() {
      // Quick and dirty way to get the number of decimals
      const step = this.computedStep
      return mathFloor(step) === step ? 0 : (step.toString().split('.')[1] || '').length
    },
    computedMultiplier() {
      return mathPow(10, this.computedPrecision || 0)
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
    },
    computedFormatter() {
      const { formatterFn } = this
      return hasPropFunction(formatterFn) ? formatterFn : this.defaultFormatter
    },
    computedAttrs() {
      return {
        ...this.bvAttrs,
        role: 'group',
        lang: this.computedLocale,
        tabindex: this.disabled ? null : '-1',
        title: this.ariaLabel
      }
    },
    computedSpinAttrs() {
      const {
        spinId,
        localValue: value,
        computedRequired: required,
        disabled,
        state,
        computedFormatter
      } = this
      const hasValue = !isNull(value)

      return {
        dir: this.computedRTL ? 'rtl' : 'ltr',
        ...this.bvAttrs,
        id: spinId,
        role: 'spinbutton',
        tabindex: disabled ? null : '0',
        'aria-live': 'off',
        'aria-label': this.ariaLabel || null,
        'aria-controls': this.ariaControls || null,
        // TODO: May want to check if the value is in range
        'aria-invalid': state === false || (!hasValue && required) ? 'true' : null,
        'aria-required': required ? 'true' : null,
        // These attrs are required for role spinbutton
        'aria-valuemin': toString(this.computedMin),
        'aria-valuemax': toString(this.computedMax),
        // These should be `null` if the value is out of range
        // They must also be non-existent attrs if the value is out of range or `null`
        'aria-valuenow': hasValue ? value : null,
        'aria-valuetext': hasValue ? computedFormatter(value) : null
      }
    }
  },
  watch: {
    [MODEL_PROP_NAME](value) {
      this.localValue = toFloat(value, null)
    },
    localValue(value) {
      this.$emit(MODEL_EVENT_NAME, value)
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
  /* istanbul ignore next */
  deactivated() {
    this.clearRepeat()
  },
  methods: {
    // --- Public methods ---
    focus() {
      if (!this.disabled) {
        attemptFocus(this.$refs.spinner)
      }
    },
    blur() {
      if (!this.disabled) {
        attemptBlur(this.$refs.spinner)
      }
    },
    // --- Private methods ---
    emitChange() {
      this.$emit(EVENT_NAME_CHANGE, this.localValue)
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
        value = mathRound((value - min) / step) * step + min + step
        // We ensure that precision is maintained (decimals)
        value = mathRound(value * multiplier) / multiplier
        // Handle if wrapping is enabled
        this.localValue =
          value > max ? (wrap ? min : max) : value < min ? (wrap ? max : min) : value
      }
    },
    onFocusBlur(event) {
      this.hasFocus = this.disabled ? false : event.type === 'focus'
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
    onKeydown(event) {
      const { keyCode, altKey, ctrlKey, metaKey } = event
      /* istanbul ignore if */
      if (this.disabled || this.readonly || altKey || ctrlKey || metaKey) {
        return
      }
      if (arrayIncludes(KEY_CODES, keyCode)) {
        // https://w3c.github.io/aria-practices/#spinbutton
        stopEvent(event, { propagation: false })
        /* istanbul ignore if */
        if (this.$_keyIsDown) {
          // Keypress is already in progress
          return
        }
        this.resetTimers()
        if (arrayIncludes([CODE_UP, CODE_DOWN], keyCode)) {
          // The following use the custom auto-repeat handling
          this.$_keyIsDown = true
          if (keyCode === CODE_UP) {
            this.handleStepRepeat(event, this.stepUp)
          } else if (keyCode === CODE_DOWN) {
            this.handleStepRepeat(event, this.stepDown)
          }
        } else {
          // These use native OS key repeating
          if (keyCode === CODE_PAGEUP) {
            this.stepUp(this.computedStepMultiplier)
          } else if (keyCode === CODE_PAGEDOWN) {
            this.stepDown(this.computedStepMultiplier)
          } else if (keyCode === CODE_HOME) {
            this.localValue = this.computedMin
          } else if (keyCode === CODE_END) {
            this.localValue = this.computedMax
          }
        }
      }
    },
    onKeyup(event) {
      // Emit a change event when the keyup happens
      const { keyCode, altKey, ctrlKey, metaKey } = event
      /* istanbul ignore if */
      if (this.disabled || this.readonly || altKey || ctrlKey || metaKey) {
        return
      }
      if (arrayIncludes(KEY_CODES, keyCode)) {
        stopEvent(event, { propagation: false })
        this.resetTimers()
        this.$_keyIsDown = false
        this.emitChange()
      }
    },
    handleStepRepeat(event, stepper) {
      const { type, button } = event || {}
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
    onMouseup(event) {
      // `<body>` listener, only enabled when mousedown starts
      const { type, button } = event || {}
      /* istanbul ignore if */
      if (type === 'mouseup' && button) {
        // Ignore non left button (main === 0) mouse button click
        return
      }
      stopEvent(event, { propagation: false })
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
      this.$_autoDelayTimer = null
      this.$_autoRepeatTimer = null
    },
    clearRepeat() {
      this.resetTimers()
      this.setMouseup(false)
      this.$_keyIsDown = false
    }
  },
  render(h) {
    const {
      spinId,
      localValue: value,
      computedInline: inline,
      computedReadonly: readonly,
      vertical,
      disabled,
      computedFormatter
    } = this
    const hasValue = !isNull(value)

    const makeButton = (stepper, label, IconCmp, keyRef, shortcut, btnDisabled, slotName) => {
      const $icon = h(IconCmp, {
        props: { scale: this.hasFocus ? 1.5 : 1.25 },
        attrs: { 'aria-hidden': 'true' }
      })
      const scope = { hasFocus: this.hasFocus }
      const handler = event => {
        if (!disabled && !readonly) {
          stopEvent(event, { propagation: false })
          this.setMouseup(true)
          // Since we `preventDefault()`, we must manually focus the button
          attemptFocus(event.currentTarget)
          this.handleStepRepeat(event, stepper)
        }
      }
      return h(
        'button',
        {
          staticClass: 'btn btn-sm border-0 rounded-0',
          class: { 'py-0': !vertical },
          attrs: {
            tabindex: '-1',
            type: 'button',
            disabled: disabled || readonly || btnDisabled,
            'aria-disabled': disabled || readonly || btnDisabled ? 'true' : null,
            'aria-controls': spinId,
            'aria-label': label || null,
            'aria-keyshortcuts': shortcut || null
          },
          on: {
            mousedown: handler,
            touchstart: handler
          },
          key: keyRef || null,
          ref: keyRef
        },
        [this.normalizeSlot(slotName, scope) || $icon]
      )
    }
    // TODO: Add button disabled state when `wrap` is `false` and at value max/min
    const $increment = makeButton(
      this.stepUp,
      this.labelIncrement,
      BIconPlus,
      'inc',
      'ArrowUp',
      false,
      SLOT_NAME_INCREMENT
    )
    const $decrement = makeButton(
      this.stepDown,
      this.labelDecrement,
      BIconDash,
      'dec',
      'ArrowDown',
      false,
      SLOT_NAME_DECREMENT
    )

    let $hidden = h()
    if (this.name && !disabled) {
      $hidden = h('input', {
        attrs: {
          type: 'hidden',
          name: this.name,
          form: this.form || null,
          // TODO: Should this be set to '' if value is out of range?
          value: this.valueAsFixed
        },
        key: 'hidden'
      })
    }

    const $spin = h(
      // We use 'output' element to make this accept a `<label for="id">` (Except IE)
      'output',
      {
        staticClass: 'flex-grow-1',
        class: {
          'd-flex': vertical,
          'align-self-center': !vertical,
          'align-items-center': vertical,
          'border-top': vertical,
          'border-bottom': vertical,
          'border-left': !vertical,
          'border-right': !vertical
        },
        attrs: this.computedSpinAttrs,
        key: 'output',
        ref: 'spinner'
      },
      [h('bdi', hasValue ? computedFormatter(value) : this.placeholder || '')]
    )

    return h(
      'div',
      {
        staticClass: 'b-form-spinbutton form-control',
        class: [
          {
            disabled,
            readonly,
            focus: this.hasFocus,
            'd-inline-flex': inline || vertical,
            'd-flex': !inline && !vertical,
            'align-items-stretch': !vertical,
            'flex-column': vertical
          },
          this.sizeFormClass,
          this.stateClass
        ],
        attrs: this.computedAttrs,
        on: {
          keydown: this.onKeydown,
          keyup: this.onKeyup,
          // We use capture phase (`!` prefix) since focus and blur do not bubble
          '!focus': this.onFocusBlur,
          '!blur': this.onFocusBlur
        }
      },
      vertical ? [$increment, $hidden, $spin, $decrement] : [$decrement, $hidden, $spin, $increment]
    )
  }
})
