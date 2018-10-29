import bTooltip from './tooltip'
import tooltipPlugin from '../../directives/tooltip'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bTooltip
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
    Vue.use(tooltipPlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
