import { mergeData } from 'vue-functional-data-merge'

import pluckProps from '../../utils/pluck-props'
import Link, { propsFactory as linkPropsFactory } from '../link/link'

let linkProps = linkPropsFactory()
delete linkProps.href.default
delete linkProps.to.default

export const props = {
  ...linkProps,
  tag: {
    type: String,
    default: 'span'
  },
  variant: {
    type: String,
    default: 'secondary'
  },
  pill: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export default {
  name: 'BBadge',
  functional: true,
  props,
  render(h, { props, data, children }) {
    const tag = !props.href && !props.to ? props.tag : Link

    const componentData = {
      staticClass: 'badge',
      class: [
        !props.variant ? 'badge-secondary' : `badge-${props.variant}`,
        {
          'badge-pill': Boolean(props.pill),
          active: props.active,
          disabled: props.disabled
        }
      ],
      props: pluckProps(linkProps, props)
    }

    return h(tag, mergeData(data, componentData), children)
  }
}
