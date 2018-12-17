import BCollapse from './collapse'
import togglePlugin from '../../directives/toggle'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BCollapse
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
    Vue.use(togglePlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
