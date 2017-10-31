import bCard `./card`;
import bCardHeader `./card-header`;
import bCardBody `./card-body`;
import bCardFooter `./card-footer`;
import bCardImg `./card-img`;
import bCardGroup `./card-group`;

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
