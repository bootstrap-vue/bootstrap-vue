import Vue from '../../utils/vue'
import KeyCodes from '../../utils/key-codes'
import identity from '../../utils/identity'
import looseEqual from '../../utils/loose-equal'
import { arrayIncludes, concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import {
  createDate,
  createDateFormatter,
  datesEqual,
  firstDateOfMonth,
  formatYMD,
  lastDateOfMonth,
  oneMonthAgo,
  oneMonthAhead,
  oneYearAgo,
  oneYearAhead,
  parseYMD,
  resolveLocale
} from '../../utils/date'
import { requestAF } from '../../utils/dom'
import { isArray, isFunction, isPlainObject, isString } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { toString } from '../../utils/string'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BIconChevronLeft, BIconCircleFill } from '../../icons/icons'
import { BIconstack } from '../../icons/iconstack'

// --- Constants ---

const NAME = 'BCalendar'

// Key Codes
const { UP, DOWN, LEFT, RIGHT, PAGEUP, PAGEDOWN, HOME, END, ENTER, SPACE } = KeyCodes

// Languages that are RTL
const RTL_LANGS = [
  'ar',
  'az',
  'ckb',
  'fa',
  'he',
  'ks',
  'lrc',
  'mzn',
  'ps',
  'sd',
  'te',
  'ug',
  'ur',
  'yi'
].map(locale => locale.toLowerCase())

// --- Helper utilities ---

export const isLocaleRTL = locale => {
  // Determines if the locale is RTL (only single locale supported)
  const parts = toString(locale)
    .toLowerCase()
    .replace(/-u-.+/, '')
    .split('-')
  const locale1 = parts.slice(0, 2).join('-')
  const locale2 = parts[0]
  return arrayIncludes(RTL_LANGS, locale1) || arrayIncludes(RTL_LANGS, locale2)
}

// --- BCalendar component ---

