import { BTooltip } from './tooltip'
import { VBTooltipPlugin } from '../../directives/tooltip'
import { pluginFactory } from '../../utils/plugins'

const TooltipPlugin = /*#__PURE__*/ pluginFactory({
  components: { BTooltip },
  plugins: { VBTooltipPlugin }
})

export { TooltipPlugin, BTooltip }
