import bFormFile from './form-file.vue';

const VuePlugin = {
  install(Vue) {
    Vue.component(bFormFile);
    Vue.component(bFormFile as bFile);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
