import bInputGroup `./input-group.vue`;
import bInputGroupAddon `./input-group-addon`;
import bInputGroupButton `./input-group-button`;

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
