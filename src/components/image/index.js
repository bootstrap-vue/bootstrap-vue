import bImg `./img`;
import bImgLazy `./img-lazy.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bImg);
    Vue.component(bImgLazy);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
