import bPaginationNav from `./pagination-nav`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bPaginationNav);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
