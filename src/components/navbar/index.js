import BNavbar from './navbar'
import BNavbarNav from './navbar-nav'
import BNavbarBrand from './navbar-brand'
import BNavbarToggle from './navbar-toggle'
import Nav from '../nav'
import Collapse from '../collapse'
import Dropdown from '../dropdown'
import { installFactory } from '../../utils/plugins'

const components = {
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BNavToggle: BNavbarToggle
}

const plugins = {
  Nav,
  Collapse,
  Dropdown
}

export default {
  install: installFactory({ components, plugins })
}
