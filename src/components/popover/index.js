import BPopover from './popover'
import popoverPlugin from '../../directives/popover'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BPopover
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
    Vue.use(popoverPlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
