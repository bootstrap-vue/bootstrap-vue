import { BPopover } from './popover'
import { VBPopoverPlugin } from '../../directives/popover'
import { pluginFactory } from '../../utils/plugins'

const PopoverPlugin = /*#__PURE__*/ pluginFactory({
  components: { BPopover },
  plugins: { VBPopoverPlugin }
})

export { PopoverPlugin, BPopover }
