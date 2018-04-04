import bFormSelect from './form-select'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bFormSelect,
  bSelect: bFormSelect
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
