import BFormTextarea from './form-textarea'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BFormTextarea,
  BTextarea: BFormTextarea
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
