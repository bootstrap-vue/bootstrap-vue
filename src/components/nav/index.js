import BNav from './nav'
import BNavItem from './nav-item'
import BNavText from './nav-text'
import BNavForm from './nav-form'
import BNavItemDropdown from './nav-item-dropdown'
import dropdownPlugin from '../dropdown'
import { registerComponents } from '../../utils/plugins'

const components = {
  BNav,
  BNavItem,
  BNavText,
  BNavForm,
  BNavItemDropdown,
  BNavItemDd: BNavItemDropdown,
  BNavDropdown: BNavItemDropdown,
  BNavDd: BNavItemDropdown
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
    Vue.use(dropdownPlugin)
  }
}
