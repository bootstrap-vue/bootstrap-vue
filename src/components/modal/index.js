import bModal from './modal'
import modalPlugin from '../../directives/modal'
import { registerComponents, vueUse } from '../../utils'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bModal
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
    Vue.use(modalPlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
