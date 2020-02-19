import Vue from '../../utils/vue'
import identity from '../../utils/identity'
import { getComponentConfig } from '../../utils/config'
import { createDate, formatYMD, parseYMD } from '../../utils/date'
import dropdownMixin from '../../mixins/dropdown'
import idMixin from '../../mixins/id'
import { BButton } from '../button/button'
import { BCalendar } from '../calendar/calendar'
import { BIconCalendar, BIconCalendarFill } from '../../icons/icons'
import { VBHover } from '../../directives/hover/hover'

const NAME = 'BFormDatepicker'

// Fallback to BCalendar prop if no value found
const getConfigFallback = prop => {
  return getComponentConfig(NAME, prop) || getComponentConfig('BCalendar', prop)
}

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
      type: [String, Date],
      default: ''
    },
    placeholder: {
      type: String,
      // Defaults to `labelNoDateSelected` from calendar context
      default: null
    },
    size: {
      type: String,
      default: null
    },
    min: {
      type: [String, Date],
      default: null
    },
    max: {
      type: [String, Date],
      default: null
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
      type: String,
      default: null
    },
    form: {
      type: String,
      default: null
    },
    state: {
      // Tri-state prop: `true`, `false` or `null`
      type: Boolean,
      default: null
    },
    dateDisabledFn: {
      type: Function,
      default: null
    },
    noCloseOnSelect: {
      type: Boolean,
      default: false
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    locale: {
      type: [String, Array],
      default: null
    },
    startWeekday: {
      // `0` (Sunday), `1` (Monday), ... `6` (Saturday)
      // Day of week to start calendar on
      type: [Number, String],
      default: 0
    },
    direction: {
      type: String,
      default: null
    },
    selectedVariant: {
      // Variant color to use for the selected date
      type: String,
      default: 'primary'
    },
    todayVariant: {
      // Variant color to use for today's date (defaults to `variant`)
      type: String,
      default: null
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
      default: () => getComponentConfig(NAME, 'labelTodayButton')
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
      default: () => getComponentConfig(NAME, 'labelResetButton')
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
      default: () => getComponentConfig(NAME, 'labelCloseButton')
    },
    closeButtonVariant: {
      type: String,
      default: 'outline-secondary'
    },
    // Labels for buttons and keyboard shortcuts
    // These pick BCalendar global config if no BFormDate global config
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
    // Dark mode
    dark: {
      type: Boolean,
      default: false
    }
  }
}

// --- BFormDate component ---

