import bButtonToolbar from './button-toolbar.vue';

const VuePlugin = {
  install(Vue) {
    Vue.component(bButtonToolbar);
    Vue.component(bButtonToolbar as bBtnToolbar);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
