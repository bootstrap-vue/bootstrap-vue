import Vue, { mergeData } from '../../utils/vue'

export const props = {}

// @vue/component
export const BNavText = /*#__PURE__*/ Vue.extend({
  name: 'BNavText',
  functional: true,
  props,
  render(h, { data, children }) {
    return h('li', mergeData(data, { staticClass: 'navbar-text' }), children)
  }
})
