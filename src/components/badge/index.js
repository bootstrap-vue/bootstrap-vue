import bBadge `./badge`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bBadge);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
