import bFormGroup from './form-group'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bFormGroup,
  bFormFieldset: bFormGroup
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
