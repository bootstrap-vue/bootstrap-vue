import { BButtonToolbar } from './button-toolbar'
import { pluginFactory } from '../../utils/plugins'

const ButtonToolbarPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BButtonToolbar,
    BBtnToolbar: BButtonToolbar
  }
})

export { ButtonToolbarPlugin, BButtonToolbar }

export default ButtonToolbarPlugin
