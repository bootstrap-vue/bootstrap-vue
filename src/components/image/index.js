import BImg from './img'
import BImgLazy from './img-lazy'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BImg,
  BImgLazy
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
