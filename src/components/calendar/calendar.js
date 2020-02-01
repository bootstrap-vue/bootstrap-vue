import Vue from '../../utils/vue'
import { createDate, parseYMD } from '../../utils/date'

const NAME = 'BFormCalendar'

// @vue/component
export const BCalendar = Vue.extend({
  name: NAME,
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
    return h('div', {})
  }
})
