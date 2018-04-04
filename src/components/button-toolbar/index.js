import bButtonToolbar from './button-toolbar'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bButtonToolbar,
  bBtnToolbar: bButtonToolbar
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
