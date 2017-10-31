import bButton from './button';
import bButtonClose from './button-close';

const components = {
  bButton,
  bButton as bBtn,
  bButtonClose,
  bButtonClose as bBtnClose
};

const VuePlugin = {
  install(Vue) {
    for (var component in components) {
      Vue.component(component, components[component]);
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePlugin);
};

export default VuePlugin;
