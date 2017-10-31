import bContainer from './container';
import bRow from './row';
import bCol from './col';
import bFormRow from '../form/form-row';

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
