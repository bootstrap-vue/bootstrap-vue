import Vue, { mergeData } from '../../vue'
import { NAME_BADGE } from '../../constants/components'
import { getComponentConfig } from '../../utils/config'
import { omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { isLink } from '../../utils/router'
import { BLink, props as BLinkProps } from '../link/link'

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
    default: () => getComponentConfig(NAME_BADGE, 'variant')
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
  name: NAME_BADGE,
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
