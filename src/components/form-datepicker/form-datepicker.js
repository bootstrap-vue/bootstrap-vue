import { extend } from '../../vue'
import { NAME_FORM_DATEPICKER } from '../../constants/components'
import { EVENT_NAME_CONTEXT, EVENT_NAME_HIDDEN, EVENT_NAME_SHOWN } from '../../constants/events'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_DATE_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { SLOT_NAME_BUTTON_CONTENT } from '../../constants/slots'
import { createDate, constrainDate, formatYMD, parseYMD } from '../../utils/date'
import { attemptBlur, attemptFocus } from '../../utils/dom'
import { isUndefinedOrNull } from '../../utils/inspect'
import { makeModelMixin } from '../../utils/model'
import { omit, pick, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, pluckProps } from '../../utils/props'
import { idMixin, props as idProps } from '../../mixins/id'
import { BIconCalendar, BIconCalendarFill } from '../../icons/icons'
import { BButton } from '../button/button'
import { BCalendar, props as BCalendarProps } from '../calendar/calendar'
import {
  BVFormBtnLabelControl,
  props as BVFormBtnLabelControlProps
} from '../form-btn-label-control/bv-form-btn-label-control'

// --- Constants ---

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('value', { type: PROP_TYPE_DATE_STRING })

// --- Props ---

const calendarProps = omit(BCalendarProps, [
  'block',
  'hidden',
  'id',
  'noKeyNav',
  'roleDescription',
  'value',
  'width'
])

const formBtnLabelControlProps = omit(BVFormBtnLabelControlProps, [
  'formattedValue',
  'id',
  'lang',
  'rtl',
  'value'
])

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...modelProps,
    ...calendarProps,
    ...formBtnLabelControlProps,
    // Width of the calendar dropdown
    calendarWidth: makeProp(PROP_TYPE_STRING, '270px'),
    closeButton: makeProp(PROP_TYPE_BOOLEAN, false),
    closeButtonVariant: makeProp(PROP_TYPE_STRING, 'outline-secondary'),
    // Dark mode
    dark: makeProp(PROP_TYPE_BOOLEAN, false),
    labelCloseButton: makeProp(PROP_TYPE_STRING, 'Close'),
    labelResetButton: makeProp(PROP_TYPE_STRING, 'Reset'),
    labelTodayButton: makeProp(PROP_TYPE_STRING, 'Select today'),
    noCloseOnSelect: makeProp(PROP_TYPE_BOOLEAN, false),
    resetButton: makeProp(PROP_TYPE_BOOLEAN, false),
    resetButtonVariant: makeProp(PROP_TYPE_STRING, 'outline-danger'),
    resetValue: makeProp(PROP_TYPE_DATE_STRING),
    todayButton: makeProp(PROP_TYPE_BOOLEAN, false),
    todayButtonVariant: makeProp(PROP_TYPE_STRING, 'outline-primary')
  }),
  NAME_FORM_DATEPICKER
)

// --- Main component ---

// @vue/component
export const BFormDatepicker = /*#__PURE__*/ extend({
  name: NAME_FORM_DATEPICKER,
  mixins: [idMixin, modelMixin],
  props,
  data() {
    return {
      // We always use `YYYY-MM-DD` value internally
      localYMD: formatYMD(this[MODEL_PROP_NAME]) || '',
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
    computedLang() {
      return (this.localLocale || '').replace(/-u-.*$/i, '') || null
    },
    computedResetValue() {
      return formatYMD(constrainDate(this.resetValue)) || ''
    }
  },
  watch: {
    [MODEL_PROP_NAME](newValue) {
      this.localYMD = formatYMD(newValue) || ''
    },
    localYMD(newValue) {
      // We only update the v-model when the datepicker is open
      if (this.isVisible) {
        this.$emit(MODEL_EVENT_NAME, this.valueAsDate ? parseYMD(newValue) || null : newValue || '')
      }
    },
    calendarYM(newValue, oldValue) {
      // Displayed calendar month has changed
      // So possibly the calendar height has changed...
      // We need to update popper computed position
      if (newValue !== oldValue && oldValue) {
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
      this.$emit(EVENT_NAME_CONTEXT, ctx)
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
        this.$emit(EVENT_NAME_SHOWN)
      })
    },
    onHidden() {
      this.isVisible = false
      this.$emit(EVENT_NAME_HIDDEN)
    },
    // Render helpers
    defaultButtonFn({ isHovered, hasFocus }) {
      return this.$createElement(isHovered || hasFocus ? BIconCalendarFill : BIconCalendar, {
        attrs: { 'aria-hidden': 'true' }
      })
    }
  },
  render(h) {
    const { localYMD, disabled, readonly, dark, $props, $scopedSlots } = this
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
            props: {
              disabled: disabled || readonly,
              size: 'sm',
              variant: this.todayButtonVariant
            },
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
            props: {
              disabled: disabled || readonly,
              size: 'sm',
              variant: this.resetButtonVariant
            },
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
            props: {
              disabled,
              size: 'sm',
              variant: this.closeButtonVariant
            },
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
        staticClass: 'b-form-date-calendar w-100',
        props: {
          ...pluckProps(calendarProps, $props),
          hidden: !this.isVisible,
          value: localYMD,
          valueAsDate: false,
          width: this.calendarWidth
        },
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
        ]),
        key: 'calendar',
        ref: 'calendar'
      },
      $footer
    )

    return h(
      BVFormBtnLabelControl,
      {
        staticClass: 'b-form-datepicker',
        props: {
          ...pluckProps(formBtnLabelControlProps, $props),
          formattedValue: localYMD ? this.formattedValue : '',
          id: this.safeId(),
          lang: this.computedLang,
          menuClass: [{ 'bg-dark': dark, 'text-light': dark }, this.menuClass],
          placeholder,
          rtl: this.isRTL,
          value: localYMD
        },
        on: {
          show: this.onShow,
          shown: this.onShown,
          hidden: this.onHidden
        },
        scopedSlots: {
          [SLOT_NAME_BUTTON_CONTENT]: $scopedSlots[SLOT_NAME_BUTTON_CONTENT] || this.defaultButtonFn
        },
        ref: 'control'
      },
      [$calendar]
    )
  }
})
