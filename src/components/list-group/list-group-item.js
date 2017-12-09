import { mergeData, pluckProps } from '../../utils'
import { assign } from '../../utils/object'
import { arrayIncludes } from '../../utils/array'
import Link, { propsFactory as linkPropsFactory } from '../link/link'

const actionTags = ['a', 'router-link', 'button', 'b-link']
let linkProps = linkPropsFactory()
delete linkProps.href.default
delete linkProps.to.default

export const props = assign({
  tag: {
    type: String,
    default: 'div'
  },
  action: {
    type: Boolean,
    default: null
  },
  button: {
    type: Boolean,
    default: null
  },
  variant: {
    type: String,
    default: null
  }
}, linkProps)

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    const tag = props.button ? 'button' : ((!props.href && !props.to) ? props.tag : Link)
    const isAction = Boolean(
      props.href || props.to || props.action || props.button || arrayIncludes(actionTags, props.tag)
    )
    const componentData = {
      staticClass: 'list-group-item',
      class: {
        [`list-group-item-${props.variant}`]: Boolean(props.variant),
        'list-group-item-action': isAction,
        active: props.active,
        disabled: props.disabled
      },
      attrs: (tag === 'button' && props.disabled) ? { disabled: true } : {},
      props: props.button ? {} : pluckProps(linkProps, props)
    }

    return h(tag, mergeData(data, componentData), children)
  }
}
