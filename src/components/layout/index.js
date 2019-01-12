import BContainer from './container'
import BRow from './row'
import BCol from './col'
import BFormRow from './form-row'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BContainer,
  BRow,
  BCol,
  BFormRow
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
