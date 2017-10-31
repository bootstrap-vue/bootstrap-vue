import bFormGroup from './form-group.vue';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bFormGroup,
  bFormFieldset: bFormGroup
};

const VuePlugin = {
  install(Vue) {
    if (!registerComponent(Vue, 'form-group')) {
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
