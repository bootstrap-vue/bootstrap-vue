import Vue from '../../utils/vue'

export const BFormDate = /*#__PURE__*/ Vue.extend({
  name: 'BFormDate',
  model: {
    prop: 'value',
    event: 'input'
  },
  render(h) {
    return h('div', { staticClass: 'b-form-date' })
  }
})
