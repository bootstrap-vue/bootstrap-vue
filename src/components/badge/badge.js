import { Vue } from '../../vue'
import { NAME_BADGE } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { omit, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, pluckProps } from '../../utils/props'
import { isLink } from '../../utils/router'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
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
  mixins: [normalizeSlotMixin],
  props,
  render(h) {
    const { variant, $props } = this
    const link = isLink($props)
    const tag = link ? BLink : this.tag

    return h(
      tag,
      {
        staticClass: 'badge',
        class: [
          variant ? `badge-${variant}` : 'badge-secondary',
          {
            'badge-pill': this.pill,
            active: this.active,
            disabled: this.disabled
          }
        ],
        props: link ? pluckProps(linkProps, $props) : {}
      },
      this.normalizeSlot()
    )
  }
})
