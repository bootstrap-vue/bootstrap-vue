import BFormFile from './form-file'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BFormFile,
  BFile: BFormFile
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
