import bButton from './button';
import bButtonClose from './button-close';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bButton,
  bBtn: bButton,
  bButtonClose,
  bBtnClose: bButtonClose
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
