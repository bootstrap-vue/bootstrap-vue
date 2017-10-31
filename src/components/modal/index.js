import bModal from './modal.vue';
import modalPlugin from '../../directives/modal';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bModal
};

const VuePlugin = {
  install(Vue) {
    for (var component in components) {
      if (!registerComponent(Vue, component)) {
        Vue.component(component, components[component]);
      }
    }
    Vue.use(modalPlugin);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin
