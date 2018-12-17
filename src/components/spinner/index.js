import bSpinner from './spinner'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bSpinner
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
