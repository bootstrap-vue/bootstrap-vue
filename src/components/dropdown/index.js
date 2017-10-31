import bDropdown `./dropdown.vue`;
import bDropdownItem `./dropdown-item`;
import bDropdownItemButton `./dropdown-item-button`;
import bDropdownHeader `./dropdown-header`;
import bDropdownDivider `./dropdown-divider`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bDropdown);
    Vue.component(bDropdown as bDd);
    Vue.component(bDropdownItem);
    Vue.component(bDropdownItem as bDdItem);
    Vue.component(bDropdownItemButton);
    Vue.component(bDropdownItemButton as bDropdownItemBtn);
    Vue.component(bDropdownItemButton as bDdItemButton);
    Vue.component(bDropdownItemButton as bDdItemBtn);
    Vue.component(bDropdownHeader);
    Vue.component(bDropdownHeader as bDdHeader);
    Vue.component(bDropdownDivider);
    Vue.component(bDropdownDivider as bDdDivider);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
