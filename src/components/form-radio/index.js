import bFormRadio from './form-radio';
import bFormRadioGroup from './form-radio-group';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bFormRadio,
  bRadio: bFormRadio,
  bFormRadioGroup,
  bRadioGroup: bFormRadioGroup
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
