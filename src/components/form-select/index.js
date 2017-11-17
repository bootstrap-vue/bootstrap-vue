import bFormSelect from './form-select';
import { registerComponents, vueUse } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bFormSelect,
  bSelect: bFormSelect
};

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components);
  }
};

vueUse(VuePlugin);

export default VuePlugin;
