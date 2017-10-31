import bFormFile from './form-file.vue';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bFormFile,
  bFile: bFormFile
};

const VuePlugin = {
  install(Vue) {
    if (!registerComponent(Vue, 'form-file')) {
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
