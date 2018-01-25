import bEmbed from './embed'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bEmbed
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
