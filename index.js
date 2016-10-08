import bAlert from './components/alert'
import bBreadcrumb from './components/breadcrumb'
import bButtonCheckbox from './components/button-checkbox'
import bButtonGroup from './components/button-group'
import bButtonRadio from './components/button-radio'
import bButton from './components/button.vue'
import bCard from './components/card'
import {slide, carousel} from './components/carousel'
import {collapse, collapseToggle} from './components/collapse'
import bDropdown from './components/dropdown'
import bDropdownSelect from './components/dropdown-select'
import bFormCheckbox from './components/form-checkbox'
import bFormRadio from './components/form-radio'
import bFormInput from './components/form-input'
import bFormSelect from './components/form-select'
import bFormTextarea from './components/form-textarea'
import bJumbotron from './components/jumbotron'
import bTags from './components/tags'
import {listGroup, listGroupItem} from './components/list-group'
import bMedia from './components/media'
import bModal from './components/modal'
import {nav, navItem} from './components/nav'
import bNavbar from './components/navbar'
import bPagination from './components/pagination'
import bPopover from './components/popover'
import bProgress from './components/progress'
import bTables from './components/tables'
import {tab, tabs} from './components/tabs'
import bTooltip from './components/tooltip'

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
  Object.keys(components).forEach(function (key) {
    Vue.component(key, components[key]);
  })
}

export {setup};
export default components;
