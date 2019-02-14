import BImg from './img'
import BImgLazy from './img-lazy'
import { registerComponents } from '../../utils/plugins'

const components = {
  BImg,
  BImgLazy
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
