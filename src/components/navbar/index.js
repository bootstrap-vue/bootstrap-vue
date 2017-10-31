import bNavbar from `./navbar`;
import bNavbarNav from `./navbar-nav`;
import bNavbarBrand from `./navbar-brand`;
import navPlugin from  '../nav';

const VuePlugin = {
  install(Vue) {
    Vue.component(bNavbar);
    Vue.component(bNavbarNav);
    Vue.component(bNavbarBrand);
    Vue.use(navPlugin);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
