import bButton from './button';
import bButtonClose from './button-close';

const VuePlugin = {
  install(Vue) {
    Vue.component(bButton);
    Vue.component({bBtn: bButton});
    Vue.component(bButtonClose);
    Vue.component({bBtnClose: bButtonClose});
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
