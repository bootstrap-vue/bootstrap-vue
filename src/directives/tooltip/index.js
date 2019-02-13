import bTooltip from './tooltip'
import { registerDirectives } from '../../utils/plugins'

const directives = {
  bTooltip
}

export default {
  install(Vue) {
    registerDirectives(Vue, directives)
  }
}
