import { registerComponents, vueUse } from '../../utils/plugins'

import bInputGroup from './input-group'
import bInputGroupAddon from './input-group-addon'
import bInputGroupPrepend from './input-group-prepend'
import bInputGroupAppend from './input-group-append'
import bInputGroupText from './input-group-text'

const components = {
  bInputGroup,
  bInputGroupAddon,
  bInputGroupPrepend,
  bInputGroupAppend,
  bInputGroupText
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
