import bMedia from './media';
import bMediaAside from './media-aside';
import bMediaBody from './media-body';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bMedia,
  bMediaAside,
  bMediaBody
};

const VuePlugin = {
  install(Vue) {
    for (var component in components) {
      registerComponent(Vue, component, components[component]);
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
