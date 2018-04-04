import bFormFile from './form-file'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bFormFile,
  bFile: bFormFile
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
