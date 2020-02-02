import Vue from '../../utils/vue'
import { arrayIncludes } from '../../utils/array'
import {
  createDate,
  createDateFormatter,
  datesEqual,
  formatYMD,
  firstDateOfMonth,
  lastDateOfMonth,
  oneYearAgo,
  oneYearAhead,
  oneMonthAgo,
  oneMonthAhead,
  parseYMD,
  resolveLocale
} from '../../utils/date'
import { requestAF } from '../../utils/dom'
import { isFunction } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { toString } from '../../utils/string'
import identity from '../../utils/identity'
import KeyCodes from '../../utils/key-codes'
import idMixin from '../../mixins/id'
import { BIconChevronLeft, BIconCircleFill } from '../../icons/icons'
import { BIconstack } from '../../icons/iconstack'

const NAME = 'BFormCalendar'

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
]

// Key Codes
const { UP, DOWN, LEFT, RIGHT, PAGEUP, PAGEDOWN, HOME, END, ENTER, SPACE } = KeyCodes

// @vue/component
export const BCalendar = Vue.extend({
  name: NAME,
  mixins: [idMixin],
  model: {
    // Even though this is the default that Vue assumes, we need
    // to add it for the docs to reflect that this is the model
    // And also for some validation libraries to work
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Date],
      default: null
    },
    valueAsDate: {
      // Always return the v-model value as a date object
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
      type: [String, Date],
      default: null
    },
    max: {
      type: [String, Date],
      default: null
    },
    allowedDates: {
      type: Function,
      default: null
    },
    startWeekday: {
      // 0 (Sunday), 1 (Monday), ... 6 (Saturday)
      // Day of week to start calendar on
      type: [Number, String],
      default: 0
    },
    locale: {
      // Locale(s) to use. default is to use page/browser default setting
      type: [String, Array],
      default: null
    },
    direction: {
      // 'ltr', 'rtl', or null (for auto detect)
      type: String,
      default: null
    },
    variant: {
      // Variant color to use for the selected date
      type: String,
      default: 'primary'
    },
    todayVariant: {
      // Variant color to use for today's date (defaults to `vairant`)
      type: String,
      default: null
    },
    width: {
      // Has no effect if prop `block` is set
      type: String,
      default: '280px'
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
      // When true, renders a comment node, but
      // keeps the component instance active
      // Mainly for b-form-date, so that we can get the component's value
      // But we might just use separate date formatters, using the resolved locale
      // (adjusted for the gregorian calendar)
      type: Boolean,
      default: false
    },
    ariaControls: {
      type: String,
      default: null
    },
    roleDescription: {
      type: String,
      default: null
    },
    noHighlightToday: {
      // Disable highlighting today's date
      type: Boolean,
      default: false
    },
    // Labels for buttons and keybord shortcuts
    labelPrevYear: {
      type: String,
      default: 'Previous year'
    },
    labelPrevMonth: {
      type: String,
      default: 'Previous month'
    },
    labelCurrentMonth: {
      type: String,
      default: 'Current month'
    },
    labelNextMonth: {
      type: String,
      default: 'Next month'
    },
    labelNextYear: {
      type: String,
      default: 'Next year'
    },
    labelToday: {
      type: String,
      default: 'Today'
    },
    labelSelected: {
      type: String,
      default: 'Selected date'
    },
    labelNoDateSelected: {
      type: String,
      default: 'No date selected'
    },
    labelCalendar: {
      type: String,
      default: 'Calendar'
    },
    labelHelp: {
      type: String,
      default: 'Use cursor keys to navigate calendar dates'
    }
  },
  data() {
    const selected = parseYMD(this.value) || null
    const active = selected || this.getToday()
    return {
      // Selected date as a date object
      // TODO: change to YYYY-MM-DD format
      selectedDate: selected,
      // Date in calendar grid that has tabindex of 0
      // TODO: change to YYYY-MM-DD format
      activeDate: active,
      // Will be true if the calendar grid has/contains focus
      gridHasFocus: false,
      // Flag to enable the aria-live region(s) after mount
      // to prevent screen reader "outbursts" when mounting
      isLive: false
    }
  },
  computed: {
    selectedYMD() {
      return formatYMD(this.selectedDate)
    },
    activeYMD() {
      return formatYMD(this.activeDate)
    },
    // selectedDate() {
    //   return parseYMD(this.selectedYMD)
    // },
    // activeDate() {
    //   return parseYMD(this.activeYMD)
    // },
    computedMin() {
      return parseYMD(this.min)
    },
    computedMax() {
      return parseYMD(this.max)
    },
    computedWeekStarts() {
      // startWeekday is a prop (constrained to 0 through 6)
      return Math.max(toInteger(this.startWeekday) || 0, 0) % 7
    },
    computedLocale() {
      // Returns the resovled locale used by the calendar
      return resolveLocale(this.locale, 'gregory')
    },
    calendarLocale() {
      // This locale enforces the gregorian calendar (for use in formatter functions)
      // Needed because IE11 resolves ar-IR as islamic-civil calendar
      // and IE11 (and some other browsers) do not support the `calendar` option
      const fmt = new Intl.DateTimeFormat(this.computedLocale, { calendar: 'gregory' })
      const calendar = fmt.resolvedOptions().calendar
      let locale = fmt.resolvedOptions().locale.toLowerCase()
      /* istanbul ignore if: mainly for IE11, hard to test in JSDOM */
      if (calendar !== 'gregory') {
        // Ensure the locale requests the gregorian calendar
        // Mainly for IE 11, and currently we can't handle non-gregorian calendars
        locale = locale.replace(/-u-.+$/, '').concat('-u-ca-gregory')
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
      return `btn-${this.variant || 'primary'}`
    },
    computedTodayVariant() {
      return `btn-outline-${this.todayVariant || this.variant || 'primary'}`
    },
    isRTL() {
      // `true` if the language requested is RTL
      const dir = toString(this.direction).toLowerCase()
      const parts = this.computedLocale
        .toLowerCase()
        .replace(/-u-.+/, '')
        .split('-')
      const locale1 = parts.slice(0, 2).join('-')
      const locale2 = parts[0]
      return dir === 'rtl' || arrayIncludes(RTL_LANGS, locale1) || arrayIncludes(RTL_LANGS, locale2)
    },
    context() {
      return {
        activeYMD: this.activeYMD,
        activeFormatted: this.activeYMD ? this.formatDateString(parseYMD(this.activeYMD)) : null,
        selectedYMD: this.selectedYMD,
        selectedFormatted: this.selectedYMD
          ? this.formatDateString(parseYMD(this.selectedYMD))
          : null,
        locale: this.computedLocale,
        calendarLocale: this.calendarLocale,
        rtl: this.isRTL
      }
    },
    // Computed props that return a function reference
    dateOutOfRange() {
      // Check weather a date is within the min/max range
      // returns a new function ref if the pops change
      // We do this as we need to trigger the calendar computed prop
      // to update when these props update
      const min = this.computedMin
      const max = this.computedMax
      return date => {
        date = parseYMD(date)
        return (min && date < min) || (max && date > max)
      }
    },
    dateDisabled() {
      // Returns a function for validating if a date is within range
      // We grab thes variables first to ensure a new
      // function ref is gnerated when the props change
      // We do this as we need to trigger the calendar computed prop
      // to update when these props update
      const rangeFn = this.dateOutOfRange
      const userFn = isFunction(this.allowedDates) ? this.allowedDates : () => true
      // return the function ref
      return date => {
        date = parseYMD(date)
        const ymd = formatYMD(date)
        return rangeFn(date) || !userFn(ymd)
      }
    },
    // Computed props that return date formatter functions
    formatDateString() {
      // returns a date formatter function
      return createDateFormatter(this.calendarLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        calendar: 'gregory'
      })
    },
    formatYearMonth() {
      // returns a date formatter function
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
      // used as the header cells
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
      // We could/should check if today is out of range
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
      const calendarYear = this.calendarYear
      const calendarMonth = this.calendarMonth
      const firstDay = this.calendarFirstDay
      const daysInMonth = this.calendarDaysInMonth
      const startIndex = firstDay.getDay() // 0..6
      const weekOffset = (this.computedWeekStarts > startIndex ? 7 : 0) - this.computedWeekStarts
      // Build the clendar matrix
      let currentDay = 0 - weekOffset - startIndex
      for (let week = 0; week < 6 && currentDay < daysInMonth; week++) {
        // for each week
        matrix[week] = []
        // The following could be a map funtion
        for (let j = 0; j < 7; j++) {
          // for each day in week
          currentDay++
          const date = createDate(calendarYear, calendarMonth, currentDay)
          const month = date.getMonth()
          matrix[week].push({
            dateObj: date,
            // used by render function for quick equality comparisons
            ymd: formatYMD(date),
            // Cell content
            day: this.formatDay(date),
            label: this.formatDateString(date),
            // Flags for styling
            isThisMonth: month === calendarMonth,
            isDisabled: this.dateDisabled(date)
          })
        }
      }
      return matrix
    },
    calendarHeadings() {
      return this.calendar[0].map(d => {
        return {
          text: this.formatWeekdayNameShort(d.dateObj),
          label: this.formatWeekdayName(d.dateObj)
        }
      })
    }
  },
  watch: {
    value(newVal, oldVal) {
      const selected = parseYMD(newVal)
      const old = parseYMD(oldVal)
      if (!datesEqual(selected, old)) {
        this.selectedDate = selected
        this.activeDate = createDate(selected)
      }
    },
    selectedYMD(newYMD, oldYMD) {
      this.$emit('input', this.valueAsDate ? parseYMD(newYMD) : newYMD)
    },
    context(newVal) {
      this.$emit('context', newVal)
    },
    hidden(newVal, oldVal) /* istanbul ignore next: might remove this prop */ {
      if (!newVal) {
        this.isLive = false
      } else {
        this.$nextTick(() => {
          requestAF(() => {
            this.isLive = true
          })
        })
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.$emit('context', this.context)
    })
  },
  mounted() {
    this.$nextTick(() => {
      requestAF(() => {
        this.isLive = true
      })
    })
  },
  beforeDestroy() {
    this.isLive = false
  },
  methods: {
    // Public method(s)
    focus() /* istanbul ignore next: until tests are ready */ {
      this.focusGrid()
    },
    // Private methods
    getToday() {
      return parseYMD(createDate())
    },
    focusGrid() {
      if (!this.disabled) {
        try {
          this.$refs.grid.focus()
        } catch {}
      }
    },
    constrainDate(date) /* istanbul ignore next: until tests are ready */ {
      // Constrains a date between min and max
      // returns a new date instance
      date = parseYMD(date)
      const min = this.computedMin || date
      const max = this.computedMax || date
      return createDate(date < min ? min : date > max ? max : date)
    },
    // Event handlers
    setGridFocusFlag(evt) {
      // Sets the gridHasFocus flag to make date "button" look focused
      this.gridHasFocus = !this.disabled && evt.type === 'focus'
    },
    onKeydownWrapper(evt) /* istanbul ignore next: until tests are ready */ {
      // Calendar keyboard navigation
      // Handles PgUp/PgDown/Home/End/Up/Down/Left/Right
      // Focuses grid after updating
      const keyCode = evt.keyCode
      const altKey = evt.altKey
      if (!arrayIncludes([PAGEUP, PAGEDOWN, END, HOME, LEFT, UP, RIGHT, DOWN], keyCode)) {
        return
      }
      evt.preventDefault()
      evt.stopPropagation()
      let activeDate = createDate(this.activeDate)
      let checkDate = createDate(this.activeDate)
      const day = activeDate.getDate()
      const isRTL = this.isRTL
      if (keyCode === PAGEUP) {
        // page up (previous month/year)
        activeDate = (altKey ? oneYearAgo : oneMonthAgo)(activeDate)
        // We check the first day of month to be in rage
        checkDate = createDate(activeDate)
        checkDate.setDate(1)
      } else if (keyCode === PAGEDOWN) {
        // page down (next month/year)
        activeDate = (altKey ? oneYearAgo : oneMonthAhead)(activeDate)
        // We check the last day of month to be in rage
        checkDate = createDate(activeDate)
        checkDate.setMonth(checkDate.getMonth() + 1)
        checkDate.setDate(0)
      } else if (keyCode === LEFT) {
        // left (previous day - or next day for RTL)
        activeDate.setDate(day + (isRTL ? 1 : -1))
        checkDate = activeDate
      } else if (keyCode === RIGHT) {
        // right (next day - or previous day for RTL)
        activeDate.setDate(day + (isRTL ? -1 : 1))
        checkDate = activeDate
      } else if (keyCode === UP) {
        // Up (previous week)
        activeDate.setDate(day - 7)
        checkDate = activeDate
      } else if (keyCode === DOWN) {
        // Down (next week)
        activeDate.setDate(day + 7)
        checkDate = activeDate
      } else if (keyCode === HOME) {
        // Home (today)
        activeDate = this.getToday()
        checkDate = activeDate
      } else if (keyCode === END) {
        // End (selected date or today)
        activeDate = createDate(this.selectedDate || this.getToday())
        checkDate = activeDate
      }
      if (!this.dateOutOfRange(checkDate) && !datesEqual(activeDate, this.activeDate)) {
        // We only jump to date if within min/max
        // We don't check for individual disabled dates though (via user function)
        this.activeDate = activeDate
      }
      this.focusGrid()
    },
    onKeydownGrid(evt) /* istanbul ignore next: until tests are ready */ {
      // Pressing enter/space on date to select it
      const keyCode = evt.keyCode
      const activeDate = this.activeDate
      if ((keyCode === ENTER || keyCode === SPACE) && !this.dateDisabled(activeDate)) {
        evt.preventDefault()
        evt.stopPropagation()
        this.selectedDate = createDate(activeDate)
        this.focusGrid()
      }
    },
    onClickDay(day) {
      // Clicking on a date "button" to select it
      // TODO: change to lookup the `data-data` attribute
      const selectedDate = this.selectedDate
      const activeDate = this.activeDate
      const clickedDate = createDate(day.dateObj)
      if (!this.disabled && !day.isDisabled && !this.dateDisabled(clickedDate)) {
        this.selectedDate = datesEqual(clickedDate, selectedDate) ? selectedDate : clickedDate
        this.activeDate = datesEqual(clickedDate, activeDate) ? activeDate : createDate(clickedDate)
        this.focusGrid()
      }
    },
    gotoPrevYear(evt) /* istanbul ignore next: until tests are ready */ {
      this.activeDate = this.constrainDate(oneYearAgo(this.activeDate))
    },
    gotoPrevMonth(evt) /* istanbul ignore next: until tests are ready */ {
      this.activeDate = this.constrainDate(oneMonthAgo(this.activeDate))
    },
    gotoCurrentMonth(evt) /* istanbul ignore next: until tests are ready */ {
      this.activeDate = this.getToday()
    },
    gotoNextMonth(evt) /* istanbul ignore next: until tests are ready */ {
      this.activeDate = this.constrainDate(oneMonthAhead(this.activeDate))
    },
    gotoNextYear(evt) /* istanbul ignore next: until tests are ready */ {
      this.activeDate = this.constrainDate(oneYearAhead(this.activeDate))
    }
  },
  render(h) {
    /* istanbul ignore if */
    if (this.hidden) {
      return h()
    }

    const isRTL = this.isRTL
    const todayYMD = formatYMD(this.getToday())
    const selectedYMD = this.selectedYMD
    const activeYMD = this.activeYMD
    const highlightToday = !this.noHighlightToday
    const safeId = this.safeId
    // Flag for making hte aria-live reagions live
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
        attrs: {
          id: idValue,
          for: idGrid,
          role: 'status',
          // Mainly for testing purposes
          'dats-selected': toString(selectedYMD),
          // We wait until after mount to enable aria-live
          // to prevent initial announcement on page render
          'aria-live': isLive ? 'polite' : 'off',
          'aria-atomic': isLive ? 'true' : null
        }
      },
      this.selectedDate
        ? [
            // We use `bdi` elements here in case the label doesn't match the locale
            h('bdi', { staticClass: 'sr-only' }, `(${toString(this.labelSelected)}) `),
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

    // Content for the date navigaation  buttons
    // TODO: Future allow for custom icons/content?
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

    // Utiltiy to create the date navigation buttons
    const makeNavBtn = (content, label, handler, btnDisabled, shortcut) => {
      return h(
        'button',
        {
          staticClass: 'btn btn-sm btn-outline-secondary border-0 flex-fill p-1 mx-1',
          class: { disabled: btnDisabled },
          // Style to get around Bootstrap v4.4 bug with hand cursor on disabled buttons
          style: btnDisabled ? { pointerEvents: 'none' } : {},
          attrs: {
            title: label || null,
            'aria-label': label || null,
            'aria-disabled': btnDisabled ? 'true' : null,
            'aria-shortcutkeys': shortcut || null
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
        staticClass: 'd-flex mx-n1 mb-1',
        attrs: {
          id: idNav,
          role: 'group',
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
            attrs: { 'aria-label': d.label }
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
            staticClass: 'btn btn-sm border-0 rounded-circle text-nowrap px-0',
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
              'btn-outline-light': !isToday && !highlightToday && !isSelected && !isActive,
              'btn-light': !isToday && !highlightToday && !isSelected && isActive,
              // Text styling
              'text-muted': !day.isThisMonth && !isSelected,
              'text-dark':
                !isToday && !highlightToday && !isSelected && !isActive && day.isThisMonth,
              'font-weight-bold': (isSelected || day.isThisMonth) && !day.isDisabled
            },
            style: {
              // We hardcode values here to maintain correct sizing for mobile
              // This could be a custom class???
              width: '32px',
              height: '32px',
              fonstSize: '14px',
              lineHeight: 1,
              margin: '3px auto',
              padding: '9px 0'
            },
            on: { click: () => this.onClickDay(day) }
          },
          day.day
        )
        return h(
          'div', // cell with button
          {
            key: dIndex,
            staticClass: 'col p-0',
            // Need to compute if day is within range (min/max) or if day is not allowed
            // This is done in the calendar generator computed prop
            class: { 'bg-light': day.isDisabled },
            style: day.isDisabled ? { pointerEvents: 'none' } : {},
            attrs: {
              id: idCell,
              role: 'button',
              'data-date': day.ymd, // primarily for testing purposes
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
              // NVDA doesn't convey aria-selected, but does aria-current,
              // Chromevox doesn't convey aria-current, but does aria-selected,
              // so we set both attribues for robustness
              'aria-selected': isSelected ? 'true' : null,
              'aria-current': isActive ? 'date' : null
            }
          },
          [$btn]
        )
      })
      // Return the week "row"
      // We use the first day of hte weeks YMD value as a
      // key for efficienct DOM patching / element re-use
      return h('div', { key: week[0].ymd, staticClass: 'row no-gutters' }, $cells)
    })
    $gridBody = h('div', { style: this.disabled ? { pointerEvents: 'none' } : {} }, $gridBody)

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
        staticClass: 'form-control h-auto text-center p-0 mb-1',
        attrs: {
          id: idGrid,
          role: 'application',
          tabindex: '0',
          'data-month': activeYMD.slice(0, -3), // YYYY-MM, mainly for testing
          // tabindex: this.disabled ? null : '0',
          'aria-roledescription': this.labelCalendar || null,
          'aria-labelledby': idGridCaption,
          'aria-describedby': idGridHelp,
          'aria-readonly': this.readonly && !this.disabled ? 'true' : null,
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

    const $slot = h()

    return h(
      'div',
      {
        staticClass: 'b-calendar',
        class: this.block ? 'd-block' : 'd-inline-block',
        style: this.block ? {} : { width: this.width },
        attrs: {
          id: idWidget,
          dir: isRTL ? 'rtl' : 'ltr',
          lang: this.computedLocale || null,
          role: 'group',
          'aria-disabled': this.disabled ? 'true' : null,
          // If datepicker controls an input, this will
          // specify the ID of the input
          'aria-controls': this.ariaControls || null,
          // This should be a prop (so it can be changed to Date picker, etc, localized
          'aria-roledescription': this.roleDescription || null,
          'aria-describedby': [
            // Should the attr (if present) go last?
            // or should this attr be a prop?
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
  }
})
