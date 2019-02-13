import BAlert from './alert'
import { registerComponents } from '../../utils/plugins'

const components = {
  BAlert
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

export default VuePlugin
