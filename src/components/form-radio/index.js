import bFormRadio from './form-radio.vue';
import bFormRadioGroup from './form-radio-group.vue';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bFormRadio,
  bFormRadio as bRadio,
  bFormRadioGroup,
  bFormRadioGroup as bRadioGroup
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
