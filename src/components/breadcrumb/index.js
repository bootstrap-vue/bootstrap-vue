import bBreadcrumb from './breadcrumb';
import bBreadcrumbItem from './breadcrumb-item';
import bBreadcrumbLink from './breadcrumb-link';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bBreadcrumb,
  bBreadcrumbItem,
  bBreadcrumbLink
};

const VuePlugin = {
  install(Vue) {
    for (var component in components) {
      if (!registerComponent(Vue, component)) {
        Vue.component(component, components[component]);
      }
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
