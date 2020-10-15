import Vue from '../../vue'
import { NAME_CALENDAR, NAME_FORM_DATEPICKER } from '../../constants/components'
import {
  CALENDAR_LONG,
  CALENDAR_NARROW,
  CALENDAR_SHORT,
  DATE_FORMAT_NUMERIC
} from '../../constants/date'
import { arrayIncludes } from '../../utils/array'
import { BVFormBtnLabelControl, dropdownProps } from '../../utils/bv-form-btn-label-control'
import { getComponentConfig } from '../../utils/config'
import { createDate, constrainDate, formatYMD, parseYMD } from '../../utils/date'
import { attemptBlur, attemptFocus } from '../../utils/dom'
import { isUndefinedOrNull } from '../../utils/inspect'
import { pick } from '../../utils/object'
import idMixin from '../../mixins/id'
import { BButton } from '../button/button'
import { BCalendar } from '../calendar/calendar'
import { BIconCalendar, BIconCalendarFill } from '../../icons/icons'

// Fallback to BCalendar prop if no value found
const getConfigFallback = prop =>
  getComponentConfig(NAME_FORM_DATEPICKER, prop) || getComponentConfig(NAME_CALENDAR, prop)

// We create our props as a mixin so that we can control
// where they appear in the props listing reference section
const propsMixin = {
  props: {
    value: {
      type: [String, Date],
      default: null
    },
    valueAsDate: {
      type: Boolean,
      default: false
    },
    resetValue: {
      type: [String, Date]
      // default: null
    },
    initialDate: {
      // This specifies the calendar year/month/day that will be shown when
      // first opening the datepicker if no v-model value is provided
      // Default is the current date (or `min`/`max`)
      // Passed directly to <b-calendar>
      type: [String, Date]
      // default: null
    },
    placeholder: {
      type: String
      // Defaults to `labelNoDateSelected` from calendar context
      // default: null
    },
    size: {
      type: String
      // default: null
    },
    min: {
      type: [String, Date]
      // default: null
    },
    max: {
      type: [String, Date]
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
      // If true adds the `aria-required` attribute
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
      // Tri-state prop: `true`, `false` or `null`
      type: Boolean,
      default: null
    },
    dateDisabledFn: {
      type: Function
      // default: null
    },
    noCloseOnSelect: {
      type: Boolean,
      default: false
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    showDecadeNav: {
      // When `true` enables the decade navigation buttons
      type: Boolean,
      default: false
    },
    locale: {
      type: [String, Array]
      // default: null
    },
    startWeekday: {
      // `0` (Sunday), `1` (Monday), ... `6` (Saturday)
      // Day of week to start calendar on
      type: [Number, String],
      default: 0
    },
    direction: {
      type: String
      // default: null
    },
    buttonOnly: {
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Applicable in button only mode
      type: String,
      default: 'secondary'
    },
    calendarWidth: {
      // Width of the calendar dropdown
      type: String,
      default: '270px'
    },
    selectedVariant: {
      // Variant color to use for the selected date
      type: String,
      default: () => getConfigFallback('selectedVariant')
    },
    todayVariant: {
      // Variant color to use for today's date (defaults to `selectedVariant`)
      type: String,
      default: () => getConfigFallback('todayVariant')
    },
    navButtonVariant: {
      // Variant color to use for the navigation buttons
      type: String,
      default: () => getConfigFallback('navButtonVariant')
    },
    noHighlightToday: {
      // Disable highlighting today's date
      type: Boolean,
      default: false
    },
    todayButton: {
      type: Boolean,
      default: false
    },
    labelTodayButton: {
      type: String,
      default: () => getComponentConfig(NAME_FORM_DATEPICKER, 'labelTodayButton')
    },
    todayButtonVariant: {
      type: String,
      default: 'outline-primary'
    },
    resetButton: {
      type: Boolean,
      default: false
    },
    labelResetButton: {
      type: String,
      default: () => getComponentConfig(NAME_FORM_DATEPICKER, 'labelResetButton')
    },
    resetButtonVariant: {
      type: String,
      default: 'outline-danger'
    },
    closeButton: {
      type: Boolean,
      default: false
    },
    labelCloseButton: {
      type: String,
      default: () => getComponentConfig(NAME_FORM_DATEPICKER, 'labelCloseButton')
    },
    closeButtonVariant: {
      type: String,
      default: 'outline-secondary'
    },
    dateInfoFn: {
      // Passed through to b-calendar
      type: Function
      // default: undefined
    },
    // Labels for buttons and keyboard shortcuts
    // These pick BCalendar global config if no BFormDate global config
    labelPrevDecade: {
      type: String,
      default: () => getConfigFallback('labelPrevDecade')
    },
    labelPrevYear: {
      type: String,
      default: () => getConfigFallback('labelPrevYear')
    },
    labelPrevMonth: {
      type: String,
      default: () => getConfigFallback('labelPrevMonth')
    },
    labelCurrentMonth: {
      type: String,
      default: () => getConfigFallback('labelCurrentMonth')
    },
    labelNextMonth: {
      type: String,
      default: () => getConfigFallback('labelNextMonth')
    },
    labelNextYear: {
      type: String,
      default: () => getConfigFallback('labelNextYear')
    },
    labelNextDecade: {
      type: String,
      default: () => getConfigFallback('labelNextDecade')
    },
    labelToday: {
      type: String,
      default: () => getConfigFallback('labelToday')
    },
    labelSelected: {
      type: String,
      default: () => getConfigFallback('labelSelected')
    },
    labelNoDateSelected: {
      type: String,
      default: () => getConfigFallback('labelNoDateSelected')
    },
    labelCalendar: {
      type: String,
      default: () => getConfigFallback('labelCalendar')
    },
    labelNav: {
      type: String,
      default: () => getConfigFallback('labelNav')
    },
    labelHelp: {
      type: String,
      default: () => getConfigFallback('labelHelp')
    },
    dateFormatOptions: {
      // `Intl.DateTimeFormat` object
      // Note: This value is *not* to be placed in the global config
      type: Object,
      default: () => ({
        year: DATE_FORMAT_NUMERIC,
        month: CALENDAR_LONG,
        day: DATE_FORMAT_NUMERIC,
        weekday: CALENDAR_LONG
      })
    },
    weekdayHeaderFormat: {
      // Format of the weekday names at the top of the calendar
      // Note: This value is *not* to be placed in the global config
      type: String,
      // `short` is typically a 3 letter abbreviation,
      // `narrow` is typically a single letter
      // `long` is the full week day name
      // Although some locales may override this (i.e `ar`, etc.)
      default: CALENDAR_SHORT,
      validator: value => arrayIncludes([CALENDAR_LONG, CALENDAR_SHORT, CALENDAR_NARROW], value)
    },
    // Dark mode
    dark: {
      type: Boolean,
      default: false
    },
    // extra dropdown stuff
    menuClass: {
      type: [String, Array, Object]
      // default: null
    },
    ...dropdownProps
  }
}

// --- BFormDate component ---

// @vue/component
export const BFormDatepicker = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_DATEPICKER,
  // The mixins order determines the order of appearance in the props reference section
  mixins: [idMixin, propsMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      // We always use `YYYY-MM-DD` value internally
      localYMD: formatYMD(this.value) || '',
      // If the popup is open
      isVisible: false,
      // Context data from BCalendar
      localLocale: null,
      isRTL: false,
      formattedValue: '',
      activeYMD: ''
    }
  },
  computed: {
    calendarYM() {
      // Returns the calendar year/month
      // Returns the `YYYY-MM` portion of the active calendar date
      return this.activeYMD.slice(0, -3)
    },
    calendarProps() {
      // Use self for better minification, as `this` won't
      // minimize and we reference it many times below
      const self = this
      return {
        hidden: !self.isVisible,
        value: self.localYMD,
        min: self.min,
        max: self.max,
        initialDate: self.initialDate,
        readonly: self.readonly,
        disabled: self.disabled,
        locale: self.locale,
        startWeekday: self.startWeekday,
        direction: self.direction,
        width: self.calendarWidth,
        dateDisabledFn: self.dateDisabledFn,
        selectedVariant: self.selectedVariant,
        todayVariant: self.todayVariant,
        navButtonVariant: self.navButtonVariant,
        dateInfoFn: self.dateInfoFn,
        hideHeader: self.hideHeader,
        showDecadeNav: self.showDecadeNav,
        noHighlightToday: self.noHighlightToday,
        labelPrevDecade: self.labelPrevDecade,
        labelPrevYear: self.labelPrevYear,
        labelPrevMonth: self.labelPrevMonth,
        labelCurrentMonth: self.labelCurrentMonth,
        labelNextMonth: self.labelNextMonth,
        labelNextYear: self.labelNextYear,
        labelNextDecade: self.labelNextDecade,
        labelToday: self.labelToday,
        labelSelected: self.labelSelected,
        labelNoDateSelected: self.labelNoDateSelected,
        labelCalendar: self.labelCalendar,
        labelNav: self.labelNav,
        labelHelp: self.labelHelp,
        dateFormatOptions: self.dateFormatOptions,
        weekdayHeaderFormat: self.weekdayHeaderFormat
      }
    },
    computedLang() {
      return (this.localLocale || '').replace(/-u-.*$/i, '') || null
    },
    computedResetValue() {
      return formatYMD(constrainDate(this.resetValue)) || ''
    }
  },
  watch: {
    value(newVal) {
      this.localYMD = formatYMD(newVal) || ''
    },
    localYMD(newVal) {
      // We only update the v-model when the datepicker is open
      if (this.isVisible) {
        this.$emit('input', this.valueAsDate ? parseYMD(newVal) || null : newVal || '')
      }
    },
    calendarYM(newVal, oldVal) /* istanbul ignore next */ {
      // Displayed calendar month has changed
      // So possibly the calendar height has changed...
      // We need to update popper computed position
      if (newVal !== oldVal && oldVal) {
        try {
          this.$refs.control.updatePopper()
        } catch {}
      }
    }
  },
  methods: {
    // Public methods
    focus() {
      if (!this.disabled) {
        attemptFocus(this.$refs.control)
      }
    },
    blur() {
      if (!this.disabled) {
        attemptBlur(this.$refs.control)
      }
    },
    // Private methods
    setAndClose(ymd) {
      this.localYMD = ymd
      // Close calendar popup, unless `noCloseOnSelect`
      if (!this.noCloseOnSelect) {
        this.$nextTick(() => {
          this.$refs.control.hide(true)
        })
      }
    },
    onSelected(ymd) {
      this.$nextTick(() => {
        this.setAndClose(ymd)
      })
    },
    onInput(ymd) {
      if (this.localYMD !== ymd) {
        this.localYMD = ymd
      }
    },
    onContext(ctx) {
      const { activeYMD, isRTL, locale, selectedYMD, selectedFormatted } = ctx
      this.isRTL = isRTL
      this.localLocale = locale
      this.formattedValue = selectedFormatted
      this.localYMD = selectedYMD
      this.activeYMD = activeYMD
      // Re-emit the context event
      this.$emit('context', ctx)
    },
    onTodayButton() {
      // Set to today (or min/max if today is out of range)
      this.setAndClose(formatYMD(constrainDate(createDate(), this.min, this.max)))
    },
    onResetButton() {
      this.setAndClose(this.computedResetValue)
    },
    onCloseButton() {
      this.$refs.control.hide(true)
    },
    // Menu handlers
    onShow() {
      this.isVisible = true
    },
    onShown() {
      this.$nextTick(() => {
        attemptFocus(this.$refs.calendar)
        this.$emit('shown')
      })
    },
    onHidden() {
      this.isVisible = false
      this.$emit('hidden')
    },
    // Render helpers
    defaultButtonFn({ isHovered, hasFocus }) {
      return this.$createElement(isHovered || hasFocus ? BIconCalendarFill : BIconCalendar, {
        attrs: { 'aria-hidden': 'true' }
      })
    }
  },
  render(h) {
    const $scopedSlots = this.$scopedSlots
    const localYMD = this.localYMD
    const disabled = this.disabled
    const readonly = this.readonly
    const placeholder = isUndefinedOrNull(this.placeholder)
      ? this.labelNoDateSelected
      : this.placeholder

    // Optional footer buttons
    let $footer = []

    if (this.todayButton) {
      const label = this.labelTodayButton
      $footer.push(
        h(
          BButton,
          {
            props: { size: 'sm', disabled: disabled || readonly, variant: this.todayButtonVariant },
            attrs: { 'aria-label': label || null },
            on: { click: this.onTodayButton }
          },
          label
        )
      )
    }

    if (this.resetButton) {
      const label = this.labelResetButton
      $footer.push(
        h(
          BButton,
          {
            props: { size: 'sm', disabled: disabled || readonly, variant: this.resetButtonVariant },
            attrs: { 'aria-label': label || null },
            on: { click: this.onResetButton }
          },
          label
        )
      )
    }

    if (this.closeButton) {
      const label = this.labelCloseButton
      $footer.push(
        h(
          BButton,
          {
            props: { size: 'sm', disabled, variant: this.closeButtonVariant },
            attrs: { 'aria-label': label || null },
            on: { click: this.onCloseButton }
          },
          label
        )
      )
    }

    if ($footer.length > 0) {
      $footer = [
        h(
          'div',
          {
            staticClass: 'b-form-date-controls d-flex flex-wrap',
            class: {
              'justify-content-between': $footer.length > 1,
              'justify-content-end': $footer.length < 2
            }
          },
          $footer
        )
      ]
    }

    const $calendar = h(
      BCalendar,
      {
        key: 'calendar',
        ref: 'calendar',
        staticClass: 'b-form-date-calendar w-100',
        props: this.calendarProps,
        on: {
          selected: this.onSelected,
          input: this.onInput,
          context: this.onContext
        },
        scopedSlots: pick($scopedSlots, [
          'nav-prev-decade',
          'nav-prev-year',
          'nav-prev-month',
          'nav-this-month',
          'nav-next-month',
          'nav-next-year',
          'nav-next-decade'
        ])
      },
      $footer
    )

    return h(
      BVFormBtnLabelControl,
      {
        ref: 'control',
        staticClass: 'b-form-datepicker',
        props: {
          // This adds unneeded props, but reduces code size:
          ...this.$props,
          // Overridden / computed props
          id: this.safeId(),
          rtl: this.isRTL,
          lang: this.computedLang,
          value: localYMD || '',
          formattedValue: localYMD ? this.formattedValue : '',
          placeholder: placeholder || '',
          menuClass: [{ 'bg-dark': !!this.dark, 'text-light': !!this.dark }, this.menuClass]
        },
        on: {
          show: this.onShow,
          shown: this.onShown,
          hidden: this.onHidden
        },
        scopedSlots: {
          'button-content': $scopedSlots['button-content'] || this.defaultButtonFn
        }
      },
      [$calendar]
    )
  }
})
