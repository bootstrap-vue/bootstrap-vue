import BModal from './modal'
import modalDirectivePlugin from '../../directives/modal'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BModal
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
    Vue.use(modalDirectivePlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
