// BTime control (not form input control)
import Vue from '../../utils/vue'
// Utilities
import identity from '../../utils/identity'
import KeyCodes from '../../utils/key-codes'
import looseEqual from '../../utils/loose-equal'
import { concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { createDate, createDateFormatter } from '../../utils/date'
import { contains, requestAF } from '../../utils/dom'
import { isNull, isUndefinedOrNull } from '../../utils/inspect'
import { isLocaleRTL } from '../../utils/locale'
import { toInteger } from '../../utils/number'
import { toString } from '../../utils/string'
// Mixins
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
// Sub components used
import { BFormSpinbutton } from '../form-spinbutton/form-spinbutton'
import { BIconCircleFill, BIconChevronUp } from '../../icons/icons'

// --- Constants ---

const NAME = 'BTime'

const NUMERIC = 'numeric'

const { LEFT, RIGHT } = KeyCodes

// Time string RegExpr (optional seconds)
const RE_TIME = /^([0-1]?[0-9]|2[0-3]):[0-5]?[0-9](:[0-5]?[0-9])?$/

// --- Helpers ---

// Fallback to BFormSpinbutton prop if no value found
const getConfigFallback = prop => {
  return getComponentConfig(NAME, prop) || getComponentConfig('BFormSpinbutton', prop)
}

const padLeftZeros = num => {
  return `00${num || ''}`.slice(-2)
}

const parseHMS = hms => {
  hms = toString(hms)
  let [hh, mm, ss] = [null, null, null]
  if (RE_TIME.test(hms)) {
    ;[hh, mm, ss] = hms.split(':').map(v => toInteger(v, null))
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
  mixins: [idMixin, normalizeSlotMixin],
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
      // If true, show the second spinbutton
      type: Boolean,
      default: false
    },
    hour12: {
      // Explicitly force 12 or 24 hour time
      // Default is to use resolved locale for 12/24 hour display
      // Tri-state: `true` = 12, `false` = 24, `null` = auto
      type: Boolean,
      default: null
    },
    locale: {
      type: [String, Array]
      // default: null
    },
    ariaLabelledby: {
      // ID of label element
      type: String
      // default: null
    },
    secondsStep: {
      type: [Number, String],
      default: 1
    },
    minutesStep: {
      type: [Number, String],
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    labelNoTimeSelected: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelNoTimeSelected')
    },
    labelSelected: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelSelected')
    },
    labelHours: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelHours')
    },
    labelMinutes: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelMinutes')
    },
    labelSeconds: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelSeconds')
    },
    labelAmpm: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelAmpm')
    },
    labelAm: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelAm')
    },
    labelPm: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelPm')
    },
    // Passed to the spin buttons
    labelIncrement: {
      type: String,
      // Falls back to BFormSpinbutton label
      default: () => getConfigFallback('labelIncrement')
    },
    labelDecrement: {
      type: String,
      // Falls back to BFormSpinbutton label
      default: () => getConfigFallback('labelDecrement')
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const parsed = parseHMS(this.value || '')
    return {
      // Spin button models
      modelHours: parsed.hours,
      modelMinutes: parsed.minutes,
      modelSeconds: parsed.seconds,
      modelAmpm: parsed.ampm,
      // Internal flag to enable aria-live regions
      isLive: false
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
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC
      }
      if (!isUndefinedOrNull(this.hour12)) {
        // Force 12 or 24 hour clock
        options.hour12 = !!this.hour12
      }
      const dtf = new Intl.DateTimeFormat(locale, options)
      const resolved = dtf.resolvedOptions()
      const hour12 = resolved.hour12 || false
      // IE 11 doesn't resolve the hourCycle, so we make
      // an assumption and fall back to common values
      const hourCycle = resolved.hourCycle || (hour12 ? 'h12' : 'h23')
      return {
        locale: resolved.locale,
        hour12: hour12,
        hourCycle: hourCycle
      }
    },
    computedLocale() {
      return this.resolvedOptions.locale
    },
    computedLang() {
      return (this.computedLocale || '').replace(/-u-.*$/, '')
    },
    computedRTL() {
      return isLocaleRTL(this.computedLang)
    },
    computedHourCycle() {
      // h11, h12, h23, or h24
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Locale/hourCycle
      // h12 - Hour system using 1–12. Corresponds to 'h' in patterns. The 12 hour clock, with midnight starting at 12:00 am
      // h23 - Hour system using 0–23. Corresponds to 'H' in patterns. The 24 hour clock, with midnight starting at 0:00
      // h11 - Hour system using 0–11. Corresponds to 'K' in patterns. The 12 hour clock, with midnight starting at 0:00 am
      // h24 - Hour system using 1–24. Corresponds to 'k' in pattern. The 24 hour clock, with midnight starting at 24:00
      // For h12 or h24, we visually format 00 hours as 12
      return this.resolvedOptions.hourCycle
    },
    is12Hour() {
      return !!this.resolvedOptions.hour12
    },
    context() {
      return {
        locale: this.computedLocale,
        isRTL: this.computedRTL,
        hourCycle: this.computedHourCycle,
        hour12: this.is12Hour,
        hours: this.modelHours,
        minutes: this.modelMinutes,
        seconds: this.showSeconds ? this.modelSeconds : 0,
        value: this.computedHMS,
        formatted: this.formattedTimeString
      }
    },
    valueId() {
      return this.safeId() || null
    },
    computedAriaLabelledby() {
      return [this.ariaLabelledby, this.valueId].filter(identity).join(' ') || null
    },
    timeFormatter() {
      // Returns a formatter function reference
      // The formatter converts the time to a localized string
      const options = {
        hour12: this.is12Hour,
        hourCycle: this.computedHourCycle,
        hour: NUMERIC,
        minute: NUMERIC,
        timeZone: 'UTC'
      }
      if (this.showSeconds) {
        options.second = NUMERIC
      }
      // Formats the time as a localized string
      return createDateFormatter(this.computedLocale, options)
    },
    numberFormatter() {
      // Returns a formatter function reference
      // The formatter always formats as 2 digits and is localized
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
      const seconds = this.showSeconds ? this.modelSeconds || 0 : 0
      if (this.computedHMS) {
        return this.timeFormatter(createDate(Date.UTC(0, 0, 1, hours, minutes, seconds)))
      }
      return this.labelNoTimeSelected || ' '
    },
    spinScopedSlots() {
      const h = this.$createElement
      return {
        increment: ({ hasFocus }) =>
          h(BIconChevronUp, {
            props: { scale: hasFocus ? 1.5 : 1.25 },
            attrs: { 'aria-hidden': 'true' }
          }),
        decrement: ({ hasFocus }) =>
          h(BIconChevronUp, {
            props: { flipV: true, scale: hasFocus ? 1.5 : 1.25 },
            attrs: { 'aria-hidden': 'true' }
          })
      }
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
    context(newVal, oldVal) {
      if (!looseEqual(newVal, oldVal)) {
        this.$emit('context', newVal)
      }
    },
    modelAmpm(newVal, oldVal) {
      if (newVal !== oldVal) {
        const hours = isNull(this.modelHours) ? 0 : this.modelHours
        this.$nextTick(() => {
          if (newVal === 0 && hours > 11) {
            // Switched to AM
            this.modelHours = hours - 12
          } else if (newVal === 1 && hours < 12) {
            // Switched to PM
            this.modelHours = hours + 12
          }
        })
      }
    },
    modelHours(newHours, oldHours) {
      if (newHours !== oldHours) {
        this.modelAmpm = newHours > 11 ? 1 : 0
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.$emit('context', this.context)
    })
  },
  mounted() {
    this.setLive(true)
  },
  activated() /* istanbul ignore next */ {
    this.setLive(true)
  },
  deactivated() /* istanbul ignore next */ {
    this.setLive(false)
  },
  beforeDestroy() {
    this.setLive(false)
  },
  methods: {
    // Public methods
    focus() {
      if (!this.disabled) {
        try {
          // We focus the first spin button
          this.$refs.spinners[0].focus()
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
    },
    // Formatters for the spin buttons
    formatHours(hh) {
      const hourCycle = this.computedHourCycle
      // We always store 0-23, but format based on h11/h12/h23/h24 formats
      hh = this.is12Hour && hh > 12 ? hh - 12 : hh
      // Determine how 00:00 and 12:00 are shown
      hh =
        hh === 0 && hourCycle === 'h12'
          ? 12
          : hh === 0 && hourCycle === 'h24'
            ? 24
            : hh === 12 && hourCycle === 'h11'
              ? 0
              : hh
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
      return ampm === 0 ? this.labelAm : ampm === 1 ? this.labelPm : ''
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
    onSpinLeftRight(evt = {}) {
      const { type, keyCode } = evt
      if (!this.disabled && type === 'keydown' && (keyCode === LEFT || keyCode === RIGHT)) {
        evt.preventDefault()
        evt.stopPropagation()
        const spinners = this.$refs.spinners || []
        let index = spinners.map(cmp => !!cmp.hasFocus).indexOf(true)
        index = index + (keyCode === LEFT ? -1 : 1)
        index = index >= spinners.length ? 0 : index < 0 ? spinners.length - 1 : index
        try {
          spinners[index].focus()
        } catch {}
      }
    },
    setLive(on) {
      if (on) {
        this.$nextTick(() => {
          requestAF(() => {
            this.isLive = true
          })
        })
      } else {
        this.isLive = false
      }
    }
  },
  render(h) {
    /* istanbul ignore if */
    if (this.hidden) {
      // If hidden, we just render a placeholder comment
      return h()
    }

    const valueId = this.valueId
    const computedAriaLabelledby = this.computedAriaLabelledby
    const spinIds = []

    // Helper method to render a spinbutton
    const makeSpinbutton = (handler, key, classes, spinbuttonProps = {}) => {
      const id = this.safeId(`_spinbutton_${key}_`) || null
      spinIds.push(id)
      return h(BFormSpinbutton, {
        key: key,
        ref: 'spinners',
        refInFor: true,
        class: classes,
        props: {
          id: id,
          placeholder: '--',
          vertical: true,
          required: true,
          disabled: this.disabled,
          readonly: this.readonly,
          locale: this.computedLocale,
          labelIncrement: this.labelIncrement,
          labelDecrement: this.labelDecrement,
          wrap: true,
          ariaControls: valueId,
          min: 0,
          ...spinbuttonProps
        },
        scopedSlots: this.spinScopedSlots,
        on: {
          // We use `change` event to minimize SR verbosity
          // As the spinbutton will announce each value change
          // and we don't want the formatted time to be announced
          // on each value input if repeat is happening
          change: handler
        }
      })
    }

    // Helper method to return a "colon" separator
    const makeColon = () => {
      return h(
        'div',
        {
          staticClass: 'd-flex flex-column',
          class: {
            'text-muted': this.disabled || this.readonly
          },
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
          value: this.modelSeconds,
          max: 59,
          step: this.secondsStep || 1,
          formatterFn: this.formatSeconds,
          ariaLabel: this.labelSeconds
        })
      )
    }

    // AM/PM ?
    if (this.is12Hour) {
      // TODO:
      //   If locale is RTL, unshift this instead of push?
      //   And switch class `ml-2` to `mr-2`
      //   Note some LTR locales (i.e. zh) also place AM/PM to the left
      $spinners.push(
        makeSpinbutton(this.setAmpm, 'ampm', 'ml-2', {
          value: this.modelAmpm,
          max: 1,
          formatterFn: this.formatAmpm,
          ariaLabel: this.labelAmpm,
          // We set `required` as `false`, since this always has a value
          required: false
        })
      )
    }

    // Assemble spinners
    $spinners = h(
      'div',
      {
        staticClass: 'd-flex align-items-center justify-content-center mx-auto',
        attrs: {
          role: 'group',
          tabindex: this.disabled || this.readonly ? null : '-1',
          'aria-labelledby': computedAriaLabelledby
        },
        on: {
          keydown: this.onSpinLeftRight,
          click: evt => /* istanbul ignore next */ {
            if (evt.target === evt.currentTarget) {
              this.focus()
            }
          }
        }
      },
      $spinners
    )

    // Selected type display
    const $value = h(
      'output',
      {
        staticClass: 'border rounded d-block p-1 small text-center',
        class: {
          disabled: this.disabled || this.readonly
        },
        attrs: {
          id: valueId,
          role: 'status',
          for: spinIds.filter(identity).join(' ') || null,
          tabindex: this.disabled ? null : '-1',
          'aria-live': this.isLive ? 'polite' : 'off',
          'aria-atomic': 'true'
        },
        on: {
          // Transfer focus/click to focus hours spinner
          click: this.focus,
          focus: this.focus
        }
      },
      [
        h('bdi', this.formattedTimeString),
        this.computedHMS ? h('span', { staticClass: 'sr-only' }, ` (${this.labelSelected}) `) : ''
      ]
    )
    const $header = h(
      'header',
      { class: { 'sr-only': this.hideHeader, 'mb-2': !this.hideHeader } },
      [$value]
    )

    // Optional bottom slot
    let $slot = this.normalizeSlot('default')
    $slot = $slot ? h('footer', { staticClass: 'mt-2' }, $slot) : h()

    return h(
      'div',
      {
        staticClass: 'b-time d-inline-flex flex-column text-center',
        attrs: {
          role: 'group',
          lang: this.computedLang || null,
          'aria-labelledby': computedAriaLabelledby || null,
          'aria-disabled': this.disabled ? 'true' : null,
          'aria-readonly': this.readonly && !this.disabled ? 'true' : null
        }
      },
      [$header, $spinners, $slot]
    )
  }
})
