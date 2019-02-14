import BEmbed from './embed'
import { registerComponents } from '../../utils/plugins'

const components = {
  BEmbed
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
