import BMedia from './media'
import BMediaAside from './media-aside'
import BMediaBody from './media-body'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BMedia,
  BMediaAside,
  BMediaBody
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