// @vue/component
export const BCalendar = Vue.extend({
  name: NAME,
  mixins: [idMixin, normalizeSlotMixin],
  model: {
    // Even though this is the default that Vue assumes, we need
    // to add it for the docs to reflect that this is the model
    // And also for some validation libraries to work
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Date]
      // default: null
    },
    valueAsDate: {
      // Always return the `v-model` value as a date object
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    min: {
      type: [String, Date]
      // default: null
    },
    max: {
      type: [String, Date]
      // default: null
    },
    dateDisabledFn: {
      type: Function
      // default: null
    },
    startWeekday: {
      // `0` (Sunday), `1` (Monday), ... `6` (Saturday)
      // Day of week to start calendar on
      type: [Number, String],
      default: 0
    },
    locale: {
      // Locale(s) to use
      // Default is to use page/browser default setting
      type: [String, Array]
      // default: null
    },
    direction: {
      // 'ltr', 'rtl', or `null` (for auto detect)
      type: String
      // default: null
    },
    selectedVariant: {
      // Variant color to use for the selected date
      type: String,
      default: 'primary'
    },
    todayVariant: {
      // Variant color to use for today's date (defaults to `variant`)
      type: String
      // default: null
    },
    noHighlightToday: {
      // Disable highlighting today's date
      type: Boolean,
      default: false
    },
    dateInfoFn: {
      // Function to set a class of (classes) on the date cell
      // if passed a string or an array
      // TODO:
      //   If the function returns an object, look for class prop for classes,
      //   and other props for handling events/details/descriptions
      type: Function
      // default: null
    },
    width: {
      // Has no effect if prop `block` is set
      type: String,
      default: '270px'
    },
    block: {
      // Makes calendar the full width of its parent container
      type: Boolean,
      default: false
    },
    hideHeader: {
      // When true makes the selected date header `sr-only`
      type: Boolean,
      default: false
    },
    hidden: {
      // When `true`, renders a comment node, but keeps the component instance active
      // Mainly for <b-form-date>, so that we can get the component's value and locale
      // But we might just use separate date formatters, using the resolved locale
      // (adjusted for the gregorian calendar)
      type: Boolean,
      default: false
    },
    ariaControls: {
      type: String
      // default: null
    },
    roleDescription: {
      type: String
      // default: null
    },
    // Labels for buttons and keyboard shortcuts
    labelPrevYear: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelPrevYear')
    },
    labelPrevMonth: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelPrevMonth')
    },
    labelCurrentMonth: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelCurrentMonth')
    },
    labelNextMonth: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelNextMonth')
    },
    labelNextYear: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelNextYear')
    },
    labelToday: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelToday')
    },
    labelSelected: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelSelected')
    },
    labelNoDateSelected: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelNoDateSelected')
    },
    labelCalendar: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelCalendar')
    },
    labelNav: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelNav')
    },
    labelHelp: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelHelp')
    }
  },
  data() {
    const selected = formatYMD(this.value) || ''
    return {
      // Selected date
      selectedYMD: selected,
      // Date in calendar grid that has `tabindex` of `0`
      activeYMD: selected || formatYMD(this.getToday()),
      // Will be true if the calendar grid has/contains focus
      gridHasFocus: false,
      // Flag to enable the `aria-live` region(s) after mount
      // to prevent screen reader "outbursts" when mounting
      isLive: false
    }
  },
  computed: {
    // TODO: Use computed props to convert `YYYY-MM-DD` to `Date` object
    selectedDate() {
      // Selected as a `Date` object
      return parseYMD(this.selectedYMD)
    },
    activeDate() {
      // Active as a `Date` object
      return parseYMD(this.activeYMD)
    },
    computedMin() {
      return parseYMD(this.min)
    },
    computedMax() {
      return parseYMD(this.max)
    },
    computedWeekStarts() {
      // `startWeekday` is a prop (constrained to `0` through `6`)
      return Math.max(toInteger(this.startWeekday) || 0, 0) % 7
    },
    computedLocale() {
      // Returns the resolved locale used by the calendar
      return resolveLocale(concat(this.locale).filter(identity), 'gregory')
    },
    calendarLocale() {
      // This locale enforces the gregorian calendar (for use in formatter functions)
      // Needed because IE 11 resolves `ar-IR` as islamic-civil calendar
      // and IE 11 (and some other browsers) do not support the `calendar` option
      // And we currently only support the gregorian calendar
      const fmt = new Intl.DateTimeFormat(this.computedLocale, { calendar: 'gregory' })
      const calendar = fmt.resolvedOptions().calendar
      let locale = fmt.resolvedOptions().locale
      /* istanbul ignore if: mainly for IE 11 and a few other browsers, hard to test in JSDOM */
      if (calendar !== 'gregory') {
        // Ensure the locale requests the gregorian calendar
        // Mainly for IE 11, and currently we can't handle non-gregorian calendars
        // TODO: Should we always return this value?
        locale = locale.replace(/-u-.+$/i, '').concat('-u-ca-gregory')
      }
      return locale
    },
    calendarYear() {
      return this.activeDate.getFullYear()
    },
    calendarMonth() {
      return this.activeDate.getMonth()
    },
    calendarFirstDay() {
      return createDate(this.calendarYear, this.calendarMonth, 1)
    },
    calendarDaysInMonth() {
      // We create a new date as to not mutate the original
      const date = createDate(this.calendarFirstDay)
      date.setMonth(date.getMonth() + 1, 0)
      return date.getDate()
    },
    computedVariant() {
      return `btn-${this.selectedVariant || 'primary'}`
    },
    computedTodayVariant() {
      return `btn-outline-${this.todayVariant || this.selectedVariant || 'primary'}`
    },
    isRTL() {
      // `true` if the language requested is RTL
      const dir = toString(this.direction).toLowerCase()
      if (dir === 'rtl') {
        /* istanbul ignore next */
        return true
      } else if (dir === 'ltr') {
        /* istanbul ignore next */
        return false
      }
      return isLocaleRTL(this.computedLocale)
    },
    context() {
      const selectedYMD = this.selectedYMD
      const selectedDate = parseYMD(selectedYMD)
      const activeYMD = this.activeYMD
      const activeDate = parseYMD(activeYMD)
      return {
        // The current value of the `v-model`
        selectedYMD: selectedYMD,
        selectedDate: selectedDate,
        selectedFormatted: selectedDate
          ? this.formatDateString(selectedDate)
          : this.labelNoDateSelected,
        // Which date cell is considered active due to navigation
        activeYMD: activeYMD,
        activeDate: activeDate,
        activeFormatted: activeDate ? this.formatDateString(activeDate) : '',
        // `true` if the date is disabled (when using keyboard navigation)
        disabled: this.dateDisabled(activeDate),
        // Locales used in formatting dates
        locale: this.computedLocale,
        calendarLocale: this.calendarLocale,
        rtl: this.isRTL
      }
    },
    // Computed props that return a function reference
    dateOutOfRange() {
      // Check wether a date is within the min/max range
      // returns a new function ref if the pops change
      // We do this as we need to trigger the calendar computed prop
      // to update when these props update
      const min = this.computedMin
      const max = this.computedMax
      return date => {
        // Handle both `YYYY-MM-DD` and `Date` objects
        date = parseYMD(date)
        return (min && date < min) || (max && date > max)
      }
    },
    dateDisabled() {
      // Returns a function for validating if a date is within range
      // We grab this variables first to ensure a new function ref
      // is generated when the props value changes
      // We do this as we need to trigger the calendar computed prop
      // to update when these props update
      const rangeFn = this.dateOutOfRange
      const disabledFn = isFunction(this.dateDisabledFn) ? this.dateDisabledFn : () => false
      // Return the function ref
      return date => {
        // Handle both `YYYY-MM-DD` and `Date` objects
        date = parseYMD(date)
        const ymd = formatYMD(date)
        return !!(rangeFn(date) || disabledFn(ymd, date))
      }
    },
    // Computed props that return date formatter functions
    formatDateString() {
      // Returns a date formatter function
      return createDateFormatter(this.calendarLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        calendar: 'gregory'
      })
    },
    formatYearMonth() {
      // Returns a date formatter function
      return createDateFormatter(this.calendarLocale, {
        year: 'numeric',
        month: 'long',
        calendar: 'gregory'
      })
    },
    formatWeekdayName() {
      return createDateFormatter(this.calendarLocale, { weekday: 'long', calendar: 'gregory' })
    },
    formatWeekdayNameShort() {
      // Used as the header cells
      return createDateFormatter(this.calendarLocale, { weekday: 'short', calendar: 'gregory' })
    },
    formatDay() {
      return createDateFormatter(this.calendarLocale, { day: 'numeric', calendar: 'gregory' })
    },
    // Disabled states for the nav buttons
    prevYearDisabled() {
      const min = this.computedMin
      return this.disabled || (min && lastDateOfMonth(oneYearAgo(this.activeDate)) < min)
    },
    prevMonthDisabled() {
      const min = this.computedMin
      return this.disabled || (min && lastDateOfMonth(oneMonthAgo(this.activeDate)) < min)
    },
    thisMonthDisabled() {
      // TODO: We could/should check if today is out of range
      return this.disabled
    },
    nextMonthDisabled() {
      const max = this.computedMax
      return this.disabled || (max && firstDateOfMonth(oneMonthAhead(this.activeDate)) > max)
    },
    nextYearDisabled() {
      const max = this.computedMax
      return this.disabled || (max && firstDateOfMonth(oneYearAhead(this.activeDate)) > max)
    },
    // Calendar generation
    calendar() {
      const matrix = []
      const firstDay = this.calendarFirstDay
      const calendarYear = firstDay.getFullYear()
      const calendarMonth = firstDay.getMonth()
      const daysInMonth = this.calendarDaysInMonth
      const startIndex = firstDay.getDay() // `0`..`6`
      const weekOffset = (this.computedWeekStarts > startIndex ? 7 : 0) - this.computedWeekStarts
      // TODO: Change `dateInfoFn` to handle events and notes as well as classes
      const dateInfoFn = isFunction(this.dateInfoFn) ? this.dateInfoFn : () => ({})
      // Build the calendar matrix
      let currentDay = 0 - weekOffset - startIndex
      for (let week = 0; week < 6 && currentDay < daysInMonth; week++) {
        // For each week
        matrix[week] = []
        // The following could be a map function
        for (let j = 0; j < 7; j++) {
          // For each day in week
          currentDay++
          const date = createDate(calendarYear, calendarMonth, currentDay)
          const month = date.getMonth()
          const dayYMD = formatYMD(date)
          const dayDisabled = this.dateDisabled(date)
          // TODO: This could be a normalizer method
          let dateInfo = dateInfoFn(dayYMD, parseYMD(dayYMD))
          dateInfo =
            isString(dateInfo) || isArray(dateInfo)
              ? { class: dateInfo }
              : isPlainObject(dateInfo)
                ? { class: '', ...dateInfo }
                : { class: '' }
          matrix[week].push({
            ymd: dayYMD,
            // Cell content
            day: this.formatDay(date),
            label: this.formatDateString(date),
            // Flags for styling
            isThisMonth: month === calendarMonth,
            isDisabled: dayDisabled,
            // TODO: Handle other dateInfo properties such as notes/events
            info: dateInfo
          })
        }
      }
      return matrix
    },
    calendarHeadings() {
      return this.calendar[0].map(d => {
        return {
          text: this.formatWeekdayNameShort(parseYMD(d.ymd)),
          label: this.formatWeekdayName(parseYMD(d.ymd))
        }
      })
    }
  },
  watch: {
    value(newVal, oldVal) {
      const selected = formatYMD(newVal) || ''
      const old = formatYMD(oldVal) || ''
      if (!datesEqual(selected, old)) {
        this.activeYMD = selected || this.activeYMD
        this.selectedYMD = selected
      }
    },
    selectedYMD(newYMD, oldYMD) {
      // TODO:
      //   Should we compare to `formatYMD(this.value)` and emit
      //   only if they are different?
      if (newYMD !== oldYMD) {
        this.$emit('input', this.valueAsDate ? parseYMD(newYMD) || null : newYMD || '')
      }
    },
    context(newVal, oldVal) {
      if (!looseEqual(newVal, oldVal)) {
        this.$emit('context', newVal)
      }
    },
    hidden(newVal) {
      // Reset the active focused day when hidden
      this.activeYMD = this.selectedYMD || formatYMD(this.value) || formatYMD(this.getToday())
      // Enable/disable the live regions
      this.setLive(!newVal)
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
    // Public method(s)
    focus() {
      if (!this.disabled) {
        try {
          this.$refs.grid.focus()
        } catch {}
      }
    },
    blur() {
      try {
        this.$refs.grid.blur()
      } catch {}
    },
    // Private methods
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
    },
    getToday() {
      return parseYMD(createDate())
    },
    constrainDate(date) {
      // Constrains a date between min and max
      // returns a new `Date` object instance
      date = parseYMD(date)
      const min = this.computedMin || date
      const max = this.computedMax || date
      return createDate(date < min ? min : date > max ? max : date)
    },
    emitSelected(date) {
      // Performed in a `$nextTick()` to (probably) ensure
      // the input event has emitted first
      this.$nextTick(() => {
        this.$emit('selected', formatYMD(date) || '', parseYMD(date) || null)
      })
    },
    // Event handlers
    setGridFocusFlag(evt) {
      // Sets the gridHasFocus flag to make date "button" look focused
      this.gridHasFocus = !this.disabled && evt.type === 'focus'
    },
    onKeydownWrapper(evt) {
      // Calendar keyboard navigation
      // Handles PAGEUP/PAGEDOWN/END/HOME/LEFT/UP/RIGHT/DOWN
      // Focuses grid after updating
      const keyCode = evt.keyCode
      const altKey = evt.altKey
      if (!arrayIncludes([PAGEUP, PAGEDOWN, END, HOME, LEFT, UP, RIGHT, DOWN], keyCode)) {
        /* istanbul ignore next */
        return
      }
      evt.preventDefault()
      evt.stopPropagation()
      let activeDate = createDate(this.activeDate)
      let checkDate = createDate(this.activeDate)
      const day = activeDate.getDate()
      const isRTL = this.isRTL
      if (keyCode === PAGEUP) {
        // PAGEUP - Previous month/year
        activeDate = (altKey ? oneYearAgo : oneMonthAgo)(activeDate)
        // We check the first day of month to be in rage
        checkDate = createDate(activeDate)
        checkDate.setDate(1)
      } else if (keyCode === PAGEDOWN) {
        // PAGEDOWN - Next month/year
        activeDate = (altKey ? oneYearAhead : oneMonthAhead)(activeDate)
        // We check the last day of month to be in rage
        checkDate = createDate(activeDate)
        checkDate.setMonth(checkDate.getMonth() + 1)
        checkDate.setDate(0)
      } else if (keyCode === LEFT) {
        // LEFT - Previous day (or next day for RTL)
        activeDate.setDate(day + (isRTL ? 1 : -1))
        checkDate = activeDate
      } else if (keyCode === RIGHT) {
        // RIGHT - Next day (or previous day for RTL)
        activeDate.setDate(day + (isRTL ? -1 : 1))
        checkDate = activeDate
      } else if (keyCode === UP) {
        // UP - Previous week
        activeDate.setDate(day - 7)
        checkDate = activeDate
      } else if (keyCode === DOWN) {
        // DOWN - Next week
        activeDate.setDate(day + 7)
        checkDate = activeDate
      } else if (keyCode === HOME) {
        // HOME - Today
        activeDate = this.getToday()
        checkDate = activeDate
      } else if (keyCode === END) {
        // END - Selected date, or today if no selected date
        activeDate = parseYMD(this.selectedDate) || this.getToday()
        checkDate = activeDate
      }
      if (!this.dateOutOfRange(checkDate) && !datesEqual(activeDate, this.activeDate)) {
        // We only jump to date if within min/max
        // We don't check for individual disabled dates though (via user function)
        this.activeYMD = formatYMD(activeDate)
      }
      // Ensure grid is focused
      this.focus()
    },
    onKeydownGrid(evt) {
      // Pressing enter/space on grid to select active date
      const keyCode = evt.keyCode
      const activeDate = this.activeDate
      if (keyCode === ENTER || keyCode === SPACE) {
        evt.preventDefault()
        evt.stopPropagation()
        if (!this.disabled && !this.readonly && !this.dateDisabled(activeDate)) {
          this.selectedYMD = formatYMD(activeDate)
          this.emitSelected(activeDate)
        }
        // Ensure grid is focused
        this.focus()
      }
    },
    onClickDay(day) {
      // Clicking on a date "button" to select it
      // TODO: Change to lookup the `data-data` attribute
      const selectedDate = this.selectedDate
      const activeDate = this.activeDate
      const clickedDate = parseYMD(day.ymd)
      if (!this.disabled && !day.isDisabled && !this.dateDisabled(clickedDate)) {
        if (!this.readonly) {
          // If readonly mode, we don't set the selected date, just the active date
          // If the clicked date is equal to the already selected date, we don't update the model
          this.selectedYMD = formatYMD(
            datesEqual(clickedDate, selectedDate) ? selectedDate : clickedDate
          )
          this.emitSelected(clickedDate)
        }
        this.activeYMD = formatYMD(
          datesEqual(clickedDate, activeDate) ? activeDate : createDate(clickedDate)
        )
        // Ensure grid is focused
        this.focus()
      }
    },
    gotoPrevYear() {
      this.activeYMD = formatYMD(this.constrainDate(oneYearAgo(this.activeDate)))
    },
    gotoPrevMonth() {
      this.activeYMD = formatYMD(this.constrainDate(oneMonthAgo(this.activeDate)))
    },
    gotoCurrentMonth() {
      // TODO: Maybe this goto date should be configurable?
      this.activeYMD = formatYMD(this.getToday())
    },
    gotoNextMonth() {
      this.activeYMD = formatYMD(this.constrainDate(oneMonthAhead(this.activeDate)))
    },
    gotoNextYear() {
      this.activeYMD = formatYMD(this.constrainDate(oneYearAhead(this.activeDate)))
    }
  },
  render(h) {
    // If hidden prop is set, render just a placeholder node
    if (this.hidden) {
      return h()
    }

    const isRTL = this.isRTL
    const todayYMD = formatYMD(this.getToday())
    const selectedYMD = this.selectedYMD
    const activeYMD = this.activeYMD
    const highlightToday = !this.noHighlightToday
    const safeId = this.safeId
    // Flag for making the `aria-live` regions live
    const isLive = this.isLive
    // Pre-compute some IDs
    const idWidget = safeId()
    const idValue = safeId('_calendar-value_')
    const idNav = safeId('_calendar-nav_')
    const idGrid = safeId('_calendar-grid_')
    const idGridCaption = safeId('_calendar-grid-caption_')
    const idGridHelp = safeId('_calendar-grid-help_')
    const idActive = activeYMD ? safeId(`_cell-${activeYMD}_`) : null

    // Header showing current selected date
    let $header = h(
      'output',
      {
        staticClass: 'd-block text-center rounded border small p-1 mb-1',
        class: { 'text-muted': this.disabled, readonly: this.readonly || this.disabled },
        attrs: {
          id: idValue,
          for: idGrid,
          role: 'status',
          // Mainly for testing purposes, as we do not know
          // the exact format `Intl` will format the date string
          'data-selected': toString(selectedYMD),
          // We wait until after mount to enable `aria-live`
          // to prevent initial announcement on page render
          'aria-live': isLive ? 'polite' : 'off',
          'aria-atomic': isLive ? 'true' : null
        }
      },
      this.selectedDate
        ? [
            // We use `bdi` elements here in case the label doesn't match the locale
            // Although IE 11 does not deal with <BDI> at all (equivalent to a span)
            h('bdi', { staticClass: 'sr-only' }, ` (${toString(this.labelSelected)}) `),
            h('bdi', {}, this.formatDateString(this.selectedDate))
          ]
        : this.labelNoDateSelected || '\u00a0' // '&nbsp;'
    )
    $header = h(
      'header',
      {
        class: this.hideHeader ? 'sr-only' : 'mb-1',
        attrs: { title: this.selectedDate ? this.labelSelectedDate || null : null }
      },
      [$header]
    )

    // Content for the date navigation buttons
    const $prevYearIcon = h(BIconstack, { props: { shiftV: 0.5, flipH: isRTL } }, [
      h(BIconChevronLeft, { props: { shiftH: -2 } }),
      h(BIconChevronLeft, { props: { shiftH: 2 } })
    ])
    const $prevMonthIcon = h(BIconChevronLeft, { props: { shiftV: 0.5, flipH: isRTL } })
    const $thisMonthIcon = h(BIconCircleFill, { props: { shiftV: 0.5 } })
    const $nextMonthIcon = h(BIconChevronLeft, { props: { shiftV: 0.5, flipH: !isRTL } })
    const $nextYearIcon = h(BIconstack, { props: { shiftV: 0.5, flipH: !isRTL } }, [
      h(BIconChevronLeft, { props: { shiftH: -2 } }),
      h(BIconChevronLeft, { props: { shiftH: 2 } })
    ])

    // Utility to create the date navigation buttons
    const makeNavBtn = (content, label, handler, btnDisabled, shortcut) => {
      return h(
        'button',
        {
          staticClass: 'btn btn-sm btn-outline-secondary border-0 flex-fill p-1 mx-1',
          class: { disabled: btnDisabled },
          attrs: {
            title: label || null,
            type: 'button',
            'aria-label': label || null,
            'aria-disabled': btnDisabled ? 'true' : null,
            'aria-keyshortcuts': shortcut || null
          },
          on: btnDisabled ? {} : { click: handler }
        },
        [h('div', { attrs: { 'aria-hidden': 'true' } }, [content])]
      )
    }

    // Generate the date navigation buttons
    const $nav = h(
      'div',
      {
        staticClass: 'b-calendar-nav d-flex mx-n1 mb-1',
        attrs: {
          id: idNav,
          role: 'group',
          'aria-hidden': this.disabled ? 'true' : null,
          'aria-label': this.labelNav || null,
          'aria-controls': idGrid
        }
      },
      [
        makeNavBtn(
          $prevYearIcon,
          this.labelPrevYear,
          this.gotoPrevYear,
          this.prevYearDisabled,
          'Alt+PageDown'
        ),
        makeNavBtn(
          $prevMonthIcon,
          this.labelPrevMonth,
          this.gotoPrevMonth,
          this.prevMonthDisabled,
          'PageDown'
        ),
        makeNavBtn(
          $thisMonthIcon,
          this.labelCurrentMonth,
          this.gotoCurrentMonth,
          this.thisMonthDisabled,
          'Home'
        ),
        makeNavBtn(
          $nextMonthIcon,
          this.labelNextMonth,
          this.gotoNextMonth,
          this.nextMonthDisabled,
          'PageUp'
        ),
        makeNavBtn(
          $nextYearIcon,
          this.labelNextYear,
          this.gotoNextYear,
          this.nextYearDisabled,
          'Alt+PageUp'
        )
      ]
    )

    // Caption for calendar grid
    const $gridCaption = h(
      'header',
      {
        key: 'grid-caption',
        staticClass: 'text-center font-weight-bold p-1 m-0',
        class: { 'text-muted': this.disabled },
        attrs: {
          id: idGridCaption,
          'aria-live': isLive ? 'polite' : null,
          'aria-atomic': isLive ? 'true' : null
        }
      },
      this.formatYearMonth(this.calendarFirstDay)
    )

    // Calendar weekday headings
    const $gridWeekDays = h(
      'div',
      { staticClass: 'row no-gutters border-bottom', attrs: { 'aria-hidden': 'true' } },
      this.calendarHeadings.map((d, idx) => {
        return h(
          'small',
          {
            key: idx,
            staticClass: 'col',
            class: { 'text-muted': this.disabled },
            attrs: {
              title: d.label === d.text ? null : d.label,
              'aria-label': d.label
            }
          },
          d.text
        )
      })
    )

    // Calendar day grid
    let $gridBody = this.calendar.map(week => {
      const $cells = week.map((day, dIndex) => {
        const isSelected = day.ymd === selectedYMD
        const isActive = day.ymd === activeYMD
        const isToday = day.ymd === todayYMD
        const idCell = safeId(`_cell-${day.ymd}_`)
        // "fake" button
        const $btn = h(
          'span',
          {
            staticClass: 'btn border-0 rounded-circle text-nowrap',
            // Should we add some classes to signify if today/selected/etc?
            class: {
              // Give the fake button a focus ring
              focus: isActive && this.gridHasFocus,
              // Styling
              disabled: day.isDisabled || this.disabled,
              active: isSelected, // makes the button look "pressed"
              // Selected date style (need to computed from variant)
              [this.computedVariant]: isSelected,
              // Today day style (if not selected), same variant color as selected date
              [this.computedTodayVariant]:
                isToday && highlightToday && !isSelected && day.isThisMonth,
              // Non selected/today styling
              'btn-outline-light': !(isToday && highlightToday) && !isSelected && !isActive,
              'btn-light': !(isToday && highlightToday) && !isSelected && isActive,
              // Text styling
              'text-muted': !day.isThisMonth && !isSelected,
              'text-dark':
                !(isToday && highlightToday) && !isSelected && !isActive && day.isThisMonth,
              'font-weight-bold': (isSelected || day.isThisMonth) && !day.isDisabled
            },
            on: { click: () => this.onClickDay(day) }
          },
          day.day
        )
        return h(
          'div', // Cell with button
          {
            key: dIndex,
            staticClass: 'col p-0',
            class: day.isDisabled ? 'bg-light' : day.info.class || '',
            attrs: {
              id: idCell,
              role: 'button',
              'data-date': day.ymd, // Primarily for testing purposes
              // Only days in the month are presented as buttons to screen readers
              'aria-hidden': day.isThisMonth ? null : 'true',
              'aria-disabled': day.isDisabled || this.disabled ? 'true' : null,
              'aria-label': [
                day.label,
                isSelected ? `(${this.labelSelected})` : null,
                isToday ? `(${this.labelToday})` : null
              ]
                .filter(identity)
                .join(' '),
              // NVDA doesn't convey `aria-selected`, but does `aria-current`,
              // ChromeVox doesn't convey `aria-current`, but does `aria-selected`,
              // so we set both attributes for robustness
              'aria-selected': isSelected ? 'true' : null,
              'aria-current': isSelected ? 'date' : null
            }
          },
          [$btn]
        )
      })
      // Return the week "row"
      // We use the first day of the weeks YMD value as a
      // key for efficient DOM patching / element re-use
      return h('div', { key: week[0].ymd, staticClass: 'row no-gutters' }, $cells)
    })
    $gridBody = h(
      'div',
      {
        // A key is only required on the body if we add in transition support
        // key: this.activeYMD.slice(0, -3),
        staticClass: 'b-calendar-grid-body',
        style: this.disabled ? { pointerEvents: 'none' } : {}
      },
      $gridBody
    )

    const $gridHelp = h(
      'footer',
      {
        staticClass: 'border-top small text-muted text-center bg-light',
        attrs: {
          id: idGridHelp
        }
      },
      [h('div', { staticClass: 'small' }, this.labelHelp)]
    )

    const $grid = h(
      'div',
      {
        ref: 'grid',
        staticClass: 'form-control h-auto text-center p-0 mb-0',
        attrs: {
          id: idGrid,
          role: 'application',
          tabindex: this.disabled ? null : '0',
          'data-month': activeYMD.slice(0, -3), // `YYYY-MM`, mainly for testing
          // tabindex: this.disabled ? null : '0',
          'aria-roledescription': this.labelCalendar || null,
          'aria-labelledby': idGridCaption,
          'aria-describedby': idGridHelp,
          // `aria-readonly` is not considered valid on `role="application"`
          // https://www.w3.org/TR/wai-aria-1.1/#aria-readonly
          // 'aria-readonly': this.readonly && !this.disabled ? 'true' : null,
          'aria-disabled': this.disabled ? 'true' : null,
          'aria-activedescendant': idActive
        },
        on: {
          keydown: this.onKeydownGrid,
          focus: this.setGridFocusFlag,
          blur: this.setGridFocusFlag
        }
      },
      [$gridCaption, $gridWeekDays, $gridBody, $gridHelp]
    )

    // Optional bottom slot
    let $slot = this.normalizeSlot('default')
    $slot = $slot ? h('footer', { staticClass: 'mt-2' }, $slot) : h()

    const $widget = h(
      'div',
      {
        class: this.block ? 'd-block' : 'd-inline-block',
        style: this.block ? {} : { width: this.width },
        attrs: {
          id: idWidget,
          dir: isRTL ? 'rtl' : 'ltr',
          lang: this.computedLocale || null,
          role: 'group',
          'aria-disabled': this.disabled ? 'true' : null,
          // If datepicker controls an input, this will specify the ID of the input
          'aria-controls': this.ariaControls || null,
          // This should be a prop (so it can be changed to Date picker, etc, localized
          'aria-roledescription': this.roleDescription || null,
          'aria-describedby': [
            // Should the attr (if present) go last?
            // Or should this attr be a prop?
            this.$attrs['aria-describedby'],
            idValue,
            idGridHelp
          ]
            .filter(identity)
            .join(' ')
        },
        on: {
          keydown: this.onKeydownWrapper
        }
      },
      [$header, $nav, $grid, $slot]
    )

    // Wrap in an outer div that can be styled
    return h(
      'div',
      {
        staticClass: 'b-calendar',
        // We use a style here rather than class `d-inline-block` so that users can
        // override the display value (`d-*` classes use the `!important` flag)
        style: this.block ? {} : { display: 'inline-block' }
      },
      [$widget]
    )
  }
})
