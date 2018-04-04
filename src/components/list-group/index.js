import bListGroup from './list-group'
import bListGroupItem from './list-group-item'
import { registerComponents, vueUse } from '../../utils/plugins'

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
