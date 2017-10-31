import bCarousel `./carousel.vue`;
import bCarouselSlide `./carousel-slide.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bCarousel);
    Vue.component(bCarouselSlide);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
