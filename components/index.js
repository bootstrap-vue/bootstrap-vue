import bAlert from './alert.vue'
import bBreadcrumb from './breadcrumb.vue'
import bButtonCheckbox from './button-checkbox.vue'
import bButtonGroup from './button-group.vue'
import bButtonRadio from './button-radio.vue'
import bButton from './button.vue'
import bCard from './card.vue'
import {slide, carousel} from './carousel.vue'
import {collapse, collapseToggle} from './collapse.vue'
import bDropdown from './dropdown.vue'
import bDropdownSelect from './dropdown-select.vue'
import bFormCheckbox from './form-checkbox.vue'
import bFormRadio from './form-radio.vue'
import bFormInput from './form-input.vue'
import bFormSelect from './form-select.vue'
import bFormTextarea from './form-textarea.vue'
import bJumbotron from './jumbotron.vue'
import bTags from './tags.vue'
import {listGroup, listGroupItem} from './list-group.vue'
import bMedia from './media.vue'
import bModal from './modal.vue'
import {nav, navItem} from './nav.vue'
import bNavbar from './navbar.vue'
import bPagination from './pagination.vue'
import bPopover from './popover.vue'
import bProgress from './progress.vue'
import bTables from './tables.vue'
import {tab, tabs} from './tabs.vue'
import bTooltip from './tooltip.vue'

var components = {
  bAlert,
  bBreadcrumb,
  bButtonCheckbox,
  bButtonGroup,
  bButtonRadio,
  bButton,
  bCard,
  bDropdown,
  bDropdownSelect,
  bFormCheckbox,
  bFormRadio,
  bFormInput,
  bFormSelect,
  bFormTextarea,
  bJumbotron,
  bTags,
  bMedia,
  bModal,
  bNavbar,
  bPagination,
  bPopover,
  bProgress,
  bTables,
  bTooltip,
  bTab: tab,
  bTabs: tabs,
  bNav: nav,
  bNavItem: navItem,
  bListGroup: listGroup,
  bListGroupItem: listGroupItem,
  bSlide: slide,
  bCarousel: carousel,
  bCollapseToggle: collapseToggle,
  bCollapse: collapse,
};

function setup(Vue) {

  if (setup.installed) {
    return;
  }

  Object.keys(components).forEach(function (key) {
    Vue.component(key, components[key]);
  });

}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(setup);
}

module.exports=setup;
