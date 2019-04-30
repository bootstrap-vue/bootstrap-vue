import BFormCheckbox from './form-checkbox'
import BFormCheckboxGroup from './form-checkbox-group'
import { installFactory } from '../../utils/plugins'

const components = {
  BFormCheckbox,
  BCheckbox: BFormCheckbox,
  BCheck: BFormCheckbox,
  BFormCheckboxGroup,
  BCheckboxGroup: BFormCheckboxGroup,
  BCheckGroup: BFormCheckboxGroup
}

export { BFormCheckbox, BFormCheckboxGroup }

export default {
  install: installFactory({ components })
}
