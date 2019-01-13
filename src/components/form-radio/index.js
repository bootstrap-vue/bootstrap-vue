import BFormRadio from './form-radio'
import BFormRadioGroup from './form-radio-group'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BFormRadio,
  BRadio: BFormRadio,
  BFormRadioGroup,
  BRadioGroup: BFormRadioGroup
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
