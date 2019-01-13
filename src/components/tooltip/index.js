import BTooltip from './tooltip'
import tooltipDirectivePlugin from '../../directives/tooltip'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BTooltip
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
    Vue.use(tooltipDirectivePlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
