import bTabs from `./tabs.vue`;
import bTab from `./tab.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bTabs);
    Vue.component(bTab);
    Vue.component(bTab as bTabPane);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
