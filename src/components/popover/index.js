import bPopover from './popover'
import popoverPlugin from '../../directives/popover'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bPopover
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
    Vue.use(popoverPlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
