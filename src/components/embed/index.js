import bEmbed `./embed`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bEmbed);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
