import bPagination from './pagination'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bPagination
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
