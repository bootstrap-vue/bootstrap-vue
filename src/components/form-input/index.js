import BFormInput from './form-input'
import { registerComponents } from '../../utils/plugins'

const components = {
  BFormInput,
  BInput: BFormInput
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
