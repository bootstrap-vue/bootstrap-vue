import BSpinner from './spinner'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BSpinner
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
