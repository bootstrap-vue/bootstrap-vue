import BJumbotron from './jumbotron'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BJumbotron
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
