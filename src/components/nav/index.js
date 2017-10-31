import bNav from './nav';
import bNavItem from './nav-item';
import bNavText from './nav-text';
import bNavForm from './nav-form';
import bNavToggle from './nav-toggle.vue';
import bNavItemDropdown from './nav-item-dropdown.vue';
import dropdownPlugin from '../dropdown';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bNav,
  bNavItem,
  bNavTtext,
  bNavForm,
  bNavToggle,
  bNavItemDropdown,
  bNavItemDd: bNavItemDropdown,
  bNavDropdown: bNavItemDropdown,
  bNavDd: bNavItemDropdown
};

const VuePlugin = {
  install(Vue) {
    for (var component in components) {
      Vue.component(component, components[component]);
    }
    Vue.use(dropdownPlugin);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
