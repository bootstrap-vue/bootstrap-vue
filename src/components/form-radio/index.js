import { BFormRadio } from './form-radio'
import { BFormRadioGroup } from './form-radio-group'
import { pluginFactory } from '../../utils/plugins'

const FormRadioPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormRadio,
    BRadio: BFormRadio,
    BFormRadioGroup,
    BRadioGroup: BFormRadioGroup
  }
})

export { FormRadioPlugin, BFormRadio, BFormRadioGroup }
