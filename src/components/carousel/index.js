import BCarousel from './carousel'
import BCarouselSlide from './carousel-slide'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BCarousel,
  BCarouselSlide
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
