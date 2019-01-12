import BNavbar from './navbar'
import BNavbarNav from './navbar-nav'
import BNavbarBrand from './navbar-brand'
import BNavbarToggle from './navbar-toggle'
import navPlugin from '../nav'
import collapsePlugin from '../collapse'
import dropdownPlugin from '../dropdown'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BNavToggle: BNavbarToggle
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
    Vue.use(navPlugin)
    Vue.use(collapsePlugin)
    Vue.use(dropdownPlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
