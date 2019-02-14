import BSpinner from './spinner'
import { registerComponents } from '../../utils/plugins'

const components = {
  BSpinner
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
