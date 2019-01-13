import BTable from './table'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BTable
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
