import { defineComponent, h } from '../../vue'
import { NAME_BADGE } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { isLink } from '../../utils/router'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

const linkProps = omit(BLinkProps, ['event', 'routerTag'])
delete linkProps.href.default
delete linkProps.to.default

export const props = makePropsConfigurable(
  {
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
    },
    ...linkProps
  },
  NAME_BADGE
)

// --- Main component ---
// @vue/component
export const BBadge = /*#__PURE__*/ defineComponent({
  name: NAME_BADGE,
  mixins: [normalizeSlotMixin],
  props,
  render() {
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
