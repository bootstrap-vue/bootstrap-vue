import bTooltip from './tooltip'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bTooltip
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
