import { Vue, mergeData } from '../../vue'
import { NAME_BADGE } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { omit, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, pluckProps } from '../../utils/props'
import { isLink } from '../../utils/router'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

const linkProps = omit(BLinkProps, ['event', 'routerTag'])
delete linkProps.href.default
delete linkProps.to.default

export const props = makePropsConfigurable(
  sortKeys({
    ...linkProps,
    pill: makeProp(PROP_TYPE_BOOLEAN, false),
    tag: makeProp(PROP_TYPE_STRING, 'span'),
    variant: makeProp(PROP_TYPE_STRING, 'secondary')
  }),
  NAME_BADGE
)

// --- Main component ---

// @vue/component
export const BBadge = /*#__PURE__*/ Vue.extend({
  name: NAME_BADGE,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { active, disabled } = props
    const link = isLink(props)
    const tag = link ? BLink : props.tag
    const variant = props.variant || 'secondary'

    return h(
      tag,
      mergeData(data, {
        staticClass: 'badge',
        class: [
          `badge-${variant}`,
          {
            'badge-pill': props.pill,
            active,
            disabled
          }
        ],
        props: link ? pluckProps(linkProps, props) : {}
      }),
      children
    )
  }
})
