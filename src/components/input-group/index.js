import { registerComponents, vueUse } from '../../utils/plugins'

import BInputGroup from './input-group'
import BInputGroupAddon from './input-group-addon'
import BInputGroupPrepend from './input-group-prepend'
import BInputGroupAppend from './input-group-append'
import BInputGroupText from './input-group-text'

const components = {
  BInputGroup,
  BInputGroupAddon,
  BInputGroupPrepend,
  BInputGroupAppend,
  BInputGroupText
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
