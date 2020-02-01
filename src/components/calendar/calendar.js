import Vue from '../../utils/vue'
import { createDate, parseYMD } from '../../utils/date'
import identity from '../../utils/identity'
import idMixin from '../../mixins/id'

const NAME = 'BFormCalendar'

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
      // Locale(s) to use. default is to use page/browser setting
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
  methods: {
    getToday() {
      return parseYMD(createDate())
    }
  },
  render(h) {
    const isRTL = this.isRTL
    const $header = h()
    const $nav = h()
    const $grid = h()
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
          // If datepicker controls an input, this will
          // specify the ID of the input
          // Alternatively, the input can also use aria-owns/haspopup/etc
          'aria-controls': this.ariaControls || null,
          // This should be a prop (so it can be changed to Date picker, etc, localized
          'aria-roledescription': this.roleDescription || null,
          'aria-describedby': [
            // Should the attr (if present) go last?
            // or should this attr be a prop?
            this.$attrs['aria-describedby'],
            this.safeId('current-value'),
            this.safeId('calendar-help')
          ]
            .filter(identity)
            .join(' '),
          'aria-disabled': this.disabled ? 'true' : null
        },
        on: {}
      },
      [$header, $nav, $grid]
    )
  }
})
