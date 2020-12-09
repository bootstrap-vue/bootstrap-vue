import { Vue, mergeData } from '../../vue'
import { NAME_NAVBAR_NAV } from '../../constants/components'
import { pick } from '../../utils/object'
import { makePropsConfigurable } from '../../utils/props'
import { props as BNavProps } from '../nav/nav'

// --- Helper methods ---

const computeJustifyContent = value => {
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value
  return `justify-content-${value}`
}

// --- Props ---

export const props = makePropsConfigurable(
  pick(BNavProps, ['tag', 'fill', 'justified', 'align', 'small']),
  NAME_NAVBAR_NAV
)

// --- Main component ---

// @vue/component
export const BNavbarNav = /*#__PURE__*/ Vue.extend({
  name: NAME_NAVBAR_NAV,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { align } = props

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'navbar-nav',
        class: {
          'nav-fill': props.fill,
          'nav-justified': props.justified,
          [computeJustifyContent(align)]: align,
          small: props.small
        }
      }),
      children
    )
  }
})
