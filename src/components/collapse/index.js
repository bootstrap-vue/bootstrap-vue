import bCollapse from './collapse'
import togglePlugin from '../../directives/toggle'
import { registerComponents, vueUse } from '../../utils'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bCollapse
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
    Vue.use(togglePlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
