import BListGroup from './list-group'
import BListGroupItem from './list-group-item'
import { registerComponents } from '../../utils/plugins'

const components = {
  BListGroup,
  BListGroupItem
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
