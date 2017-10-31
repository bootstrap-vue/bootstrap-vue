import bCarousel from './carousel.vue';
import bCarouselSlide from './carousel-slide.vue';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bCarousel,
  bCarouselSlide
};

const VuePlugin = {
  install(Vue) {
    if (!registerComponent(Vue, 'carousel')) {
      for (var component in components) {
        Vue.component(component, components[component]);
      }
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
