import bListGroup from './list-group';
import bListGroupItem from './list-group-item';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bListGroup,
  bListGroupItem
};

const VuePlugin = {
  install(Vue) {
    if (!registerComponent(Vue, 'list-group')) {
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
