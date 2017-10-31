import bPopover from `./popover.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bPopover);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
