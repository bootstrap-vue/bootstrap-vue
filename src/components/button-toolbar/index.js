import BButtonToolbar from './button-toolbar'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BButtonToolbar,
  BBtnToolbar: BButtonToolbar
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
