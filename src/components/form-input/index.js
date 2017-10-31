import bFormInput `./form-input.vue`;
import bFormInputStatic `./form-input-static.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bFormInput);
    Vue.component(bFormInput as bInput);
    Vue.component(bFormInputStatic);
    Vue.component(bFormInputStatic as bInputStatic);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
