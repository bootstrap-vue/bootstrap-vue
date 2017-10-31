import bContainer `./container`;
import bRow `./row`;
import bCol `./col`;
import bFormRow `../form/form-row`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bContainer);
    Vue.component(bRow);
    Vue.component(bCol);
    Vue.component(bFormRow);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
