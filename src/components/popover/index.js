import BPopover from './popover'
import popoverDirectivePlugin from '../../directives/popover'
import { registerComponents } from '../../utils/plugins'

const components = {
  BPopover
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
    Vue.use(popoverDirectivePlugin)
  }
}
