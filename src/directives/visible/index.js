import { VBVisible } from './visible'
import { pluginFactory } from '../../utils/plugins'

const VBVisiblePlugin = /*#__PURE__*/ pluginFactory({
  directives: { VBVisible }
})

export { VBVisiblePlugin, VBVisible }
