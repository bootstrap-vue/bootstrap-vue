import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_NAV_TEXT } from '../../constants/components'

// @vue/component
export const BNavText = /*#__PURE__*/ defineComponent({
  name: NAME_NAV_TEXT,
  functional: true,
  render(_, { data, children }) {
    return h('li', mergeProps(data, { staticClass: 'navbar-text' }), children)
  }
})
