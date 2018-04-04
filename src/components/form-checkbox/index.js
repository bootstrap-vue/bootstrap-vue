import bFormCheckbox from './form-checkbox'
import bFormCheckboxGroup from './form-checkbox-group'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bFormCheckbox,
  bCheckbox: bFormCheckbox,
  bCheck: bFormCheckbox,
  bFormCheckboxGroup,
  bCheckboxGroup: bFormCheckboxGroup,
  bCheckGroup: bFormCheckboxGroup
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
