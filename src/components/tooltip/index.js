import bTooltip from `./tooltip.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bTooltip);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
