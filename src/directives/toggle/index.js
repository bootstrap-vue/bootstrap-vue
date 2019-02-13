import bToggle from './toggle'
import { registerDirectives } from '../../utils/plugins'

const directives = {
  bToggle
}

export default {
  install(Vue) {
    registerDirectives(Vue, directives)
  }
}
