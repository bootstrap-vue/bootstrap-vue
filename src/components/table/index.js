import bTable from `./table.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bTable);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
