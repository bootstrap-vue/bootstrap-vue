import bBreadcrumb from './breadcrumb';
import bBreadcrumbItem from './breadcrumb-item';
import bBreadcrumbLink from './breadcrumb-link';

const VuePlugin = {
  install(Vue) {
    Vue.component(bBreadcrumb);
    Vue.component(bBreadcrumbItem);
    Vue.component(bBreadcrumbLink);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
