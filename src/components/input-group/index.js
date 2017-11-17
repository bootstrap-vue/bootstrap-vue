import bInputGroup from './input-group'
import bInputGroupAddon from './input-group-addon'
import bInputGroupButton from './input-group-button'
import { registerComponents, vueUse } from '../../utils'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bInputGroup,
  bInputGroupAddon,
  bInputGroupButton,
  bInputGroupBtn: bInputGroupButton
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
