import bToggle from './toggle'
import { registerDirectives, vueUse } from '../../utils/plugins'

const directives = {
  bToggle
}

const VuePlugin = {
  install (Vue) {
    registerDirectives(Vue, directives)
  }
}

vueUse(VuePlugin)

export default VuePlugin
