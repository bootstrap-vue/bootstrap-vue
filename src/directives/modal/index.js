import bModal from './modal'
import { registerDirectives, vueUse } from '../../utils/plugins'

const directives = {
  bModal
}

const VuePlugin = {
  install (Vue) {
    registerDirectives(Vue, directives)
  }
}

vueUse(VuePlugin)

export default VuePlugin
