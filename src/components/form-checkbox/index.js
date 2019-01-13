import BFormCheckbox from './form-checkbox'
import BFormCheckboxGroup from './form-checkbox-group'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BFormCheckbox,
  BCheckbox: BFormCheckbox,
  BCheck: BFormCheckbox,
  BFormCheckboxGroup,
  BCheckboxGroup: BFormCheckboxGroup,
  BCheckGroup: BFormCheckboxGroup
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
