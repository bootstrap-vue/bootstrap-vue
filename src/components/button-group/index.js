import bButtonGroup from './button-group'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bButtonGroup,
  bBtnGroup: bButtonGroup
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
