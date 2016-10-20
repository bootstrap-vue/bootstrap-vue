import bAlert from './alert.vue'
import bBreadcrumb from './breadcrumb.vue'
import bButtonCheckbox from './button-checkbox.vue'
import bButtonGroup from './button-group.vue'
import bButtonRadio from './button-radio.vue'
import bButton from './button.vue'
import bCard from './card.vue'
import carousel from './carousel.vue'
import carouselSlide from './carousel.vue'
import collapse from './collapse.vue'
import collapseToggle from './collapse-toggle.vue'
import bDropdown from './dropdown.vue'
import bDropdownSelect from './dropdown-select.vue'
import bFormCheckbox from './form-checkbox.vue'
import bFormRadio from './form-radio.vue'
import bFormInput from './form-input.vue'
import bFormSelect from './form-select.vue'
import bFormTextarea from './form-textarea.vue'
import bJumbotron from './jumbotron.vue'
import bTags from './tags.vue'
import listGroup from './list-group.vue'
import listGroupItem from './list-group-item.vue'
import bMedia from './media.vue'
import bModal from './modal.vue'
import nav from './nav.vue'
import navItem from './nav-item.vue'
import bNavbar from './navbar.vue'
import bPagination from './pagination.vue'
import bPopover from './popover.vue'
import bProgress from './progress.vue'
import bTables from './tables.vue'
import tabs from './tabs.vue'
import tab from './tab.vue'
import bTooltip from './tooltip.vue'

var components = {
  bAlert,
  bBreadcrumb,
  bButtonCheckbox,
  bButtonGroup,
  bButtonRadio,
  bButton,
  bBtn: bButton,
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

  bListGroupItem: listGroupItem,
  bListGroup: listGroup,

  bCarouselSlide: carouselSlide,
  bCarousel: carousel,

  bCollapse: collapse,
  bCollapseToggle: collapseToggle,
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

module.exports = setup;
