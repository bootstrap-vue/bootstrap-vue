import BDropdown from './dropdown'
import BDropdownItem from './dropdown-item'
import BDropdownItemButton from './dropdown-item-button'
import BDropdownHeader from './dropdown-header'
import BDropdownDivider from './dropdown-divider'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BDropdown,
  BDd: BDropdown,
  BDropdownItem,
  BDdItem: BDropdownItem,
  BDropdownItemButton,
  BDropdownItemBtn: BDropdownItemButton,
  BDdItemButton: BDropdownItemButton,
  BDdItemBtn: BDropdownItemButton,
  BDropdownHeader,
  BDdHeader: BDropdownHeader,
  BDropdownDivider,
  BDdDivider: BDropdownDivider
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
