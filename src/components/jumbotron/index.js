import bJumbotron `./jumbotron`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bJumbotron);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
