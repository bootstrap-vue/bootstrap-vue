import bButtonToolbar from './button-toolbar.vue';

const components = {
  bButtonToolbar,
  bButtonToolbar as bBtnToolbar
};

const VuePlugin = {
  install(Vue) {
    for (var component in components) {
      Vue.component(component, components[component]);
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePlugin);
};

export default VuePlugin;
