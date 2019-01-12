import BAlert from './alert'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BAlert
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
