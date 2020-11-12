import Vue from '../../vue'
import { NAME_FORM_DATEPICKER } from '../../constants/components'
import {
  BVFormBtnLabelControl,
  props as BVFormBtnLabelControlProps
} from '../../utils/bv-form-btn-label-control'
import { makePropsConfigurable } from '../../utils/config'
import { createDate, constrainDate, formatYMD, parseYMD } from '../../utils/date'
import { attemptBlur, attemptFocus } from '../../utils/dom'
import { isUndefinedOrNull } from '../../utils/inspect'
import { pick, omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import idMixin from '../../mixins/id'
import { BButton } from '../button/button'
import { BCalendar, props as BCalendarProps } from '../calendar/calendar'
import { BIconCalendar, BIconCalendarFill } from '../../icons/icons'

// --- Main component ---
// @vue/component
export const BFormDatepicker = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_DATEPICKER,
  // The mixins order determines the order of appearance in the props reference section
  mixins: [idMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: makePropsConfigurable(
    {
      ...BCalendarProps,
      ...omit(BVFormBtnLabelControlProps, ['id', 'value', 'formattedValue', 'rtl', 'lang']),
      resetValue: {
        type: [String, Date]
        // default: null
      },
      noCloseOnSelect: {
        type: Boolean,
        default: false
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
      todayButton: {
        type: Boolean,
        default: false
      },
      labelTodayButton: {
        type: String,
        default: 'Select today'
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
        default: 'Reset'
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
        default: 'Close'
      },
      closeButtonVariant: {
        type: String,
        default: 'outline-secondary'
      },
      // Dark mode
      dark: {
        type: Boolean,
        default: false
      }
    },
    NAME_FORM_DATEPICKER
  ),
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
    calendarYM(newVal, oldVal) {
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
        props: {
          ...pluckProps(BCalendarProps, $props),
          value: localYMD,
          hidden: !this.isVisible
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
          ...pluckProps(BVFormBtnLabelControlProps, $props),
          id: this.safeId(),
          value: localYMD,
          formattedValue: localYMD ? this.formattedValue : '',
          placeholder,
          rtl: this.isRTL,
          lang: this.computedLang,
          menuClass: [{ 'bg-dark': !!dark, 'text-light': !!dark }, this.menuClass]
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
