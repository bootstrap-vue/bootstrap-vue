import BTooltip from './tooltip'
import tooltipDirectivePlugin from '../../directives/tooltip'
import { registerComponents } from '../../utils/plugins'

const components = {
  BTooltip
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
    Vue.use(tooltipDirectivePlugin)
  }
}
