import bFormCheckbox `./form-checkbox.vue`;
import bFormCheckboxGroup `./form-checkbox-group.vue`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bFormCheckbox);
    Vue.component(bFormCheckbox as bCheckbox);
    Vue.component(bFormCheckbox as bCheck);
    Vue.component(bFormCheckboxGroup);
    Vue.component(bFormCheckboxGroup as bCheckboxGroup);
    Vue.component(bFormCheckboxGroup as bCheckGroup);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
