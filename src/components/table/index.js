import BTable from './table'
import { registerComponents } from '../../utils/plugins'

const components = {
  BTable
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
