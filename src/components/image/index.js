import bImg from './img'
import bImgLazy from './img-lazy'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bImg,
  bImgLazy
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
