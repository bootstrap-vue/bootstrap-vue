import bCollapse from './collapse.vue';
import togglePlugin from '../../directives/toggle';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bCollapse
};

const VuePlugin = {
  install(Vue) {
    for (var component in components) {
      Vue.component(component, components[component]);
    }
    Vue.use(togglePlugin);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
