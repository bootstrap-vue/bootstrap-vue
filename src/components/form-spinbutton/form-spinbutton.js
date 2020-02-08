// b-form-spinbutton
import Vue from '../../utils/vue'
import { insNull } from '../../utils/inspect'
import { toFloat } from '../../utils/number'
import KeyCodes from '../utils/key-codes'

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
  inheritAttrs: false,
  props: {
    value: {
      // Should this really be String, to match native Number inputs?
      type: Number
      // default: null
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: [Number, String],
      default: 1
    },
    wrap: {
      type: Boolean,
      default: false
    },
    formatterFn: {
      type: Function
      // default: null
    },
    valueAsNumber: {
      tyep: Boolean,
      default: false,
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
    }
  },
  data() {
    let value = toFloat(this.value)
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
    compuedPrecision() {
      // Quick and dirty way to get the number of decimals
      const step = this.computedStep
      return Math.floor(step) === step ? 0 : (step.toString().split(".")[1] || '').length
    },
    computedMult() {
      Math.pow(10, this.computedPrecision || 0)
    },
    computedPlaceholder() {
      return this.placeholder || '--'      
    },
    formattedValue() {
      // Default formatting
      const value = this.localValue
      const precision = this.computedPrecision
      return value.toFixed(precision)
    }
  },
  watch: {
    value(value) {
      value = toFloat(value)
      this.localValue = isNaN(value) ? null : value
    },
    localValue(value) {
      value = toFloat(value) // will be NaN if null
      value = this.valueAsNumber ? value : isNaN(value) ? '' : value.toFixed(this.computedPrecision)
      this.$emit('input', value)
    }
  },
  methods: {
    setValue(value) {
      if (!this.disabled) {
        const min = this.computedMin
        const max = this.computedMax
        const wrap = this.wrap
        this.localValue = value > max
          ? (wrap ? min : value)
          : value < min
            ? (wrap ? max : value)
            : value
      }
    },
    onFocusBlur(evt) {
      this.hasFocus = evt.type === 'focus'
    },
    increment() {
      const value = this.localValue
      if (isNull(value) {
        this.seltValue(this.computedMin)
      } else {
        const step = this.computedStep
        const mult = this.computedMult
        // We ensure that precision is maintained
        this.setValue(Math.floor((value * mult) + (step * mult)) / mult)
      }
    },
    decrement() {
      if (isNull(value)) {
        this.seltValue(this.wrap ? this.computedMax : this.computedMin)
      } else {
        const step = this.computedStep
        const mult = this.computedMult
        // We ensure that precision is maintained
        this.setValue(Math.floor((value * mult) - (step * mult)) / mult)
      }
    },
    onKeydown(evt) {
      const { keyCode, altKey, ctrlKey, metaKey } = evt
      if (this.disabled || this.readonly ||  altKey || ctrlKey || metaKey) {
        return
      }
      if (arrayIncludes([UP, DOWN, HOME, END], keyCode) {
        // https://w3c.github.io/aria-practices/#spinbutton
        evt.preventDefault()
        if (keyCode === UP) {
          this.increment()
        } else if (keyCode === DOWN) {
          this.decrement()
        } else if (keyCode === HOME) {
          this.localValue = this.computedMin
        } else if (keyCode === END) {
          this.localValue = this.computedMax
        }
      }
    }
  }
  render(h) {
    const value = this.localValue
    const isInline = this.inline && !this.vertical
    const isVertical = this.vertical
    const isReadonly = this.readonly && !this.disabled
    const isDisabled = this.disabled
    const hasValue = !isNull(value)
    const idWidget = this.safeId()
    const formatter = isFunction(this.formatterFn) ? this.formatterFn : this.defaultFormatterFn

    const makeButton = (handler, label, content) => {
      return h(
        BButton,
        {
          staticClass: 'btn btn-sm border-0 mn-1',
          class: {
            'py-0': !isVertical
          },
          props: {
            variant: this.variant,
            disabled: this.disabled || this.readonly,
            block: isVertical
          },
          attrs: {
            tabindex: '-1',
            'aria-controls': idWidget,
            'aria-label': label || null
          },
          on: { click: handler }
        },
        [content]
      )
    }

    const iconData = {
      props: { scale: this.hasFocus ? 1.25 : 0 },
      attrs: { 'aria-hidden': 'true' }
    }
    
    const $increment = makeButton(this.increment, this.labelIncrement, h(BIconPlus, iconData))

    const $decrement = makeButton(this.decrement, this.labelDecrement, h(BIconDash, iconData))

    let $hidden = h()
    if (this.name) {
      $hidden = h( 'input', {
        attrs: {
          name: this.name,
          form: this.form || null,
          // TODO:
          //   Should this be set to '' if value is out of range?
          value: hasValue ? value.toFixed(this.computedPrecision) : ''
        }
      })
    }

    const $spin = h(
      // we use 'output' element to amke thid accept label for
      'output',
      {
        staticClass: 'border-0 p-0 w-100',
        class: {
          'flex-grow-1': !isVertical,
          'align-self-center': !isVertial,
          'm-1': !isVertical
        },
        attrs: {
          id: thisSafeId()
          role: 'spinbutton'
          tabindex: '0',
          'aria-live': 'off',
          'aria-label': this.ariaLabel || null,
          'aria-controls': this.ariaControls || null
          // May want to check if the value is in range
          'aria-invalid': this.state === false || (!hasValue && this.required) ? 'true' : null,
          'aria-required': this.required ? 'true' : null,
          // these attrs are required for type spinbutton
          'aria-valuemin': toString(this.computedMin),
          'aria-valuemax': toString(this.computedMax),
          // these should be null if the value is out of range
          // They must also be non-existent attrs if the vale is out of range or null
          'aria-valuenow': hasValue ? value : null,
          'aria-valuetext': hasValue ? formatter(value) : null
        }
      },
      formatter(value)
    )

    return h(
      'div',
      {
        staticClass: 'b-form-spinbutton form-control p-1',
        class: {
          disabled: isDisabled,
          readonly: isReadonly,
          focus: this.hasFocus,
          vertical: isVertical,
          'd-inline-flex': isInline || isVertical
          'd-flex': !isInline,
          'flex-column': isVertical,
          'is-valid': this.state === true,
          'is-invalid': this.state === false,
          'align-items-stretch': !isVertial
        },
        attrs: {
          role: 'group',
          ...this.$atrs
        },
        on: {
          keydown: this.onKeyDown,
          // We use capture phase (`!` prefix) since focus/blur do not bubble
          '!focus': onFocusBlur,
          '!blur': onFocusBlur
        }
      },
      this.vertical
        ? [$increment, $hidden, $spin, $decrement]
        : [$decrement, $hidden, $spin, $increment]
    )
  }
})
