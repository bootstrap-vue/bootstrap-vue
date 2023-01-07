// BTime control (not form input control)
import { extend, REF_FOR_KEY } from '../../vue'
import { NAME_TIME } from '../../constants/components'
import { EVENT_NAME_CONTEXT } from '../../constants/events'
import { CODE_LEFT, CODE_RIGHT } from '../../constants/key-codes'
import {
  PROP_TYPE_ARRAY_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { RX_TIME } from '../../constants/regex'
import { concat } from '../../utils/array'
import { createDate, createDateFormatter } from '../../utils/date'
import { attemptBlur, attemptFocus, contains, getActiveElement, requestAF } from '../../utils/dom'
import { stopEvent } from '../../utils/events'
import { identity } from '../../utils/identity'
import { isNull, isUndefinedOrNull } from '../../utils/inspect'
import { looseEqual } from '../../utils/loose-equal'
import { isLocaleRTL } from '../../utils/locale'
import { makeModelMixin } from '../../utils/model'
import { toInteger } from '../../utils/number'
import { pick, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { toString } from '../../utils/string'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BFormSpinbutton, props as BFormSpinbuttonProps } from '../form-spinbutton/form-spinbutton'
import { BIconCircleFill, BIconChevronUp } from '../../icons/icons'

// --- Constants ---

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('value', {
  type: PROP_TYPE_STRING,
  defaultValue: ''
})

const NUMERIC = 'numeric'

// --- Helper methods ---

const padLeftZeros = value => `00${value || ''}`.slice(-2)

const parseHMS = value => {
  value = toString(value)
  let [hh, mm, ss] = [null, null, null]
  if (RX_TIME.test(value)) {
    ;[hh, mm, ss] = value.split(':').map(v => toInteger(v, null))
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

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...modelProps,
    ...pick(BFormSpinbuttonProps, ['labelIncrement', 'labelDecrement']),
    // ID of label element
    ariaLabelledby: makeProp(PROP_TYPE_STRING),
    disabled: makeProp(PROP_TYPE_BOOLEAN, false),
    footerTag: makeProp(PROP_TYPE_STRING, 'footer'),
    headerTag: makeProp(PROP_TYPE_STRING, 'header'),
    hidden: makeProp(PROP_TYPE_BOOLEAN, false),
    hideHeader: makeProp(PROP_TYPE_BOOLEAN, false),
    // Explicitly force 12 or 24 hour time
    // Default is to use resolved locale for 12/24 hour display
    // Tri-state: `true` = 12, `false` = 24, `null` = auto
    hour12: makeProp(PROP_TYPE_BOOLEAN, null),
    labelAm: makeProp(PROP_TYPE_STRING, 'AM'),
    labelAmpm: makeProp(PROP_TYPE_STRING, 'AM/PM'),
    labelHours: makeProp(PROP_TYPE_STRING, 'Hours'),
    labelMinutes: makeProp(PROP_TYPE_STRING, 'Minutes'),
    labelNoTimeSelected: makeProp(PROP_TYPE_STRING, 'No time selected'),
    labelPm: makeProp(PROP_TYPE_STRING, 'PM'),
    labelSeconds: makeProp(PROP_TYPE_STRING, 'Seconds'),
    labelSelected: makeProp(PROP_TYPE_STRING, 'Selected time'),
    locale: makeProp(PROP_TYPE_ARRAY_STRING),
    minutesStep: makeProp(PROP_TYPE_NUMBER_STRING, 1),
    readonly: makeProp(PROP_TYPE_BOOLEAN, false),
    secondsStep: makeProp(PROP_TYPE_NUMBER_STRING, 1),
    // If `true`, show the second spinbutton
    showSeconds: makeProp(PROP_TYPE_BOOLEAN, false)
  }),
  NAME_TIME
)

// --- Main component ---

