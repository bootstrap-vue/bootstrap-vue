import Vue from '../../utils/vue'
import pluckProps from '../../utils/pluck-props'
import { mergeData } from 'vue-functional-data-merge'
import { getComponentConfig } from '../../utils/config'
import { clone } from '../../utils/object'
import { BLink, props as BLinkProps } from '../link/link'

const NAME = 'BBadge'

const linkProps = clone(BLinkProps)
delete linkProps.href.default
delete linkProps.to.default

export const props = {
  tag: {
    type: String,
    default: 'span'
  },
  variant: {
    type: String,
    default: () => getComponentConfig(NAME, 'variant')
  },
  pill: {
    type: Boolean,
    default: false
  },
  ...linkProps
}

// @vue/component
export const BBadge = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const isBLink = props.href || props.to
    const tag = isBLink ? BLink : props.tag

    const componentData = {
      staticClass: 'badge',
      class: [
        props.variant ? `badge-${props.variant}` : 'badge-secondary',
        {
          'badge-pill': props.pill,
          active: props.active,
          disabled: props.disabled
        }
      ],
      props: isBLink ? pluckProps(linkProps, props) : {}
    }

    return h(tag, mergeData(data, componentData), children)
  }
})
