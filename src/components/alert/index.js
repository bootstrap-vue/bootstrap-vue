import BAlert from './alert'
import { registerComponents } from '../../utils/plugins'

const components = {
  BAlert
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
