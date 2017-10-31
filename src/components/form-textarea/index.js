import bFormTextarea `./form-textarea.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bFormTextarea);
    Vue.component(bFormTextarea as bTextarea);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
