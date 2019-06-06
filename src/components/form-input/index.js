import BFormInput from './form-input'
import { pluginFactory } from '../../utils/plugins'

const FormInputPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormInput,
    BInput: BFormInput
  }
})

export { BFormInput }

export default FormInputPlugin
