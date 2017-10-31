import bMedia from './media';
import bMediaAside from './media-aside';
import bMediaBody from './media-body';

const VuePlugin = {
  install(Vue) {
    Vue.component(bMedia);
    Vue.component(bMediaAside);
    Vue.component(bMediaBody);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
