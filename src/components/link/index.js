import bLink from './link'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bLink
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
