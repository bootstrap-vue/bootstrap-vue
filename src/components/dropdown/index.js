import bDropdown from './dropdown.vue';
import bDropdownItem from './dropdown-item';
import bDropdownItemButton from './dropdown-item-button';
import bDropdownHeader from './dropdown-header';
import bDropdownDivider from './dropdown-divider';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bDropdown,
  bDropdown as bDd,
  bDropdownItem,
  bDropdownItem as bDdItem,
  bDropdownItemButton,
  bDropdownItemButton as bDropdownItemBtn,
  bDropdownItemButton as bDdItemButton,
  bDropdownItemButton as bDdItemBtn,
  bDropdownHeader,
  bDropdownHeader as bDdHeader,
  bDropdownDivider,
  bDropdownDivider as bDdDivider
};

const VuePlugin = {
  install(Vue) {
    for (var component in components) {
      Vue.component(component, components[component]);
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
