import bImg from './img';
import bImgLazy from './img-lazy.vue';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bImg,
  bImgLazy
};

const VuePlugin = {
  install(Vue) {
    if (!registerComponent(Vue, 'image')) {
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
