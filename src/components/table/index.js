import bTable from './table'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bTable
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
