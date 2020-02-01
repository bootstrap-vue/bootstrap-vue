import Vue from '../../utils/vue'
import { arrayIncludes } from '../../utils/array'
import { createDate, createDateFormatter, formatYMD, parseYMD, resolveLocale } from '../../utils/date'
import { requestAF } from '../../utils/dom'
import { toInteger } from '../../utils/number'
import { toString } from '../../utils/string'
import identity from '../../utils/identity'
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
      if (calendar !== 'gregory') {
        // Ensure the locale requests the gregorian calendar
        // Mainly for IE 11
        locale = locale.replace(/-u-.+$/, '').concat('-u-ca-gregory')
        fmt = new Intl.DateTimeFormat(this.computedLocale, { calendar: 'gregory' })
        locale = fmt.resolvedOptions().locale.toLowerCase()
      }
      return locale
    },
    isRTL() {
      // `true` if the language requested is RTL
      if (toString(this.direction).toLowerCase() === 'rtl') {
        return true
      }
      const parts = this.computedLocale.toLowerCase().replace(/-u-.+/, '').split('-')
      const locale_1 = parts.slice(0,2).join('-')
      const locale_2 = parts[0]
      return arrayIncludes(RTL_LANGS, locale_1) || arrayIncludes(RTL_LANGS, locale_2)
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
  },
  mounted() {
    this.$nextTick(() => {
      requestAF(() => {
        this.mounted = true
      })
    })
  },
  methods: {
    getToday() {
      return parseYMD(createDate())
    },
    // Event handlers
    setGridFocusFlag(evt) {
      // Sets the gridHasFocus flag to make date "button" look focused
      // this.gridHasFocus = !this.disabled && evt.type === 'focus'
    },
    onKeydownWrapper(evt) {
    },
    onKeydownGrid(evt) {
    },
    onClickDay(day) {
    }
  },
  render(h) {
    const isRTL = this.isRTL
    const calendar = this.calendar
    const today = this.getToday()
    const todayYMD = formatYMD(today)
    const selectedYMD = this.selectedYMD
    const activeYMD = this.activeYMD
    const disabled = this.disabled

    if (this.hidden) {
      return h()
    }

    // Header showing current selected date
    let $header = h(
      'div',
      {
        staticClass: 'd-block text-center rounded border p-1 mb-1',
        attrs: {
          id: this.safeId('current-value'),
          for: this.safeId('calendar-grid'),
          role: 'status',
          // We wait until after mount to enable aria-live
          // to prevent initial announcement on page render
          'aria-live': this.mounted ? 'polite' : null,
          'aria-atomic': this.mounted ? 'true' : null
        }
      },
      this.selectedDate ? this.formatDateString(this.selectedDate) : '\u00a0'
    )
    $header = h(
      'header',
      { staticClass: 'mb-1', class: this.hideHeader ? 'sr-only' : null },
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
    const $nextMonthIcon = h(BIconChevronLeft, { props: { shiftV: 0.5 flipH: !isRTL } })
    const $nextYearIcon = h(BIconstack, { props: { shiftV: 0.5, flipH: !isRTL } }, [
      h(BIconChevronLeft, { props: { shiftH: -2 } }),
      h(BIconChevronLeft, { props: { shiftH: 2 } })
    ])

    // Utiltiy to create the date navigation buttons
    const makeNavBtn = (content, label, handler, btnDisabled, shortcut) => {
      return h(
        'button',
        {
          staticClass: 'btn btn-sm btn-outline-secondary border-0 p-1 mx-1',
          class: { disabled: btnDisabled },
          attrs: {
            'aria-label': label || null,
            'aria-disabled': btnDisabled ? 'true' : null,
            'aria-shortcutkeys': shortcut || null
          },
          // Should the handler handle detecting if disabled or not
          // as we need to check disabled dates in keyboard handlers
          on: btnDisabled ? {} : { click: handler }
        },
        [h('div', { attrs: { 'aria-hidden': 'true' } }, content)]
      )
    }

    // Generate the date navigation buttons
    const $nav = h(
      'div',
      {
        staticClass: 'd-flex p-0 mx-n1 my-0',
        attrs: {
          role: 'group',
          'aria-label': this.labelNav || null, 
          'aria-controls': this.safeId('_calendar-grid_')
        },
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
          id: this.safeId('_calendar-grid-caption_'),
          'aria-live': this.mounted ? 'polite' : null,
          'aria-atomic': this.mounted ? 'true' : null
        }
      },
      this.formatYearMonth(this.calendarFirstDay)
    )

    const $gridWeekDays = h()
    const $gridBody = h()
    
    const $gridHelp = h(
      'footer',
      {
        staticClass: 'border-top small text-muted text-center bg-light',
        attrs: { id: this.safeId('_calendar-help_') }
      },
      [h('div', { staticClass: 'small' }, this.labelHelp)]
    )

    const $grid = h(
      'div',
      {
        staticClass: 'form-control text-center p-0 mb-1',
        attrs: {
          id: this.safeId('_calendar-grid_'),
          role: 'application',
          tabindex: this.disabled ? null : '0',
          // This should be a translatable prop
          'aria-roledescription': 'Calendar',
          'aria-labelledby': this.safeId('_calendar-grid-caption_'),
          'aria-describedby': this.safeId('_calendar-help_'),
          'aria-readonly': this.readonly && !this.disabled ? 'true' : null,
          'aria-disabled': this.disabled ? 'true' : null,
          'aria-activedescendant': this.safeId(`cell-${activeYMD}`)
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
          id: this.safeId(),
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
            this.safeId('_current-value_'),
            this.safeId('_calendar-help_')
          ]
            .filter(identity)
            .join(' ')
        },
        on: {}
      },
      [$header, $nav, $grid, $slot]
    )
  }
})
