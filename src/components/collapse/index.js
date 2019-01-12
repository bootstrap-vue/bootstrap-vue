import BCollapse from './collapse'
import toggleDirectivePlugin from '../../directives/toggle'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BCollapse
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
    Vue.use(toggleDirectivePlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
