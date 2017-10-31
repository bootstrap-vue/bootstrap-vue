import bForm from './form.vue';
import bFormRow from './form-row';
import bFormText from './form-text';
import bFormFeedback from './form-feedback';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bForm,
  bFormRow,
  bFormText,
  bFormFeedback
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
