import bAlert from './alert'
import { registerComponents, vueUse } from '../../utils'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bAlert
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
