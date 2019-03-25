import BPopoverDirective from './popover'
import { installFactory } from '../../utils/plugins'

const directives = {
  BPopover: BPopoverDirective
}

export default {
  install: installFactory({ directives })
}
