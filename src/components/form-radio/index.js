import bFormRadio from './form-radio'
import bFormRadioGroup from './form-radio-group'
import { registerComponents, vueUse } from '../../utils'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

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
