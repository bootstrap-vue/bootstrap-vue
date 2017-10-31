import bModal `./modal`;

const VuePlugin = {
  install(Vue) {
    Vue.directive(bModal);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin
