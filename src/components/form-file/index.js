import { BFormFile } from './form-file'
import { pluginFactory } from '../../utils/plugins'

const FormFilePlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormFile,
    BFile: BFormFile
  }
})

export { FormFilePlugin, BFormFile }

export default FormFilePlugin
