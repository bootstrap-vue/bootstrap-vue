import { BFormTextarea } from './form-textarea'
import { pluginFactory } from '../../utils/plugins'

const FormTextareaPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormTextarea,
    BTextarea: BFormTextarea
  }
})

export { FormTextareaPlugin, BFormTextarea }

export default FormTextareaPlugin
