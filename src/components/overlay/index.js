import { BOverlay } from './overlay'
import { pluginFactory } from '../../utils/plugins'

const OverlayPlugin = /*#__PURE__*/ pluginFactory({
  components: { BOverlay }
})

export { OverlayPlugin, BOverlay }
