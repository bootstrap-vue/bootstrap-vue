import { VBModal } from './modal'
import { pluginFactory } from '../../utils/plugins'

const VBModalPlugin = /*#__PURE__*/ pluginFactory({
  directives: { VBModal }
})

export { VBModalPlugin, VBModal }
