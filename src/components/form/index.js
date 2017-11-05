import bForm from './form';
import bFormRow from './form-row';
import bFormText from './form-text';
import bFormFeedback from './form-feedback';
import { registerComponents, vueUse } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bForm,
  bFormRow,
  bFormText,
  bFormFeedback
};

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components);
  }
};

vueUse(VuePlugin);

export default VuePlugin;
