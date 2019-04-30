import BButton from './button'
import BButtonClose from './button-close'
import { installFactory } from '../../utils/plugins'

const components = {
  BButton,
  BBtn: BButton,
  BButtonClose,
  BBtnClose: BButtonClose
}

export { BButton, BButtonClose }

export default {
  install: installFactory({ components })
}
