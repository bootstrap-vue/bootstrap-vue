import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_NAVBAR_BRAND } from '../../constants/components'
import { omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

const linkProps = omit(BLinkProps, ['event', 'routerTag'])
linkProps.href.default = undefined
linkProps.to.default = undefined

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  ...linkProps
}

// --- Main component ---
// @vue/component
export const BNavbarBrand = /*#__PURE__*/ defineComponent({
  name: NAME_NAVBAR_BRAND,
  functional: true,
  props,
  render(_, { props, data, children }) {
    const isLink = props.to || props.href
    const tag = isLink ? BLink : props.tag

    return h(
      tag,
      mergeProps(data, {
        staticClass: 'navbar-brand',
        props: isLink ? pluckProps(linkProps, props) : {}
      }),
      children
    )
  }
})
