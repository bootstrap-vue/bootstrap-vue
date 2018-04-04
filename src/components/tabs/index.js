import bTabs from './tabs'
import bTab from './tab'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bTabs,
  bTab
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
