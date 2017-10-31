import bLink from './link';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bLink
};

const VuePlugin = {
  install(Vue) {
    if (!registerComponent(Vue, 'link')) {
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
