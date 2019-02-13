import bPopover from './popover'
import { registerDirectives, vueUse } from '../../utils/plugins'

const directives = {
  bPopover
}

export default {
  install(Vue) {
    registerDirectives(Vue, directives)
  }
}
