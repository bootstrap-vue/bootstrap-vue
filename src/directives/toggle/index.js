import bToggle from './toggle';
import { registerDirective } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const directives = {
  bToggle
};

const VuePlugin = {
  install(Vue) {
    for (var directive in directives) {
      if (!registerDirective(Vue, directive)) {
        Vue.directive(directive, directives[directive]);
      }
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
