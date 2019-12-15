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
    const iconName = `BIcon${icon || 'Blank'}`
    // Get the icon component reference if it is installed
    // Fall back to the blank icon if it is not found.
    const componentRef = parent.$options.components[iconName] || BIconBlank
    return h(componentRef, mergeData(data, { props: { ...props, icon: null } }))
  }
})
