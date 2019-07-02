import { BNavbar } from './navbar'
import { BNavbarNav } from './navbar-nav'
import { BNavbarBrand } from './navbar-brand'
import { BNavbarToggle } from './navbar-toggle'
import { NavPlugin } from '../nav'
import { CollapsePlugin } from '../collapse'
import { DropdownPlugin } from '../dropdown'
import { pluginFactory } from '../../utils/plugins'

const NavbarPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
    BNavToggle: BNavbarToggle
  },
  plugins: {
    NavPlugin,
    CollapsePlugin,
    DropdownPlugin
  }
})

export { NavbarPlugin, BNavbar, BNavbarNav, BNavbarBrand, BNavbarToggle }
