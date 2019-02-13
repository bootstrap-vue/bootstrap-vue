import bScrollspy from './scrollspy'
import { registerDirectives } from '../../utils/plugins'

const directives = {
  bScrollspy
}

export default {
  install(Vue) {
    registerDirectives(Vue, directives)
  }
}
