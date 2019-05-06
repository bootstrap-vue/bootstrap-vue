import BDropdown from './dropdown'
import BDropdownItem from './dropdown-item'
import BDropdownItemButton from './dropdown-item-button'
import BDropdownHeader from './dropdown-header'
import BDropdownDivider from './dropdown-divider'
import BDropdownForm from './dropdown-form'
import BDropdownText from './dropdown-text'
import BDropdownGroup from './dropdown-group'
import { installFactory } from '../../utils/plugins'

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
  BDdDivider: BDropdownDivider,
  BDropdownForm,
  BDdForm: BDropdownForm,
  BDropdownText,
  BDdText: BDropdownText,
  BDropdownGroup,
  BDdGroup: BDropdownGroup
}

const DropdownPlugin = {
  install: installFactory({ components })
}

export {
  // Plugins
  DropdownPlugin,
  // Components
  BDropdown,
  BDropdownItem,
  BDropdownItemButton,
  BDropdownHeader,
  BDropdownDivider,
  BDropdownForm,
  BDropdownText,
  BDropdownGroup
}

// Legacy: default is plugin
export default DropdownPlugin
