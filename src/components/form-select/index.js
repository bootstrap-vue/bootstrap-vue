import { BFormSelect } from './form-select'
import { pluginFactory } from '../../utils/plugins'

const FormSelectPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormSelect,
    BSelect: BFormSelect
  }
})

export { FormSelectPlugin, BFormSelect }

export default FormSelectPlugin
