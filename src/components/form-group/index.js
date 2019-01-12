import BFormGroup from './form-group'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BFormGroup,
  BFormFieldset: BFormGroup
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
