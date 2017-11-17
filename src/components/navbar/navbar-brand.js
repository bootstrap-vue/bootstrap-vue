import Link, { propsFactory } from '../link/link'
import { mergeData, pluckProps } from '../../utils'
import { assign } from '../../utils/object'

const linkProps = propsFactory()
linkProps.href.default = undefined
linkProps.to.default = undefined

export const props = assign(linkProps, {
  tag: {
    type: String,
    default: 'div'
  }
})

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    const isLink = Boolean(props.to || props.href)
    const tag = isLink ? Link : props.tag

    return h(
      tag,
      mergeData(data, {
        staticClass: 'navbar-brand',
        props: isLink ? pluckProps(linkProps, props) : {}
      }),
      children
    )
  }
}
