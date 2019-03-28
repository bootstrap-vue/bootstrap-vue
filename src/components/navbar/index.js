import BNavbar from './navbar'
import BNavbarNav from './navbar-nav'
import BNavbarBrand from './navbar-brand'
import BNavbarToggle from './navbar-toggle'
import NavPlugin from '../nav'
import CollapsePlugin from '../collapse'
import DropdownPlugin from '../dropdown'
import { installFactory } from '../../utils/plugins'

const components = {
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BNavToggle: BNavbarToggle
}

const plugins = {
  NavPlugin,
  CollapsePlugin,
  DropdownPlugin
}

export default {
  install: installFactory({ components, plugins })
}
