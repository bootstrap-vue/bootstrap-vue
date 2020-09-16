import { NAME_ICON } from '../constants/components'
import { RX_ICON_PREFIX } from '../constants/regex'
import Vue, { mergeData } from '../utils/vue'
import { pascalCase, trim } from '../utils/string'
import { BIconBlank } from './icons'
import { commonIconProps } from './helpers/icon-base'

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
    const iconName = `BIcon${icon}`
    // If parent context exists, we check to see if the icon has been registered
    // Either locally in the parent component, or globally at the `$root` level
    // If not registered, we render a blank icon
    const components = ((parent || {}).$options || {}).components
    const componentRefOrName =
      icon && components ? components[iconName] || BIconBlank : icon ? iconName : BIconBlank
    return h(componentRefOrName, mergeData(data, { props: { ...props, icon: null } }))
  }
})
