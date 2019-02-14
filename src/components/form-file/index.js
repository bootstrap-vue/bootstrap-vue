import BFormFile from './form-file'
import { registerComponents } from '../../utils/plugins'

const components = {
  BFormFile,
  BFile: BFormFile
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
