import bBreadcrumb `./breadcrumb`;
import bBreadcrumbItem `./breadcrumb-item`;
import bBreadcrumbLink `./breadcrumb-link`;

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
