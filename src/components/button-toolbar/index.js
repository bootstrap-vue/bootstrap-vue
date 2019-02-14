import BButtonToolbar from './button-toolbar'
import { registerComponents } from '../../utils/plugins'

const components = {
  BButtonToolbar,
  BBtnToolbar: BButtonToolbar
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
