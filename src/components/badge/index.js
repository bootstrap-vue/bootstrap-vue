import bBadge from './badge';

const components = {
  bBadge
};

const VuePlugin = {
  install(Vue) {
    for (var copmponent in components) {
      Vue.component(component, components[component]);
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