// @vue/component
export const BTime = /*#__PURE__*/ extend({
  name: NAME_TIME,
  mixins: [idMixin, modelMixin, normalizeSlotMixin],
  props,
  data() {
    const parsed = parseHMS(this[MODEL_PROP_NAME] || '')
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
        hour12,
        hourCycle
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
    [MODEL_PROP_NAME](newValue, oldValue) {
      if (newValue !== oldValue && !looseEqual(parseHMS(newValue), parseHMS(this.computedHMS))) {
        const { hours, minutes, seconds, ampm } = parseHMS(newValue)
        this.modelHours = hours
        this.modelMinutes = minutes
        this.modelSeconds = seconds
        this.modelAmpm = ampm
      }
    },
    computedHMS(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit(MODEL_EVENT_NAME, newValue)
      }
    },
    context(newValue, oldValue) {
      if (!looseEqual(newValue, oldValue)) {
        this.$emit(EVENT_NAME_CONTEXT, newValue)
      }
    },
    modelAmpm(newValue, oldValue) {
      if (newValue !== oldValue) {
        const hours = isNull(this.modelHours) ? 0 : this.modelHours
        this.$nextTick(() => {
          if (newValue === 0 && hours > 11) {
            // Switched to AM
            this.modelHours = hours - 12
          } else if (newValue === 1 && hours < 12) {
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
      this.$emit(EVENT_NAME_CONTEXT, this.context)
    })
  },
  mounted() {
    this.setLive(true)
  },
  /* istanbul ignore next */
  activated() {
    this.setLive(true)
  },
  /* istanbul ignore next */
  deactivated() {
    this.setLive(false)
  },
  beforeDestroy() {
    this.setLive(false)
  },
  methods: {
    // Public methods
    focus() {
      if (!this.disabled) {
        // We focus the first spin button
        attemptFocus(this.$refs.spinners[0])
      }
    },
    blur() {
      if (!this.disabled) {
        const activeElement = getActiveElement()
        if (contains(this.$el, activeElement)) {
          attemptBlur(activeElement)
        }
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
            ? /* istanbul ignore next */ 24
            : hh === 12 && hourCycle === 'h11'
              ? /* istanbul ignore next */ 0
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
    onSpinLeftRight(event = {}) {
      const { type, keyCode } = event
      if (
        !this.disabled &&
        type === 'keydown' &&
        (keyCode === CODE_LEFT || keyCode === CODE_RIGHT)
      ) {
        stopEvent(event)
        const spinners = this.$refs.spinners || []
        let index = spinners.map(cmp => !!cmp.hasFocus).indexOf(true)
        index = index + (keyCode === CODE_LEFT ? -1 : 1)
        index = index >= spinners.length ? 0 : index < 0 ? spinners.length - 1 : index
        attemptFocus(spinners[index])
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
    // If hidden, we just render a placeholder comment
    /* istanbul ignore if */
    if (this.hidden) {
      return h()
    }

    const {
      disabled,
      readonly,
      computedLocale: locale,
      computedAriaLabelledby: ariaLabelledby,
      labelIncrement,
      labelDecrement,
      valueId,
      focus: focusHandler
    } = this
    const spinIds = []

    // Helper method to render a spinbutton
    const makeSpinbutton = (handler, key, classes, spinbuttonProps = {}) => {
      const id = this.safeId(`_spinbutton_${key}_`) || null
      spinIds.push(id)

      return h(BFormSpinbutton, {
        class: classes,
        props: {
          id,
          placeholder: '--',
          vertical: true,
          required: true,
          disabled,
          readonly,
          locale,
          labelIncrement,
          labelDecrement,
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
        },
        key,
        ref: 'spinners',
        [REF_FOR_KEY]: true
      })
    }

    // Helper method to return a "colon" separator
    const makeColon = () => {
      return h(
        'div',
        {
          staticClass: 'd-flex flex-column',
          class: { 'text-muted': disabled || readonly },
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
      makeSpinbutton(this.setHours, 'hours', 'b-time-hours', {
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
      makeSpinbutton(this.setMinutes, 'minutes', 'b-time-minutes', {
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
        makeSpinbutton(this.setSeconds, 'seconds', 'b-time-seconds', {
          value: this.modelSeconds,
          max: 59,
          step: this.secondsStep || 1,
          formatterFn: this.formatSeconds,
          ariaLabel: this.labelSeconds
        })
      )
    }

    // AM/PM ?
    // depends on client settings, shouldn't be rendered on server
    if (this.isLive && this.is12Hour) {
      // TODO:
      //   If locale is RTL, unshift this instead of push?
      //   And switch class `ml-2` to `mr-2`
      //   Note some LTR locales (i.e. zh) also place AM/PM to the left
      $spinners.push(
        makeSpinbutton(this.setAmpm, 'ampm', 'b-time-ampm', {
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
          tabindex: disabled || readonly ? null : '-1',
          'aria-labelledby': ariaLabelledby
        },
        on: {
          keydown: this.onSpinLeftRight,
          click: /* istanbul ignore next */ event => {
            if (event.target === event.currentTarget) {
              focusHandler()
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
        staticClass: 'form-control form-control-sm text-center',
        class: {
          disabled: disabled || readonly
        },
        attrs: {
          id: valueId,
          role: 'status',
          for: spinIds.filter(identity).join(' ') || null,
          tabindex: disabled ? null : '-1',
          'aria-live': this.isLive ? 'polite' : 'off',
          'aria-atomic': 'true'
        },
        on: {
          // Transfer focus/click to focus hours spinner
          click: focusHandler,
          focus: focusHandler
        }
      },
      [
        h('bdi', this.formattedTimeString),
        this.computedHMS ? h('span', { staticClass: 'sr-only' }, ` (${this.labelSelected}) `) : ''
      ]
    )
    const $header = h(
      this.headerTag,
      {
        staticClass: 'b-time-header',
        class: { 'sr-only': this.hideHeader }
      },
      [$value]
    )

    const $content = this.normalizeSlot()
    const $footer = $content ? h(this.footerTag, { staticClass: 'b-time-footer' }, $content) : h()

    return h(
      'div',
      {
        staticClass: 'b-time d-inline-flex flex-column text-center',
        attrs: {
          role: 'group',
          lang: this.computedLang || null,
          'aria-labelledby': ariaLabelledby || null,
          'aria-disabled': disabled ? 'true' : null,
          'aria-readonly': readonly && !disabled ? 'true' : null
        }
      },
      [$header, $spinners, $footer]
    )
  }
})
