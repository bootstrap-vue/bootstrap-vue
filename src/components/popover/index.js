import BPopover from './popover'
import BPpopoverDirective from '../../directives/popover/popover'
import { installFactory } from '../../utils/plugins'

const components = {
  BPopover
}

const directives = {
  BPopover: BPopoverDirective
}

export default {
  install: installFactory({ components, directives })
}
