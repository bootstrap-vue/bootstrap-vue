import bFormSelect from './form-select.vue';

const VuePlugin = {
  install(Vue) {
    Vue.component(bFormSelect);
    Vue.component(bFormSelect as bSelect);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
