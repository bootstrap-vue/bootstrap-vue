import BBadge from './badge'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BBadge
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
