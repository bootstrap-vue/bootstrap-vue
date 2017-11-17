import bScrollspy from './scrollspy'
import { registerDirectives, vueUse } from '../../utils'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const directives = {
  bScrollspy
}

const VuePlugin = {
  install (Vue) {
    registerDirectives(Vue, directives)
  }
}

vueUse(VuePlugin)

export default VuePlugin
