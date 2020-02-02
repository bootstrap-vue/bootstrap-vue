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
    width: {
      type: String,
      default: '266px'
    },
    block: {
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
    // noHighlightToday: {
    //   // Disable highlighting today's date
    //   type: Boolean,
    //   default: false
    // },
    // Labels for buttons and keybord shortcuts
    labelPrevYear: {
      type: String,
      default: 'Previous year'
    },
    labelPrevMonth: {
      type: String,
      default: 'Previous month'
    },
    labelThisMonth: {
      type: String,
      default: 'This month'
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
      selectedDate: selected,
      // Date in calendar grid that has tabindex of 0
      activeDate: active,
      // Will be true if the calendar grid has focus
      gridHasFocus: false,
      // Flag to enable the aria-live region(s) after mount
      // to prevent screen reader outbursts when mounting
      mounted: false
    }
  },
  computed: {
    selectedYMD() {
      return formatYMD(this.selectedDate)
    },
    activeYMD() {
      return formatYMD(this.activeDate)
    },
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
      let fmt = new Intl.DateTimeFormat(this.computedLocale, { calendar: 'gregory' })
      const calendar = fmt.resolvedOptions().calendar
      let locale = fmt.resolvedOptions().locale.toLowerCase()
      /* istanbul ignore if: mainly for IE11, hard to test in JSDOM */
      if (calendar !== 'gregory') {
        // Ensure the locale requests the gregorian calendar
        // Mainly for IE 11
        locale = locale.replace(/-u-.+$/, '').concat('-u-ca-gregory')
        fmt = new Intl.DateTimeFormat(this.computedLocale, { calendar: 'gregory' })
        locale = fmt.resolvedOptions().locale.toLowerCase()
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
      return createDateFormatter(this.computedLocale, { weekday: 'short', calendar: 'gregory' })
    },
    formatDay() {
      return createDateFormatter(this.computedLocale, { day: 'numeric', calendar: 'gregory' })
    },
    // Disabled states for the nav buttons
    prevYearDisabled() {
      const min = this.computedMin
      return this.disabled ? true : min && lastDateOfMonth(oneYearAgo(this.activeDate)) < min
    },
    prevMonthDisabled() {
      const min = this.computedMin
      return this.disabled ? true : min && lastDateOfMonth(oneMonthAgo(this.activeDate)) < min
    },
    nextMonthDisabled() {
      const max = this.computedMax
      return this.disabled ? true : max && firstDateOfMonth(oneMonthAhead(this.activeDate)) > max
    },
    nextYearDisabled() {
      const max = this.computedMax
      return this.disabled ? true : max && firstDateOfMonth(oneYearAhead(this.activeDate)) > max
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
      const old = parseYMD(newVal)
      if (!datesEqual(selected, old)) {
        this.selectedDate = selected
        // if (selected) {
        //   this.focusDate(selected)
        // }
      }
    },
    selectedYMD(newYMD, oldYMD) {
      this.$emit('input', this.valueAsDate ? parseYMD(newYMD) : newYMD)
    }
  },
  mounted() {
    this.$nextTick(() => {
      requestAF(() => {
        this.mounted = true
      })
    })
  },
  methods: {
    // Public method(s)
    focus() {
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
    // Event handlers
    setGridFocusFlag(evt) {
      // Sets the gridHasFocus flag to make date "button" look focused
      this.gridHasFocus = !this.disabled && evt.type === 'focus'
    },
    onKeydownWrapper(evt) {
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
      if (this.dateInRange(checkDate) && !datesEqual(activeDate, this.activeDate)) {
        // We only jump to date if within min/max
        // We don't check for individual disabled dates though (via user function)
        this.activeDate = activeDate
      }
      this.focusGrid()
    },
    onKeydownGrid(evt) {
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
      const date = createDate(day.dateObj)
      if (
        !this.disabled &&
        !day.isDisabled &&
        !this.dateDisabled(date) &&
        !datesEqual(date, this.selectedDate)
      ) {
        this.selectedDate = createDate(day.dateObj)
        this.focusGrid()
      }
    }
  },
  render(h) {
    const isRTL = this.isRTL
    const todayYMD = formatYMD(this.getToday())
    const selectedYMD = this.selectedYMD
    const activeYMD = this.activeYMD
    const safeId = this.safeId

    /* istanbul ignore if */
    if (this.hidden) {
      return h()
    }

    // Header showing current selected date
    let $header = h(
      'div',
      {
        staticClass: 'd-block text-center rounded border p-1 mb-1',
        attrs: {
          id: safeId('current-value'),
          for: safeId('calendar-grid'),
          role: 'status',
          // We wait until after mount to enable aria-live
          // to prevent initial announcement on page render
          'aria-live': this.mounted ? 'polite' : null,
          'aria-atomic': this.mounted ? 'true' : null
        }
      },
      this.selectedDate
        ? this.formatDateString(this.selectedDate)
        : this.labelNoDateSelected || '\u00a0' // '&nbsp;'
    )
    $header = h('header', { staticClass: 'mb-1', class: this.hideHeader ? 'sr-only' : null }, [
      $header
    ])

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
          attrs: {
            'aria-label': label || null,
            'aria-disabled': btnDisabled ? 'true' : null,
            'aria-shortcutkeys': shortcut || null
          },
          on: { click: handler }
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
          id: safeId('_calendar-nav_'),
          role: 'group',
          'aria-label': this.labelNav || null,
          'aria-controls': safeId('_calendar-grid_')
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
          this.labelThisMonth,
          this.gotoThisMonth,
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
        staticClass: 'text-center font-weight-bold p-0 m-0',
        attrs: {
          id: safeId('_calendar-grid-caption_'),
          'aria-live': this.mounted ? 'polite' : null,
          'aria-atomic': this.mounted ? 'true' : null
        }
      },
      this.formatYearMonth(this.calendarFirstDay)
    )

    // Calendar weekday headings
    const $gridWeekDays = h(
      'div',
      { staticClass: 'row no-gutters border-bottom', attrs: { 'aria-hidden': 'true' } },
      this.calendarHeadings.map((d, idx) => {
        return h('small', { key: idx, staticClass: 'col', attrs: { title: d.label } }, d.text)
      })
    )

    // Calendar day grid
    let $gridBody = this.calendar.map((week, wIndex) => {
      const $cells = week.map((day, dIndex) => {
        const isSelected = day.ymd === selectedYMD
        const isActive = day.ymd === activeYMD
        const isToday = day.ymd === todayYMD
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
              disabled: day.isDisabled,
              active: isSelected, // makes the button look "pressed"
              // Selected date style (need to computed from variant)
              'btn-primary': isSelected,
              // Today day style (if not selected), same variant color as selected date
              'btn-outline-primary': isToday && !isSelected && !isActive,
              // Non selected/today styling
              'btn-outline-light': !isToday && !isSelected && !isActive,
              // Text styling
              'text-muted': !day.isThisMonth && !isSelected,
              'text-dark': !isToday && !isActive && day.isThisMonth && !day.isDisabled,
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
            attrs: { tabindex: '-1' },
            on: {
              click: () => {
                this.onClickDay(day)
              }
            }
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
            attrs: {
              id: safeId(`_cell-${day.ymd}_`),
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
      // Return the week row
      return h('div', { key: wIndex, staticClass: 'row no-gutters' }, $cells)
    })
    $gridBody = h('div', {}, $gridBody)

    const $gridHelp = h(
      'footer',
      {
        staticClass: 'border-top small text-muted text-center bg-light',
        attrs: { id: safeId('_calendar-help_') }
      },
      [h('div', { staticClass: 'small' }, this.labelHelp)]
    )

    const $grid = h(
      'div',
      {
        staticClass: 'form-control h-auto text-center p-0 mb-1',
        attrs: {
          id: safeId('_calendar-grid_'),
          role: 'application',
          tabindex: this.disabled ? null : '0',
          'aria-roledescription': this.labelCalendar || null,
          'aria-labelledby': safeId('_calendar-grid-caption_'),
          'aria-describedby': safeId('_calendar-help_'),
          'aria-readonly': this.readonly && !this.disabled ? 'true' : null,
          'aria-disabled': this.disabled ? 'true' : null,
          'aria-activedescendant': safeId(`_cell-${activeYMD}_`)
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
          id: safeId(),
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
            safeId('_current-value_'),
            safeId('_calendar-help_')
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
