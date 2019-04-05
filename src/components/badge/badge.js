import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'
import pluckProps from '../../utils/pluck-props'
import Link, { propsFactory as linkPropsFactory } from '../link/link'

const NAME = 'BBadge'

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
    default: () => String(getComponentConfig(NAME, 'variant'))
  },
  pill: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export default Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const tag = !props.href && !props.to ? props.tag : Link

    const componentData = {
      staticClass: 'badge',
      class: [
        `badge-${props.variant || getComponentConfig(NAME, 'variant')}`,
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
})
