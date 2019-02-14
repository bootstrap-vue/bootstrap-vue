import BButton from './button'
import BButtonClose from './button-close'
import { registerComponents } from '../../utils/plugins'

const components = {
  BButton,
  BBtn: BButton,
  BButtonClose,
  BBtnClose: BButtonClose
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
