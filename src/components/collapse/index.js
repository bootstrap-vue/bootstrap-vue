import BCollapse from './collapse'
import toggleDirectivePlugin from '../../directives/toggle'
import { registerComponents } from '../../utils/plugins'

const components = {
  BCollapse
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
    Vue.use(toggleDirectivePlugin)
  }
}
