import BCarousel from './carousel'
import BCarouselSlide from './carousel-slide'
import { installFactory } from '../../utils/plugins'

const components = {
  BCarousel,
  BCarouselSlide
}

const CarouselPlugin = {
  install: installFactory({ components })
}

export {
  // Plugins
  CarouselPlugin,
  // Components
  BCarousel,
  BCarouselSlide
}

// Legacy: default is plugin
export default CarouselPlugin
