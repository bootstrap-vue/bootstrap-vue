import VBPopoverDirective from './popover'
import { installFactory } from '../../utils/plugins'

const directives = {
  BPopover: VBPopoverDirective
}

export { VBPopoverDirective as VBPopover }

export default {
  install: installFactory({ directives })
}
