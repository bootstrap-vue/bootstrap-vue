import bPopover from './popover'
import { registerDirectives } from '../../utils/plugins'

const directives = {
  bPopover
}

export default {
  install(Vue) {
    registerDirectives(Vue, directives)
  }
}
