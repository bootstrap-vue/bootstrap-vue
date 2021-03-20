import { mergeData } from '../../vue'
import { defineComponent, h } from 'vue'
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
export const BBadge = /*#__PURE__*/ defineComponent({
  name: NAME_BADGE,
  functional: true,
  props,
  render() {
    const { active, disabled } = this
    const link = isLink(this)
    const tag = link ? BLink : this.tag
    const variant = this.variant || 'secondary'

    return h(
      tag,
      mergeData(
        this,
        {
          class: [
            'badge',
            `badge-${variant}`,
            { 'badge-pill': this.pill },
            { active },
            { disabled }
          ]
        },
        link ? pluckProps(linkProps, this) : {}
      ),
      (this.$slots.default || (() => null))()
    )
  }
})
