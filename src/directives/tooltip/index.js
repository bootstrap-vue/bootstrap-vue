import bTooltip from './tooltip'
import { registerDirectives, vueUse } from '../../utils/plugins'

const directives = {
  bTooltip
}

const VuePlugin = {
  install (Vue) {
    registerDirectives(Vue, directives)
  }
}

vueUse(VuePlugin)

export default VuePlugin
