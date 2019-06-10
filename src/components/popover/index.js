import { BPopover } from './popover'
import { VBPopover } from '../../directives/popover/popover'
import { pluginFactory } from '../../utils/plugins'

const PopoverPlugin = /*#__PURE__*/ pluginFactory({
  components: { BPopover },
  directives: { VBPopover }
})

export { PopoverPlugin, BPopover }

export default PopoverPlugin
