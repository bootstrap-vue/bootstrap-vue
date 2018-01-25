import bPopover from './popover'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bPopover
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
