import bContainer from './container'
import bRow from './row'
import bCol from './col'
import bFormRow from './form-row'
import { registerComponents, vueUse } from '../../utils'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bContainer,
  bRow,
  bCol,
  bFormRow
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
