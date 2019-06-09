import { BFormTextarea } from './form-textarea'
import { pluginFactory } from '../../utils/plugins'

const FormTextareaPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormTextarea,
    BTextarea: BFormTextarea
  }
})

export { BFormTextarea }

export default FormTextareaPlugin
