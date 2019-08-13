import { BTooltip } from './tooltip'
import { VBTooltip } from '../../directives/tooltip/tooltip'
import { pluginFactory } from '../../utils/plugins'

const TooltipPlugin = /*#__PURE__*/ pluginFactory({
  components: { BTooltip },
  directives: { VBTooltip }
})

export { TooltipPlugin, BTooltip }
