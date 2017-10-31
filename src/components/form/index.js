import bForm from './form.vue';
import bFormRow from './form-row';
import bFormText from './form-text';
import bFormFeedback from './form-feedback';

const VuePlugin = {
  install(Vue) {
    Vue.component(bForm);
    Vue.component(bFormRow);
    Vue.component(bFormText);
    Vue.component(bFormFeedback);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
