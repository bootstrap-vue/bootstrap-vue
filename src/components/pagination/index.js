import BPagination from './pagination'
import { registerComponents } from '../../utils/plugins'

const components = {
  BPagination
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
