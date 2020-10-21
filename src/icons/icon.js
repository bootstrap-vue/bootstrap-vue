import Vue, { mergeData } from '../vue'
import { NAME_ICON } from '../constants/components'
import { RX_ICON_PREFIX } from '../constants/regex'
import { pascalCase, trim } from '../utils/string'
import { BIconBlank } from './icons'
import { commonIconProps } from './helpers/icon-base'

const findIconComponent = (ctx, iconName) => {
  if (!ctx) {
    return null
  }
  const components = (ctx.$options || {}).components
  const iconComponent = components[iconName]
  return iconComponent || findIconComponent(ctx.$parent, iconName)
}

// Helper BIcon component
// Requires the requested icon component to be installed
export const BIcon = /*#__PURE__*/ Vue.extend({
  name: NAME_ICON,
  functional: true,
  props: {
    icon: {
      type: String,
      default: null
    },
    ...commonIconProps,
    stacked: {
      type: Boolean,
      default: false
    }
  },
  render(h, { data, props, parent }) {
    const icon = pascalCase(trim(props.icon || '')).replace(RX_ICON_PREFIX, '')

    // If parent context exists, we check to see if the icon has been registered
    // either locally in the parent component, or globally at the `$root` level
    // If not registered, we render a blank icon
    return h(
      icon ? findIconComponent(parent, `BIcon${icon}`) || BIconBlank : BIconBlank,
      mergeData(data, { props: { ...props, icon: null } })
    )
  }
})
