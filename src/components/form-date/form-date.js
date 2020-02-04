import Vue from '../../utils/vue'
import { formatYMD } from '../../utils/date'
import { isBoolean } from '../../utils/inspect'
import idMixin from '../../mixins/id'
import dropdownMixin from '../../mixins/dropdown'
import formMixin from '../../mixins/form'
// import { BCalendar } from '../calendar/calendar'
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
    min: {
      type: [String, Date],
      default: null
    },
    max: {
      type: [String, Date],
      default: null
    },
    size: {
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
  mixins: [idMixin, propsMixin, formMixin, dropdownMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      // We always use YYYY-MM-DD value internally
      localValue: formatYMD(this.value) || '',
      // Context object from BCalendar
      // may choose to store only relevant parts of context event
      // to prevent unneccessary re-renders
      context: {},
      locale: null,
      isRTL: false,
      formatedValue: ''
    }
  },
  computed: {
    // TBD
  },
  watch: {
    // TBD
  },
  mounted() {
    // TBD
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

    const $buttonContent = h('div', { attrs: { 'aria-hidden': 'true' } }, [
      h(BIconCalendar, { props: { scale: 1.25 } })
    ])

    const $button = h(
      'button',
      {
        ref: 'toggle',
        staticClass: 'btn border-0 h-auto',
        class: {
          'btn-ouline-dark': !isBoolean(state),
          'btn-outline-danger': state === false,
          'btn-outline-success': state === true
        },
        attrs: {
          id: idButton,
          type: 'button',
          disabled: this.disabled,
          'aria-readonly': this.readonly && !this.disabled,
          'aria-haspopup': 'dialog',
          'aria-expanded': 'false'
        }
      },
      [$buttonContent]
    )

    // Fake input
    const $input = h(
      'label',
      {
        staticClass: 'form-control text-center text-break text-wrap border-0 h-auto',
        class: {},
        attrs: {
          id: idLabel,
          for: idButton,
          'is-invalid': state === false,
          'is-valid': state === true
        },
        on: {
          // Disable bubbling of the click event to
          // prevent menu from closing and re-opening
          click: evt => evt.stopPropagation()
        }
      },
      'TBD'
    )

    const $menu = h(
      'div',
      {
        ref: 'menu',
        staticClass: 'dropdown-menu',
        class: {},
        attrs: {
          id: idMenu,
          role: 'dialog',
          'aria-modal': 'false'
        },
        on: {}
      },
      'TBD'
    )

    let $hidden = h()
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
        class: {
          [`form-control-${size}`]: !!size,
          [`input-grpup-${size}`]: !!size,
          'is-invalid': state === false,
          'is-valid': state === true
        },
        attrs: {
          role: 'group',
          'aria-disabled': this.disabled,
          'aria-readonly': this.readonly && !this.disabled,
          'aria-labeledby': idLabel
        }
      },
      [$button, $hidden, $menu, $input]
    )
  }
})
