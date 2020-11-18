import { defineComponent, h, mergeData } from '../../vue'
import { NAME_NAV_TEXT } from '../../constants/components'

// @vue/component
export const BNavText = /*#__PURE__*/ defineComponent({
  name: NAME_NAV_TEXT,
  functional: true,
  render(_, { data, children }) {
    return h('li', mergeData(data, { staticClass: 'navbar-text' }), children)
  }
})
