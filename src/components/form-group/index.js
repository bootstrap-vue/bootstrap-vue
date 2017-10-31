import bFormGroup from './form-group.vue';

const VuePlugin = {
  install(Vue) {
    Vue.component(bFormGroup);
    Vue.component(bFormGroup as bFormFieldset);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
