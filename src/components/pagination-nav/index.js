import BPaginationNav from './pagination-nav'
import { registerComponents } from '../../utils/plugins'

const components = {
  BPaginationNav
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
