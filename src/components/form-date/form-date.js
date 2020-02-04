import Vue from '../../utils/vue'
import { formatYMD, parseYMD } from '../../utils/date'
import { isBoolean } from '../../utils/inspect'
import identity from '../../utils/identity'
import idMixin from '../../mixins/id'
import dropdownMixin from '../../mixins/dropdown'
import { BCalendar } from '../calendar/calendar'
import { BIconCalendar } from '../../icons/icons'

// we create our props as a mixin so that we can control
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
      default: null
    },
    placeholder: {
      type: String,
      // Defaults to `labelNoDateSelected`
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
    todayButton: {
      type: Boolean,
      default: false
    },
    resetButton: {
      type: Boolean,
      default: false
    },
    closeButton: {
      type: Boolean,
      default: false
    },
    noCloseOnSelect: {
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
    // Labels for buttons and keyboard shortcuts
    labelPrevYear: {
      type: String
      // Default: BCalendar value
    },
    labelPrevMonth: {
      type: String
      // Default: BCalendar value
    },
    labelCurrentMonth: {
      type: String
      // Default: BCalendar value
    },
    labelNextMonth: {
      type: String
      // Default: BCalendar value
    },
    labelNextYear: {
      type: String
      // Default: BCalendar value
    },
    labelToday: {
      type: String
      // Default: BCalendar value
    },
    labelSelected: {
      type: String
      // Default: BCalendar value
    },
    labelNoDateSelected: {
      type: String
      // Default: BCalendar value
    },
    labelCalendar: {
      type: String
      // Default: BCalendar value
    },
    labelNav: {
      type: String
      // Default: BCalendar value
    },
    labelHelp: {
      type: String
      // Default: BCalendar value
    }
  }
}

// --- BFormDate component ---

// @vue/component
export const BFormDate = /*#__PURE__*/ Vue.extend({
  name: 'BFormDate',
  // The mixins order determines the order of appearance in the props reference section
  mixins: [idMixin, propsMixin, dropdownMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      // We always use YYYY-MM-DD value internally
      localValue: formatYMD(this.value) || '',
      // Context data from BCalendar
      localLocale: null,
      isRTL: false,
      formatedValue: ''
    }
  },
  computed: {
    // TBD
  },
  watch: {
    value(newVal, oldVal) {
      this.localValue = formatYMD(newVal) || ''
    },
    localValue(oldVal, newVal) {
      this.$emit('input', this.valueAsDate ? parseYMD(oldVal) || null : newVal || '')
    }
    // TBD
  },
  mounted() {
    this.$on('shown', () => /* istanbul ignore next: until tests are written */ {
      // May want to make an option to focus entire calendar or just the date
      this.focusGrid()
    })
  },
  methods: {
    // TBD
  },
  render(h) {
    const size = this.size
    const state = this.state
    const idButton = this.safeId()
    const idLabel = this.safeId('_value_')
    const idMenu = this.safeId('_dialog_')
    const idWrapper = this.safeId('_b-form-date_')

    let $button = h('div', { attrs: { 'aria-hidden': 'true' } }, [
      h(BIconCalendar, { props: { scale: 1.25 } })
    ])
    $button = h(
      'button',
      {
        ref: 'toggle',
        staticClass: 'btn border-0 h-auto',
        class: {
          'btn-outline-dark': !isBoolean(state),
          'btn-outline-danger': state === false,
          'btn-outline-success': state === true
        },
        attrs: {
          id: idButton,
          type: 'button',
          disabled: this.disabled,
          'aria-readonly': this.readonly && !this.disabled,
          'aria-haspopup': 'dialog',
          'aria-expanded': this.visible ? 'true' : 'false'
        },
        on: {
          mousedown: this.onMousedown,
          click: this.toggle,
          keydown: this.toggle // Handle ENTER, SPACE and DOWN
        }
      },
      [$button]
    )
    $button = h('div', { staticClass: 'input-group-prepend' }, [$button])

    // Fake input
    const $input = h(
      'label',
      {
        staticClass: 'form-control text-break text-wrap border-0 h-auto',
        class: {},
        attrs: {
          id: idLabel,
          for: idButton,
          dir: this.isRTL ? 'rtl' : 'ltr',
          lang: this.localLocale || null,
          'is-invalid': state === false,
          'is-valid': state === true
        },
        on: {
          // Disable bubbling of the click event to
          // prevent menu from closing and re-opening
          click: evt => /* istanbul ignore next */ {
            evt.stopPropagation()
          }
        }
      },
      // We should possibly pass back `No date selected` as the formatted
      // value when no date is selected
      this.formattedValue || this.placehodler || 'Select a date'
    )

    // TODO: add in the optional buttons
    const $controls = []

    const $calendar = h(
      BCalendar,
      {
        ref: 'calendar',
        staticClass: 'p-2',
        props: {
          // TODO: use a computed prop
          // id: this.safeId('_picker_'),
          ariaControls: [idLabel, idWrapper].filter(identity).join(' ') || null,
          value: this.localValue,
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
          todayVariant: this.todayVariant
          // TODO: Add all label passthrough props
        },
        on: {
          // TODO: Make event handlers methods
          selected: (ymd, date) => /* istanbul ignore next: until tests are written */ {
            this.$nextTick(() => {
              if (!this.noCloseOnSelect) {
                this.hide(true)
              }
            })
          },
          context: ctx => {
            this.isRTL = ctx.isRTL
            this.localLocale = ctx.locale
            this.localValue = ctx.selectedYMD
            this.formattedValue = ctx.selectedFormatted
          }
        }
      },
      $controls
    )

    const $menu = h(
      'div',
      {
        ref: 'menu',
        staticClass: 'dropdown-menu',
        class: {
          show: this.visible,
          'dropdown-menu-right': this.right
        },
        attrs: {
          id: idMenu,
          role: 'dialog',
          'aria-modal': 'false'
        },
        on: {
          keydown: this.onKeydown // Handle and ESC
        }
      },
      [$calendar]
    )

    let $hidden = h()
    /* istanbul ignore if: until tests are written */
    if (this.name) {
      $hidden = h('input', {
        attrs: {
          name: this.name,
          form: this.form,
          value: this.localValue || ''
        }
      })
    }

    return h(
      'div',
      {
        staticClass: 'b-form-date form-control input-group dropdown h-auto p-0',
        class: [
          this.directionClass,
          {
            show: this.visible,
            [`form-control-${size}`]: !!size,
            [`input-grpup-${size}`]: !!size,
            'is-invalid': state === false,
            'is-valid': state === true
          }
        ],
        attrs: {
          id: idWrapper,
          role: 'group',
          'aria-disabled': this.disabled,
          'aria-readonly': this.readonly && !this.disabled,
          'aria-labeledby': idLabel,
          // We don't want the flex order to change here
          dir: 'ltr'
        }
      },
      [$button, $hidden, $menu, $input]
    )
  }
})
