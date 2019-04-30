import BPopoverDirective from './popover'
import { installFactory } from '../../utils/plugins'

const directives = {
  BPopover: BPopoverDirective
}

export {
  BPopoverDirective as BPopover
}

export default {
  install: installFactory({ directives })
}
