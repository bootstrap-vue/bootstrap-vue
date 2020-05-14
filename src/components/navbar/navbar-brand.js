import { mergeData } from 'vue-functional-data-merge'
import Vue from '../../utils/vue'
import { clone } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { BLink, props as BLinkProps } from '../link/link'

const linkProps = clone(BLinkProps)
linkProps.href.default = undefined
linkProps.to.default = undefined

export const props = {
  ...linkProps,
  tag: {
    type: String,
    default: 'div'
  }
}

// @vue/component
export const BNavbarBrand = /*#__PURE__*/ Vue.extend({
  name: 'BNavbarBrand',
  functional: true,
  props,
  render(h, { props, data, children }) {
    const isLink = props.to || props.href
    const tag = isLink ? BLink : props.tag

    return h(
      tag,
      mergeData(data, {
        staticClass: 'navbar-brand',
        props: isLink ? pluckProps(linkProps, props) : {}
      }),
      children
    )
  }
})
