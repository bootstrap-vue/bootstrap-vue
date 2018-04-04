import bCarousel from './carousel'
import bCarouselSlide from './carousel-slide'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bCarousel,
  bCarouselSlide
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
