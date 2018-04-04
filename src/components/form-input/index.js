import bFormInput from './form-input'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bFormInput,
  bInput: bFormInput
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
