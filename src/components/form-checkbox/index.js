import { BFormCheckbox } from './form-checkbox'
import { BFormCheckboxGroup } from './form-checkbox-group'
import { pluginFactory } from '../../utils/plugins'

const FormCheckboxPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormCheckbox,
    BCheckbox: BFormCheckbox,
    BCheck: BFormCheckbox,
    BFormCheckboxGroup,
    BCheckboxGroup: BFormCheckboxGroup,
    BCheckGroup: BFormCheckboxGroup
  }
})

export { FormCheckboxPlugin, BFormCheckbox, BFormCheckboxGroup }
