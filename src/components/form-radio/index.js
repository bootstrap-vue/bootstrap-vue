import bFormRadio `./form-radio.vue`;
import bFormRadioGroup `./form-radio-group.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bFormRadio);
    Vue.component(bFormRadio as bRadio);
    Vue.component(bFormRadioGroup);
    Vue.component(bFormRadioGroup as bRadioGroup);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
