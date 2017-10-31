import bPopover from './popover';

const VuePlugin = {
  install(Vue) {
    Vue.directive(bPopover);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
