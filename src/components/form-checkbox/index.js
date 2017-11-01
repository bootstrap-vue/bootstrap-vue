import bFormCheckbox from './form-checkbox.vue';
import bFormCheckboxGroup from './form-checkbox-group.vue';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bFormCheckbox,
  bCheckbox: bFormCheckbox,
  bCheck: bFormCheckbox,
  bFormCheckboxGroup,
  bCheckboxGroup: bFormCheckboxGroup,
  bCheckGroup: bFormCheckboxGroup
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
