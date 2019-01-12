import BButton from './button'
import BButtonClose from './button-close'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BButton,
  BBtn: BButton,
  BButtonClose,
  BBtnClose: BButtonClose
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
