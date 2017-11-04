import bModal from './modal';
import { registerDirective, vueUse } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const directives = {
  bModal
};

const VuePlugin = {
  install(Vue) {
    for (var directive in directives) {
      registerDirective(Vue, directive, directives[directive]);
    }
  }
};

vueUse(VuePlugin);

export default VuePlugin;
