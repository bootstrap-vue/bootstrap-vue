import bDropdown from './dropdown';
import bDropdownItem from './dropdown-item';
import bDropdownItemButton from './dropdown-item-button';
import bDropdownHeader from './dropdown-header';
import bDropdownDivider from './dropdown-divider';
import { registerComponent } from '../../utils';

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bDropdown,
  bDd: bDropdown,
  bDropdownItem,
  bDdItem: bDropdownItem,
  bDropdownItemButton,
  bDropdownItemBtn: bDropdownItemButton,
  bDdItemButton: bDropdownItemButton,
  bDdItemBtn: bDropdownItemButton,
  bDropdownHeader,
  bDdHeader: bDropdownHeader,
  bDropdownDivider,
  bDdDivider: bDropdownDivider
};

const VuePlugin = {
  install(Vue) {
    for (var component in components) {
      registerComponent(Vue, component, components[component]);
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
