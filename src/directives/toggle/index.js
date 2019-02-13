import bToggle from './toggle'
import { registerDirectives, vueUse } from '../../utils/plugins'

const directives = {
  bToggle
}

export default {
  install(Vue) {
    registerDirectives(Vue, directives)
  }
}
