import { mergeData } from 'vue-functional-data-merge'
import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { isLink } from '../../utils/router'
import { BLink, props as BLinkProps } from '../link/link'

// --- Constants ---

const NAME = 'BBadge'

// --- Props ---

const linkProps = omit(BLinkProps, ['event', 'routerTag'])
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

// --- Main component ---
// @vue/component
export const BBadge = /*#__PURE__*/ Vue.extend({
  name: NAME,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const link = isLink(props)
    const tag = link ? BLink : props.tag

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
      props: link ? pluckProps(linkProps, props) : {}
    }

    return h(tag, mergeData(data, componentData), children)
  }
})
