import { VBTooltip } from './tooltip'
import { pluginFactory } from '../../utils/plugins'

const VBTooltipPlugin = /*#__PURE__*/ pluginFactory({
  directives: { VBTooltip }
})

export { VBTooltipPlugin, VBTooltip }

export default VBTooltipPlugin
