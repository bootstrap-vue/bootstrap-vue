import bMedia from './media'
import bMediaAside from './media-aside'
import bMediaBody from './media-body'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bMedia,
  bMediaAside,
  bMediaBody
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
