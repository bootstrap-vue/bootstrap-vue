import BPagination from './pagination'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BPagination
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
