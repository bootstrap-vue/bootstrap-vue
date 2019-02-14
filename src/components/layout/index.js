import BContainer from './container'
import BRow from './row'
import BCol from './col'
import BFormRow from './form-row'
import { registerComponents } from '../../utils/plugins'

const components = {
  BContainer,
  BRow,
  BCol,
  BFormRow
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
