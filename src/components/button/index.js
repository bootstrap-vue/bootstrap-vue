import BButton from './button'
import BButtonClose from './button-close'
import { pluginFactory } from '../../utils/plugins'

const ButtonPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BButton,
    BBtn: BButton,
    BButtonClose,
    BBtnClose: BButtonClose
  }
})

export { BButton, BButtonClose }

export default ButtonPlugin
