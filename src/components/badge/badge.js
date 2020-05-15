import { CLASS_NAME_BADGE } from '../../constants/class-names'
import { NAME_BADGE } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { isLink } from '../../utils/router'
import { suffixClass } from '../../utils/string'
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
    const { variant, active, disabled } = props
    const link = isLink(props)
    const tag = link ? BLink : props.tag

    const componentData = {
      staticClass: CLASS_NAME_BADGE,
      class: [
        suffixClass(CLASS_NAME_BADGE, variant || 'secondary'),
        {
          [suffixClass(CLASS_NAME_BADGE, 'pill')]: props.pill,
          active,
          disabled
        }
      ],
      props: link ? pluckProps(linkProps, props) : {}
    }

    return h(tag, mergeData(data, componentData), children)
  }
})
