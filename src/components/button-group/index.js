import bButtonGroup from './button-group';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bButtonGroup,
  bButtonGroup as bBtnGroup
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
