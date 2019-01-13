import BListGroup from './list-group'
import BListGroupItem from './list-group-item'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BListGroup,
  BListGroupItem
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
