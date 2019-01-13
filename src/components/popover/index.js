import BPopover from './popover'
import popoverDirectivePlugin from '../../directives/popover'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BPopover
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
    Vue.use(popoverDirectivePlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
