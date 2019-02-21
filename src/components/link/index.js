import BLink from './link'
import { registerComponents } from '../../utils/plugins'

const components = {
  BLink
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
