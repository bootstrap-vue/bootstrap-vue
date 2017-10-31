import bTooltip from './tooltip';

const VuePlugin = {
  install(Vue) {
    Vue.directive(bTooltip);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
