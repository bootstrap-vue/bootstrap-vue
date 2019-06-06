import BCarousel from './carousel'
import BCarouselSlide from './carousel-slide'
import { pluginFactory } from '../../utils/plugins'

const CarouselPlugin = /*#__PURE*/ pluginFactory({
  components: {
    BCarousel,
    BCarouselSlide
  }
})

export { BCarousel, BCarouselSlide }

export default CarouselPlugin
