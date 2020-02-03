import Vue from '../../utils/vue'

// @vue/component
export const BFormDate = /*#__PURE__*/ Vue.extend({
  name: 'BFormDate',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Date],
      default: null
    }
  },
  render(h) {
    return h('div', { staticClass: 'b-form-date' })
  }
})