// @vue/component
export const BFormDatepicker = /*#__PURE__*/ Vue.extend({
  name: NAME,
  directives: {
    BHover: VBHover
  },
  // The mixins order determines the order of appearance in the props reference section
  mixins: [idMixin, propsMixin, dropdownMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      // We always use `YYYY-MM-DD` value internally
      localYMD: formatYMD(this.value) || '',
      // Context data from BCalendar
      localLocale: null,
      isRTL: false,
      formatedValue: '',
      activeYMD: '',
      // Flag to add focus ring to outer wrapper
      hasFocus: false,
      // If the control is hovered
      isHovered: false
    }
  },
  computed: {
    calendarYM() {
      // Returns the calendar year/month
      // Returns the `YYYY-MM` portion of the active calendar date
      return this.activeYMD.slice(0, -3)
    },
    calendarProps() {
      // TODO: Make the ID's computed props
      const idLabel = this.safeId('_value_')
      const idWrapper = this.safeId('_b-form-date_')
      return {
        // id: this.safeId('_picker_'),
        ariaControls: [idLabel, idWrapper].filter(identity).join(' ') || null,
        value: this.localYMD,
        hidden: !this.visible,
        min: this.min,
        max: this.max,
        readonly: this.readonly,
        disabled: this.disabled,
        locale: this.locale,
        startWeekday: this.startWeekday,
        direction: this.direction,
        dateDisabledFn: this.dateDisabledFn,
        selectedVariant: this.selectedVariant,
        todayVariant: this.todayVariant,
        hideHeader: this.hideHeader,
        labelPrevYear: this.labelPrevYear,
        labelPrevMonth: this.labelPrevMonth,
        labelCurrentMonth: this.labelCurrentMonth,
        labelNextMonth: this.labelNextMonth,
        labelNextYear: this.labelNextYear,
        labelToday: this.labelToday,
        labelSelected: this.labelSelected,
        labelNoDateSelected: this.labelNoDateSelected,
        labelCalendar: this.labelCalendar,
        labelNav: this.labelNav,
        labelHelp: this.labelHelp
      }
    },
    computedResetValue() {
      return parseYMD(this.resetValue) || ''
    }
  },
  watch: {
    value(newVal) {
      this.localYMD = formatYMD(newVal) || ''
    },
    localYMD(newVal) {
      this.$emit('input', this.valueAsDate ? parseYMD(newVal) || null : newVal || '')
    },
    calendarYM(newVal, oldVal) /* istanbul ignore next */ {
      // Displayed calendar month has changed
      // So possibly the calendar height has changed...
      // We need to update popper computed position
      if (newVal !== oldVal && oldVal) {
        this.updatePopper()
      }
    }
  },
  mounted() {
    this.$on('shown', () => {
      // May want to make an option to focus
      // the entire calendar (dropdown-menu) or just the date
      try {
        this.$refs.calendar.focus()
      } catch {}
    })
  },
  methods: {
    // Public methods
    focus() {
      if (!this.disabled) {
        try {
          // This assumes the toggle is an element and not a component
          this.$refs.toggle.focus()
        } catch {}
      }
    },
    blur() {
      if (!this.disabled) {
        try {
          // This assumes the toggle is an element and not a component
          this.$refs.toggle.blur()
        } catch {}
      }
    },
    // Private methods
    setAndClose(ymd) {
      this.localYMD = ymd
      // Close calendar popup, unless `noCloseOnSelect`
      if (!this.noCloseOnSelect) {
        this.$nextTick(() => {
          this.hide(true)
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
      this.setAndClose(formatYMD(createDate()))
    },
    onResetButton() {
      this.setAndClose(this.computedResetValue)
    },
    onCloseButton() {
      this.hide(true)
    },
    setFocus(evt) {
      this.hasFocus = evt.type === 'focus'
    },
    handleHover(hovered) {
      this.isHovered = hovered
    }
  },
  render(h) {
    const size = this.size
    const state = this.state
    const localYMD = this.localYMD
    const disabled = this.disabled
    const readonly = this.readonly
    const idButton = this.safeId()
    const idLabel = this.safeId('_value_')
    const idMenu = this.safeId('_dialog_')
    const idWrapper = this.safeId('_b-form-date_')

    let $button = h('div', { attrs: { 'aria-hidden': 'true' } }, [
      this.isHovered || this.hasFocus
        ? h(BIconCalendarFill, { props: { scale: 1.25 } })
        : h(BIconCalendar, { props: { scale: 1.25 } })
    ])
    $button = h(
      'button',
      {
        ref: 'toggle',
        staticClass: 'btn border-0 h-auto py-0',
        class: { [`btn-${size}`]: !!size },
        attrs: {
          id: idButton,
          type: 'button',
          disabled: disabled,
          'aria-haspopup': 'dialog',
          'aria-expanded': this.visible ? 'true' : 'false',
          'aria-invalid': state === false ? 'true' : null,
          'aria-required': this.required ? 'true' : null
        },
        on: {
          mousedown: this.onMousedown,
          click: this.toggle,
          keydown: this.toggle, // Handle ENTER, SPACE and DOWN
          '!focus': this.setFocus,
          '!blur': this.setFocus
        }
      },
      [$button]
    )

    // Label as a "fake" input
    // This label will be read by screen readers when the button is focused
    const $input = h(
      'label',
      {
        staticClass: 'form-control text-break text-wrap border-0 bg-transparent h-auto pl-1 m-0',
        class: {
          // Mute the text if showing the placeholder
          'text-muted': !localYMD,
          [`form-control-${size}`]: !!size,
          'is-invalid': state === false,
          'is-valid': state === true
        },
        attrs: {
          id: idLabel,
          for: idButton,
          dir: this.isRTL ? 'rtl' : 'ltr',
          lang: this.localLocale || null,
          'aria-invalid': state === false ? 'true' : null,
          'aria-required': this.required ? 'true' : null
        },
        on: {
          // Disable bubbling of the click event to
          // prevent menu from closing and re-opening
          click: evt => /* istanbul ignore next */ {
            evt.stopPropagation()
          }
        }
      },
      [
        // Add the formatted value or placeholder
        localYMD ? this.formattedValue : this.placeholder || this.labelNoDateSelected,
        // Add an sr-only 'selected date' label if a date is selected
        localYMD ? h('span', { staticClass: 'sr-only' }, ` (${this.labelSelected}) `) : h()
      ]
    )

    // Optional footer buttons
    let $controls = []

    if (this.todayButton) {
      const label = this.labelTodayButton
      $controls.push(
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
      $controls.push(
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
      $controls.push(
        h(
          BButton,
          {
            props: { size: 'sm', disabled: this.disabled, variant: this.closeButtonVariant },
            attrs: { 'aria-label': label || null },
            on: { click: this.onCloseButton }
          },
          label
        )
      )
    }

    if ($controls.length > 0) {
      $controls = [
        h(
          'div',
          {
            staticClass: 'b-form-date-controls d-flex flex-wrap',
            class: {
              'justify-content-between': $controls.length > 1,
              'justify-content-end': $controls.length < 2
            }
          },
          $controls
        )
      ]
    }

    const $calendar = h(
      BCalendar,
      {
        key: 'calendar',
        ref: 'calendar',
        staticClass: 'b-form-date-calendar',
        props: this.calendarProps,
        on: {
          selected: this.onSelected,
          input: this.onInput,
          context: this.onContext
        }
      },
      $controls
    )

    const $menu = h(
      'div',
      {
        ref: 'menu',
        staticClass: 'dropdown-menu p-2',
        class: {
          show: this.visible,
          'dropdown-menu-right': this.right,
          'bg-dark': this.dark,
          'text-light': this.dark
        },
        attrs: {
          id: idMenu,
          role: 'dialog',
          'aria-modal': 'false',
          'aria-labelledby': idLabel
        },
        on: {
          keydown: this.onKeydown // Handle ESC
        }
      },
      [$calendar]
    )

    let $hidden = h()
    if (this.name && !disabled) {
      $hidden = h('input', {
        attrs: {
          type: 'hidden',
          name: this.name,
          form: this.form,
          value: localYMD || ''
        }
      })
    }

    return h(
      'div',
      {
        staticClass: 'b-form-datepicker form-control dropdown h-auto p-0 d-flex',
        class: [
          this.directionClass,
          {
            show: this.visible,
            focus: this.hasFocus,
            [`form-control-${size}`]: !!size,
            'is-invalid': state === false,
            'is-valid': state === true
          }
        ],
        attrs: {
          id: idWrapper,
          role: 'group',
          'aria-disabled': disabled,
          'aria-readonly': readonly && !disabled,
          'aria-labelledby': idLabel,
          'aria-invalid': state === false ? 'true' : null,
          'aria-required': this.required ? 'true' : null,
          // We don't want the flex order to change here
          // So we always use 'ltr'
          dir: 'ltr'
        },
        directives: [{ name: 'b-hover', value: this.handleHover }]
      },
      [$button, $hidden, $menu, $input]
    )
  }
})
