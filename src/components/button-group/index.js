import bButtonGroup from './button-group';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bButtonGroup,
  bBtnGroup: bButtonGroup
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
