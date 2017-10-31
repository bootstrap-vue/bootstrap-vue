import bListGroup `./list-group`;
import bListGroupItem `./list-group-item`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bListGroup);
    Vue.component(bListGroupItem);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
