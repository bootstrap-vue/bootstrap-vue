import bLink from './link';

const VuePlugin = {
  install(Vue) {
    Vue.component(bLink);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
