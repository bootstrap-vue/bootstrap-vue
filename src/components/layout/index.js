import bContainer from './container';
import bRow from './row';
import bCol from './col';
import bFormRow from '../form/form-row';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bContainer,
  bRow,
  bCol,
  bFormRow
};

const VuePlugin = {
  install(Vue) {
    if (!registerComponent(Vue, 'layout')) {
      for (var component in components) {
        Vue.component(component, components[component]);
      }
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
