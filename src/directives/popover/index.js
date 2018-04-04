import bPopover from './popover'
import { registerDirectives, vueUse } from '../../utils/plugins'

const directives = {
  bPopover
}

const VuePlugin = {
  install (Vue) {
    registerDirectives(Vue, directives)
  }
}

vueUse(VuePlugin)

export default VuePlugin
