import bAlert from './alert'
import bBreadcrumb from './breadcrumb'
import bButtonCheckbox from './button-checkbox'
import bButtonGroup from './button-group'
import bButtonRadio from './button-radio'
import bButton from './button'
import bCard from './card'
import carousel from './carousel'
import carouselSlide from './carousel'
import collapse from './collapse'
import collapseToggle from './collapse-toggle'
import bDropdown from './dropdown'
import bDropdownSelect from './dropdown-select'
import bFormCheckbox from './form-checkbox'
import bFormRadio from './form-radio'
import bFormInput from './form-input'
import bFormSelect from './form-select'
import bFormTextarea from './form-textarea'
import bJumbotron from './jumbotron'
import bTags from './tags'
import listGroup from './list-group'
import listGroupItem from './list-group-item'
import bMedia from './media'
import bModal from './modal'
import nav from './nav'
import navItem from './nav-item'
import navItemDropdown from './nav-item-dropdown'
import bNavbar from './navbar'
import bPagination from './pagination'
import bPopover from './popover'
import bProgress from './progress'
import bTables from './tables'
import tabs from './tabs'
import tab from './tab'
import bTooltip from './tooltip'


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
  bNavItemDropdown: navItemDropdown,

  bListGroupItem: listGroupItem,
  bListGroup: listGroup,

  bCarouselSlide: carouselSlide,
  bCarousel: carousel,

  bCollapse: collapse,
  bCollapseToggle: collapseToggle,
};

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  Object.keys(components).forEach(function (key) {
    Vue.component(key, components[key]);
  });

}

if (typeof window !== 'undefined') {
  if (window.Vue)
    window.Vue.use(plugin);
  //require('../styles/style.css');
}

module.exports = components;
module.exports.default = plugin;
