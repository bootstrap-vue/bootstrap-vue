import BButtonGroup from './button-group'
import { registerComponents } from '../../utils/plugins'

const components = {
  BButtonGroup,
  BBtnGroup: BButtonGroup
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
