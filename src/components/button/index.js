import bButton `./button`;
import bButtonClose `./button-close`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bButton);
    Vue.component(bButton as bBtn);
    Vue.component(bButtonClose);
    Vue.component(bButtonClose as bBtnClose);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
