import { NAME_NAV_TEXT } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'

export const props = {}

// @vue/component
export const BNavText = /*#__PURE__*/ Vue.extend({
  name: NAME_NAV_TEXT,
  functional: true,
  props,
  render(h, { data, children }) {
    return h('li', mergeData(data, { staticClass: 'navbar-text' }), children)
  }
})
