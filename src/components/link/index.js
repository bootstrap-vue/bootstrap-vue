import BLink from './link'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BLink
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
