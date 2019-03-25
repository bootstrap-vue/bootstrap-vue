import BDropdown from './dropdown'
import BDropdownItem from './dropdown-item'
import BDropdownItemButton from './dropdown-item-button'
import BDropdownHeader from './dropdown-header'
import BDropdownDivider from './dropdown-divider'
import BDropdownForm from './dropdown-form'
import BDropdownText from './dropdown-text'
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
  BDdText: BDropdownText
}

export default {
  install: installFactory({ components })
}
