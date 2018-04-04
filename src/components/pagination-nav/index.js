import bPaginationNav from './pagination-nav'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bPaginationNav
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
