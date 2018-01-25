import bFormRadio from './form-radio'
import bFormRadioGroup from './form-radio-group'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bFormRadio,
  bRadio: bFormRadio,
  bFormRadioGroup,
  bRadioGroup: bFormRadioGroup
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
