import BButtonGroup from './button-group'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BButtonGroup,
  BBtnGroup: BButtonGroup
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
