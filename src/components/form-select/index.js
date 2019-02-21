import BFormSelect from './form-select'
import { registerComponents } from '../../utils/plugins'

const components = {
  BFormSelect,
  BSelect: BFormSelect
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
