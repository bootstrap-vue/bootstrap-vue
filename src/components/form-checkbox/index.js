import BFormCheckbox from './form-checkbox'
import BFormCheckboxGroup from './form-checkbox-group'
import { registerComponents } from '../../utils/plugins'

const components = {
  BFormCheckbox,
  BCheckbox: BFormCheckbox,
  BCheck: BFormCheckbox,
  BFormCheckboxGroup,
  BCheckboxGroup: BFormCheckboxGroup,
  BCheckGroup: BFormCheckboxGroup
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
