import bDropdown `./dropdown.vue`;
import bDropdownItem `./dropdown-item`;
import bDropdownItemButton `./dropdown-item-button`;
import bDropdownHeader `./dropdown-header`;
import bDropdownDivider `./dropdown-divider`;

const VuePlugin = {
  install(Vue) {
    Vue.component(bDropdown);
    Vue.component(bDd);
    Vue.component(bDropdownItem);
    Vue.component(bDdItem);
    Vue.component(bDropdownItemButton);
    Vue.component(bDropdownItemBtn);
    Vue.component(bDdItemButton);
    Vue.component(bDdItemBtn);
    Vue.component(bDropdownHeader);
    Vue.component(bDdHeader);
    Vue.component(bDropdownDivider);
    Vue.component(bDdDivider);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
};

export default VuePlugin;
