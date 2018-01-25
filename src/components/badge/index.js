import bBadge from './badge'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bBadge
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
