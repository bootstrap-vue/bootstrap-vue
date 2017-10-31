import bCollapse from './collapse.vue';
import togglePlugin from '../../directives/toggle';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bCollapse
};

const VuePlugin = {
  install(Vue) {
    Vue.use(togglePlugin);
    if (!registerComponent(Vue, 'alert')) {
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
