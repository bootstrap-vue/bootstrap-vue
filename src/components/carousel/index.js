import BCarousel from './carousel'
import BCarouselSlide from './carousel-slide'
import { installFactory } from '../../utils/plugins'

const components = {
  BCarousel,
  BCarouselSlide
}

export { BCarousel, BCarouselSlide }

export default {
  install: installFactory({ components })
}
