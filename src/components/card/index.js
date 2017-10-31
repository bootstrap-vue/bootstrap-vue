import bCard from './card';
import bCardHeader from './card-header';
import bCardBody from './card-body';
import bCardFooter from './card-footer';
import bCardImg from './card-img';
import bCardGroup from './card-group';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bCard,
  bCardHeader,
  bCardBody,
  bCardFooter,
  bCardImg,
  bCardGroup
};

const VuePlugin = {
  install(Vue) {
    if (!registerComponent(Vue, 'card')) {
      for (var component in components) {
        Vue.component(component, components[component]);
      }
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin
