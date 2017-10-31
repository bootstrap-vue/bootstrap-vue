import bToggle from './toggle';

const VuePlugin = {
  install(Vue) {
    Vue.directive(bToggle);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
