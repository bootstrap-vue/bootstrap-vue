import bAlert `./alert.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bAlert);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
