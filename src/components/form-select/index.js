import { BFormSelect } from './form-select'
import { BFormSelectOption } from './form-select-option'
import { BFormSelectOptionGroup } from './form-select-option-group'
import { pluginFactory } from '../../utils/plugins'

const FormSelectPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormSelect,
    BFormSelectOption,
    BFormSelectOptionGroup,
    BSelect: BFormSelect,
    BSelectOption: BFormSelectOption,
    BSelectOptionGroup: BFormSelectOptionGroup
  }
})

export { FormSelectPlugin, BFormSelect, BFormSelectOption, BFormSelectOptionGroup }
