import bModal from './modal'
import { registerDirectives } from '../../utils/plugins'

const directives = {
  bModal
}

export default {
  install(Vue) {
    registerDirectives(Vue, directives)
  }
}
