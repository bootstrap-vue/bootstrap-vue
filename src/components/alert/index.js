import bAlert from './alert'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bAlert
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
