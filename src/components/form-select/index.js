import BFormSelect from './form-select'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BFormSelect,
  BSelect: BFormSelect
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
