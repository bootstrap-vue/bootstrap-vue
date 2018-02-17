import bDropdown from './dropdown'
import bDropdownItem from './dropdown-item'
import bDropdownItemButton from './dropdown-item-button'
import bDropdownHeader from './dropdown-header'
import bDropdownDivider from './dropdown-divider'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bDropdown,
  bDd: bDropdown,
  bDropdownItem,
  bDdItem: bDropdownItem,
  bDropdownItemButton,
  bDropdownItemBtn: bDropdownItemButton,
  bDdItemButton: bDropdownItemButton,
  bDdItemBtn: bDropdownItemButton,
  bDropdownHeader,
  bDdHeader: bDropdownHeader,
  bDropdownDivider,
  bDdDivider: bDropdownDivider
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
