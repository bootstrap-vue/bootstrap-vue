import bScrollspy from './scrollspy';

const VuePlugin = {
  install(Vue) {
    Vue.directive(bScrollspy);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
