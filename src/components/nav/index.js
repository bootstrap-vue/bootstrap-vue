import bNav `./nav`;
import bNavItem `./nav-item`;
import bNavText `./nav-text`;
import bNavForm `./nav-form`;
import bNavToggle `./nav-toggle.vue`;
import bNavItemDropdown `./nav-item-dropdown.vue`;
import dropdownPlugin `.../dropdown`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bNav);
    Vue.component(bNavItem);
    Vue.component(bNavText);
    Vue.component(bNavForm);
    Vue.component(bNavToggle);
    Vue.component(bNavItemDropdown);
    Vue.component(bNavItemDropdown as bNavItemDd);
    Vue.use(dropdownPlugin);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
