import { extend, mergeData } from '../../vue'
import { NAME_NAV_TEXT } from '../../constants/components'

// --- Props ---

export const props = {}

// --- Main component ---

// @vue/component
export const BNavText = /*#__PURE__*/ extend({
  name: NAME_NAV_TEXT,
  functional: true,
  props,
  render(h, { data, children }) {
    return h('li', mergeData(data, { staticClass: 'navbar-text' }), children)
  }
})
