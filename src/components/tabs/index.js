import BTabs from './tabs'
import BTab from './tab'
import { registerComponents } from '../../utils/plugins'

const components = {
  BTabs,
  BTab
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
