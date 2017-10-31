import bInputGroup from './input-group.vue';
import bInputGroupAddon from './input-group-addon';
import bInputGroupButton from './input-group-button';

const VuePlugin = {
  install(Vue) {
    Vue.component(bInputGroup);
    Vue.component(bInputGroupAddon);
    Vue.component(bInputGroupButton);
    Vue.component(bInputGroupButton as bInputGroupBtn);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
