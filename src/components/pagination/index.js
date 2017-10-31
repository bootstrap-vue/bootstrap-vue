import bPagination from `./pagination.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bPagination);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
