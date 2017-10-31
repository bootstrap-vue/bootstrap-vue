import bToggle from './toggle';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const directive = {
  bToggle
};

const VuePlugin = {
  install(Vue) {
    for (var directive in directives) {
      Vue.directive(directive, directives[directive]);
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
