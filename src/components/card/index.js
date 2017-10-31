import bCard `./card.vue`;
import bCardHeader `./card-header.vue`;
import bCardBody `./card-body.vue`;
import bCardFooter `./card-footer.vue`;
import bCardImg `./card-img.vue`;
import bCardGroup `./card-group.vue`;

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
