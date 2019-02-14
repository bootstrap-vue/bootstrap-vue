import BCarousel from './carousel'
import BCarouselSlide from './carousel-slide'
import { registerComponents } from '../../utils/plugins'

const components = {
  BCarousel,
  BCarouselSlide
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
