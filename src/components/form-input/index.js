import BFormInput from './form-input'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BFormInput,
  BInput: BFormInput
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
