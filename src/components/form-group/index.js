import { BFormGroup } from './form-group'
import { pluginFactory } from '../../utils/plugins'

const FormGroupPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormGroup,
    BFormFieldset: BFormGroup
  }
})

export { FormGroupPlugin, BFormGroup }
