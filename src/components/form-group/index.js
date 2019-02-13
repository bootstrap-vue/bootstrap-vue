import BFormGroup from './form-group'
import { registerComponents } from '../../utils/plugins'

const components = {
  BFormGroup,
  BFormFieldset: BFormGroup
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
