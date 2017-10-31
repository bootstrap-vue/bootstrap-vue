import bButtonGroup from './button-group';

const VuePlugin = {
  install(Vue) {
    Vue.component(bButtonGroup);
    Vue.component({bBtnGroup: bButtonGroup});
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
