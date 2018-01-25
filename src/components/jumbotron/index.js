import bJumbotron from './jumbotron'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bJumbotron
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
