import bButton from './button'
import bButtonClose from './button-close'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bButton,
  bBtn: bButton,
  bButtonClose,
  bBtnClose: bButtonClose
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
