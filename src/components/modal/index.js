import bModal from './modal.vue';
import modalPlugin from '../../directives/modal';

const VuePlugin = {
  install(Vue) {
    Vue.component(bModal);
    Vue.use(modalPlugin);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin
