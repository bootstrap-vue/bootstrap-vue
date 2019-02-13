import bTooltip from './tooltip'
import { registerDirectives, vueUse } from '../../utils/plugins'

const directives = {
  bTooltip
}

export default {
  install(Vue) {
    registerDirectives(Vue, directives)
  }
}
