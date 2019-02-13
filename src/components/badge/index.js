import BBadge from './badge'
import { registerComponents } from '../../utils/plugins'

const components = {
  BBadge
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
