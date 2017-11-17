import bFormCheckbox from './form-checkbox'
import bFormCheckboxGroup from './form-checkbox-group'
import { registerComponents, vueUse } from '../../utils'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bFormCheckbox,
  bCheckbox: bFormCheckbox,
  bCheck: bFormCheckbox,
  bFormCheckboxGroup,
  bCheckboxGroup: bFormCheckboxGroup,
  bCheckGroup: bFormCheckboxGroup
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
