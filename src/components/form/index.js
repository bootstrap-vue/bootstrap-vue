import bForm `./form.vue`;
import bFormRow `./form-row`;
import bFormText `./form-text`;
import bFormFeedback `./form-feedback`;

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
