import bTooltip from './tooltip';
import { registerDirective } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const directives = {
  bTooltip
};

const VuePlugin = {
  install(Vue) {
    if (!registerDirective(Vue, 'tooltip')) {
      for (var directive in directives) {
        Vue.directive(directive, directives[directive]);
      }
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
