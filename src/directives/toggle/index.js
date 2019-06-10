import { VBToggle } from './toggle'
import { pluginFactory } from '../../utils/plugins'

const VBTogglePlugin = /*#__PURE__*/ pluginFactory({
  directives: { VBToggle }
})

export { VBTogglePlugin, VBToggle }

export default VBTogglePlugin
