import bNav from './nav';
import bNavItem from './nav-item';
import bNavText from './nav-text';
import bNavForm from './nav-form';
import bNavToggle from './nav-toggle.vue';
import bNavItemDropdown from './nav-item-dropdown.vue';
import dropdownPlugin from '.../dropdown';

const VuePlugin = {
  install(Vue) {
    Vue.component(bNav);
    Vue.component(bNavItem);
    Vue.component(bNavText);
    Vue.component(bNavForm);
    Vue.component(bNavToggle);
    Vue.component(bNavItemDropdown);
    Vue.component(bNavItemDropdown as bNavDropdown);
    Vue.component(bNavItemDropdown as bNavDd);
    Vue.component(bNavItemDropdown as bNavItemDd);
    Vue.use(dropdownPlugin);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
