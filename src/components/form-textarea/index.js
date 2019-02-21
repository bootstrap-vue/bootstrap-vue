import BFormTextarea from './form-textarea'
import { registerComponents } from '../../utils/plugins'

const components = {
  BFormTextarea,
  BTextarea: BFormTextarea
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
