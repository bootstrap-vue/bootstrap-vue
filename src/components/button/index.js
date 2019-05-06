import BButton from './button'
import BButtonClose from './button-close'
import { installFactory } from '../../utils/plugins'

const components = {
  BButton,
  BBtn: BButton,
  BButtonClose,
  BBtnClose: BButtonClose
}

const ButtonPlugin = {
  install: installFactory({ components })
}

export {
  // Plugins
  ButtonPlugin,
  // Compoents
  BButton,
  BButtonClose
}

// Legacy: default is plugin
export default ButtonPlugin
