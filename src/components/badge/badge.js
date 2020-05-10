import { CLASS_NAME_BADGE } from '../../constants/class-names'
import { NAME_BADGE } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import pluckProps from '../../utils/pluck-props'
import { getComponentConfig } from '../../utils/config'
import { suffixClass } from '../../utils/string'
import { BLink, propsFactory as linkPropsFactory } from '../link/link'

// --- Props ---
const linkProps = linkPropsFactory()
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
    default: () => getComponentConfig(NAME_BADGE, 'variant')
  },
  pill: {
    type: Boolean,
    default: false
  }
}

// --- Main component ---
// @vue/component
export const BBadge = /*#__PURE__*/ Vue.extend({
  name: NAME_BADGE,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { variant, active, disabled } = props
    const isBLink = props.href || props.to
    const tag = isBLink ? BLink : props.tag

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
      props: isBLink ? pluckProps(linkProps, props) : {}
    }

    return h(tag, mergeData(data, componentData), children)
  }
})
