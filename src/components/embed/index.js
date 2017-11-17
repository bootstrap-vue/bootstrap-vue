import bEmbed from './embed'
import { registerComponents, vueUse } from '../../utils'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bEmbed
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
