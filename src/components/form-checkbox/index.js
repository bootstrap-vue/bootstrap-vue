import bFormCheckbox from './form-checkbox.vue';
import bFormCheckboxGroup from './form-checkbox-group.vue';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bFormCheckbox,
  bFormCheckbox as bCheckbox,
  bFormCheckbox as bCheck,
  bFormCheckboxGroup,
  bFormCheckboxGroup as bCheckboxGroup,
  bFormCheckboxGroup as bCheckGroup
};

const VuePlugin = {
  install(Vue) {
    for (var component in components) {
      Vue.component(component, components[component]);
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
