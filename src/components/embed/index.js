import BEmbed from './embed'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BEmbed
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
