import BModal from './modal'
import modalDirectivePlugin from '../../directives/modal'
import { registerComponents } from '../../utils/plugins'

const components = {
  BModal
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
    Vue.use(modalDirectivePlugin)
  }
}
