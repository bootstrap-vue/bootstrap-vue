import BNav from './nav'
import BNavItem from './nav-item'
import BNavText from './nav-text'
import BNavForm from './nav-form'
import BNavItemDropdown from './nav-item-dropdown'
import DropdownPlugin from '../dropdown'
import { installFactory } from '../../utils/plugins'

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

const plugins = {
  DropdownPlugin
}

export { BNav, BNavItem, BNavText, BNavForm, BNavItemDropdown }

export default {
  install: installFactory({ components, plugins })
}
