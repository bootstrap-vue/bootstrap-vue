import bInputGroup from './input-group';
import bInputGroupAddon from './input-group-addon';
import bInputGroupButton from './input-group-button';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bInputGroup,
  bInputGroupAddon,
  bInputGroupButton,
  bInputGroupBtn: bInputGroupButton,
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
