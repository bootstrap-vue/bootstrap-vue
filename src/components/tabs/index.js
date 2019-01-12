import BTabs from './tabs'
import BTab from './tab'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BTabs,
  BTab
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
