import bProgress from `./progress.vue`;
import bProgressBar from `./progress-bar.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bProgress);
    Vue.component(bProgressBar);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
