import bMedia `./media`;
import bMediaAside `./media-aside`;
import bMediaBody `./media-body`;

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
