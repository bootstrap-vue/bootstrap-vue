import bCard from './card';
import bCardHeader from './card-header';
import bCardBody from './card-body';
import bCardFooter from './card-footer';
import bCardImg from './card-img';
import bCardGroup from './card-group';

const VuePlugin = {
  install(Vue) {
    Vue.component(bCard);
    Vue.component(bCardHeader);
    Vue.component(bCardBody);
    Vue.component(bCardFooter);
    Vue.component(bCardImg);
    Vue.component(bCardGroup);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin
