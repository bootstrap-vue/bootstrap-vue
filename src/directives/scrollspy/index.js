import bScrollspy from './scrollspy'
import { registerDirectives, vueUse } from '../../utils/plugins'

const directives = {
  bScrollspy
}

const VuePlugin = {
  install (Vue) {
    registerDirectives(Vue, directives)
  }
}

vueUse(VuePlugin)

export default VuePlugin
