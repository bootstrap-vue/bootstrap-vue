// BTime control (not form input control)
import Vue from '../../utils/vue'
// Utilities
import identity from '../../utils/identity'
import looseEqual from '../../utils/loose-equal'
import { concat } from '../../utils/array'
import { createDate, createDateFormatter } from '../../utils/date'
import { contains } from '../../utils/dom'
import { isBoolean, isNull, isUndefinedOrNull } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { toString } from '../../utils/string'
// Mixins
import idMixin from '../../mixins/id'
// Sub components used
import { BFormSpinbutton } from '../form-spinbutton/form-spinbutton'
import { BIconCircleFill } from '../../icons/icons'

// --- Constants ---

const NAME = 'BTime'

// Time string RegExpr (optional seconds)
const RE_TIME = /^([0-1][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/

// --- Helpers ---

const padLeftZeros = num => {
  return `00${num || ''}`.slice(-2)
}

const parseHMS = hms => {
  hms = toString(hms)
  let [hh, mm, ss] = [null, null, null]
  if (RE_TIME.test(hms)) {
    ;[hh, mm, ss] = hms
      .split(':')
      .map(toInteger)
      .map(v => (isNaN(v) ? null : v))
  }
  return {
    hours: isUndefinedOrNull(hh) ? null : hh,
    minutes: isUndefinedOrNull(mm) ? null : mm,
    seconds: isUndefinedOrNull(ss) ? null : ss,
    ampm: isUndefinedOrNull(hh) || hh < 12 ? 0 : 1
  }
}

const formatHMS = ({ hours, minutes, seconds }, requireSeconds = false) => {
  if (isNull(hours) || isNull(minutes) || (requireSeconds && isNull(seconds))) {
    return ''
  }
  const hms = [hours, minutes, requireSeconds ? seconds : 0]
  return hms.map(padLeftZeros).join(':')
}

// @vue/component
export const BTime = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [idMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    showSeconds: {
      //
      type: Boolean,
      default: false
    },
    hour12: {
      // Explictly force 12 or 24 hour time. Default is
      // to use resolved locale for 12/24 hour display
      // Tri-state: `true` = 12, `false` = 24, `null` = auto
      type: Boolean,
      default: null
    },
    locale: {
      type: [string, Array],
      default: null
    },
    ariaLabelledby: {
      // ID of label element
      type: String,
      default: null
    },
    secondsStep: {
      type: [Number, String],
      default: 1
    },
    minutesStep: {
      type: [Number, String],
      default: 1
    },
    labelNoTime: {
      type: String,
      default: 'No time selected'
    },
    labelHours: {
      type: String,
      default: 'Hours'
    },
    labelMinutes: {
      type: String,
      default: 'Minutes'
    },
    labelSeconds: {
      type: String,
      default: 'Seconds'
    },
    // Passed to the spin buttons
    labelIncrement: {
      type: String,
      default: 'Increment'
    },
    labelDecrement: {
      type: String,
      default: 'Decrement'
    }
  },
  data() {
    const parsed = parseHMS(this.value || '')
    return {
      // Spin button models
      modelHours: parsed.hours,
      modelMinutes: parsed.minutes,
      modelSeconds: parsed.seconds,
      modelAmpm: parsed.ampm
    }
  },
  computed: {
    computedHMS() {
      const hours = this.modelHours
      const minutes = this.modelMinutes
      const seconds = this.modelSeconds
      return formatHMS({ hours, minutes, seconds }, this.showSeconds)
    },
    resolvedOptions() {
      // Resolved locale options
      const locale = concat(this.locale).filter(identity)
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
      if (isBoolean(this.hour12)) {
        // Force 12 or 24 hour clock
        options.hour12 = this.hour12
      }
      const dtf = new Intl.DateTimeFormat(locale, options)
      const resolved = dtf.resolvedOptions()
      return {
        locale: resolved.locale,
        hour12: resolved.hour12,
        hourCycle: resolved.hourCycle
      }
    },
    computedLocale() {
      return this.resolvedOptions.locale
    },
    computedHourCycle() {
      // h11, h12, h23, or h24
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Locale/hourCycle
      // h12	Hour system using 1–12; corresponds to 'h' in patterns. The 12 hour clock, with midnight starting at 12:00 am.
      // h23	Hour system using 0–23; corresponds to 'H' in patterns. The 24 hour clock, with midnight starting at 0:00.
      // h11	Hour system using 0–11; corresponds to 'K' in patterns. The 12 hour clock, with midnight starting at 0:00 am.
      // h24	Hour system using 1–24; corresponds to 'k' in pattern. The 24 hour clock, with midnight starting at 24:00.
      // For h12 or h24, we visually format 00 hours as 12
      return this.resolvedOptions.hourCycle
    },
    is24Hour() {
      return !this.resolvedOptions.hour12
    },
    is12Hour() {
      return !this.is24Hour
    },
    valueId() {
      return this.safeId() || null
    },
    computedAriaLabelledby() {
      return [this.ariaLabelledby, this.valueId].filter(identity).join(' ') || null
    },
    timeFormatter() {
      // Returns a formatter function reference. The formatter
      // converts the time to a localalized string
      const numeric = 'numeric'
      const options = {
        hour12: this.is12Hour,
        hourCycle: this.computedHourCycle,
        hour: numeric,
        minute: numeric,
        timeZone: 'UTC'
      }
      if (this.showSeconds) {
        options.seconds = numeric
      }
      // Formats the time as a localized string
      return createDateFormatter(this.computedLocale, options)
    },
    numberFormatter() {
      // Returns a formatter function reference. The formatter
      // always formats as 2 digits and is locallized
      const nf = new Intl.NumberFormat(this.computedLocale, {
        style: 'decimal',
        minimumIntegerDigits: 2,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: 'standard'
      })
      return nf.format
    },
    formattedTimeString() {
      const hours = this.modelHours
      const minutes = this.modelMinutes
      const seconds = this.modelSeconds
      if (this.computedHMS) {
        return this.timeFormatter(createDate(Date.UTC(0, 0, 1, hours, minutes, seconds || 0)))
      }
      return this.labelNoTime || ' '
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal && !looseEqual(parseHMS(newVal), parseHMS(this.computedHMS))) {
        const { hours, minutes, seconds, ampm } = parseHMS(newVal)
        this.modelHours = hours
        this.modelMinutes = minutes
        this.modelSeconds = seconds
        this.modelAmpm = ampm
      }
    },
    computedHMS(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    },
    modelAmpm(newVal, oldVal) {
      if (newVal !== oldVal) {
        // TBD: handle adjusting the hour value if AMPM changes
        // if (newVal === 0 && this.modelHours > 12) {
        //   this.modelHours = this.modelHours - 12
        // } else if (newVal === 1 && this.modelHours < 11) {
        //   this.modelHours = this.modelHours + 12
        // }
      }
    },
    modelHours(newHours, oldHours) {
      if (newHours !== oldHours) {
        this.modelAmpm = newHours > 11 ? 1 : 0
      }
    }
  },
  methods: {
    // Formatters for the spin buttons
    formatHours(hh) {
      const hourCycle = this.computedHourCycle
      // We always store 0-23, but format based on h11/h12/h23/h24 formats
      hh = this.is12Hour && hh > 12 ? hh - 12 : hh
      hh = hh === 0 && hourCycle === 'h12' ? 12 : hh === 0 && hourCycle === 'h24' ? 24 : hh
      return this.numberFormatter(hh)
    },
    formatMinutes(mm) {
      return this.numberFormatter(mm)
    },
    formatSeconds(ss) {
      return this.numberFormatter(ss)
    },
    formatAmpm(ampm) {
      // These should come from label props???
      // `ampm` should always be a value of `0` or `1`
      return ampm === 0 ? 'AM' : ampm === 1 ? 'PM' : ''
    },
    // Spinbutton on change handlers
    setHours(value) {
      this.modelHours = value
    },
    setMinutes(value) {
      this.modelMinutes = value
    },
    setSeconds(value) {
      this.modelSeconds = value
    },
    setAmpm(value) {
      this.modelAmpm = value
    },
    focus() {
      if (!this.disabled) {
        try {
          // We focus the first spin button
          this.refs.hours.focus()
        } catch {}
      }
    },
    blur() {
      if (!this.disabled) {
        try {
          if (contains(this.$el, document.activeElement)) {
            document.activeElement.blur()
          }
        } catch {}
      }
    }
  },
  render(h) {
    const valueId = this.valueId
    const computedAriaLabelledby = this.computedAriaLabelledby

    // Helper method to render a spinbutton
    const makeSpinbutton = (handler, refKey, classes, spinbuttonProps = {}) => {
      return h(BFormSpinbutton, {
        key: refKey,
        ref: refKey,
        class: classes,
        props: {
          placeholder: '--',
          vertical: true,
          required: true,
          disabled: this.disabled || this.readonly,
          locale: this.computedLocale,
          labelIncrement: this.labelIncrement,
          labelDecrement: this.labelDecrement,
          wrap: true,
          ariaControls: valueId,
          min: 0,
          ...spinbuttonProps
        },
        on: {
          // We use `change` event to minimize SR verbosity
          // As the spinbutton will announce each value change
          // and we don't want the formatted time to be announced
          // on each value input
          change: handler
        }
      })
    }

    // Helper method to return a "colon" spearator
    const makeColon = () => {
      return h(
        'div',
        {
          staticClass: 'd-flex flex-column',
          attrs: { 'aria-hidden': 'true' }
        },
        [
          h(BIconCircleFill, { props: { shiftV: 4, scale: 0.5 } }),
          h(BIconCircleFill, { props: { shiftV: -4, scale: 0.5 } })
        ]
      )
    }

    let $spinners = []

    // Hours
    $spinners.push(
      makeSpinbutton(this.setHours, 'hours', '', {
        value: this.modelHours,
        max: 23,
        step: 1,
        formatterFn: this.formatHours,
        ariaLabel: this.labelHours
      })
    )

    // Spacer
    $spinners.push(makeColon())

    // Minutes
    $spinners.push(
      makeSpinbutton(this.setMinutes, 'minutes', '', {
        value: this.modelMinutes,
        max: 59,
        step: this.minutesStep || 1,
        formatterFn: this.formatMinutes,
        ariaLabel: this.labelMinutes
      })
    )

    if (this.showSeconds) {
      // Spacer
      $spinners.push(makeColon())
      // Seconds
      $spinners.push(
        makeSpinbutton(this.setSeconds, 'seconds', '', {
          value: this.modelMinutes,
          max: 59,
          step: this.secondsStep || 1,
          formatterFn: this.formatSeconds,
          ariaLabel: this.labelSeconds
        })
      )
    }

    // AM/PM ?
    if (this.is12Hour) {
      $spinners.push(
        makeSpinbutton(this.setAmPm, 'ampm', 'ml-2', {
          value: this.modelAmpm,
          max: 1,
          formatterFn: this.formatAmpm,
          ariaLabel: 'AM/PM'
        })
      )
    }

    // Assemble spinners
    $spinners = h(
      'div',
      {
        staticClass: 'd-inline-flex align-items-center justify-content-center mx-auto',
        attrs: {
          role: 'group',
          'aria-labelledby': computedAriaLabelledby,
          // Prevent flex order from changing
          dir: 'ltr'
        }
      },
      $spinners
    )

    // Selected type display
    const $value = h(
      'output',
      {
        staticClass: 'border rounded mb-2 p-1 small text-center',
        class: {
          'text-muted': this.disabled
        },
        attrs: {
          id: valueId,
          role: 'status',
          tabindex: '-1',
          'aria-live': 'polite',
          'aria-atomic': 'true'
        },
        on: {
          // Transfer focus/click to focus hours spinner
          click: this.focus,
          focus: this.focus
        }
      },
      [h('div', this.formattedTimeString)]
    )

    return h(
      'div',
      {
        staticClass: 'b-time d-inline-flex flex-column text-center',
        style: {
          // This will be moved to custom SCSS
          minWidth: '150px'
        },
        attrs: {
          role: 'group',
          tabindex: '-1',
          'aria-labeledby': computedAriaLabelledby || null
        }
      },
      [$value, $spinners]
    )
  }
})
