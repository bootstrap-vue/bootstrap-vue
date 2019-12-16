import Vue from '../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { pascalCase, trim } from '../utils/string'
import { BIconBlank } from './icons'
import { commonIconProps } from './helpers/make-icon'

const RX_ICON_PREFIX = /^BIcon/

// Helper BIcon Component
// Requires the requested icon component to be installed
export const BIcon = /*#__PURE__*/ Vue.extend({
  name: 'BIcon',
  functional: true,
  props: {
    icon: {
      type: String,
      default: null
    },
    ...commonIconProps
  },
  render(h, { data, props, parent }) {
    const icon = pascalCase(trim(props.icon || '')).replace(RX_ICON_PREFIX, '')
    const iconName = `BIcon${icon}`
    // If parent context exists, we check to see if the icon has been registered
    // Eitehr locally in the parent component, or globally at the $root level
    const components = ((parent || {}).$options || {}).components
    const componentRefOrName =
      icon && components
        ? components[iconName] || BIconBlank
        : icon
          ? iconName
          : BIconBlank
    return h(componentRefOrName, mergeData(data, { props: { ...props, icon: null } }))
  }
})
