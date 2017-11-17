import bListGroup from './list-group'
import bListGroupItem from './list-group-item'
import { registerComponents, vueUse } from '../../utils'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

const components = {
  bListGroup,
  bListGroupItem
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
