import bCollapse `./collapse.vue`;
import togglePlugin from '../../directives/toggle';

const VuePlugin = {
  install(Vue) {
    Vue.component(bCollapse);
    Vue.use(togglePlugin);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
