import bFormGroup from './form-group.vue';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bFormGroup,
  bFormFieldSet: bFormGroup
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
