import BPopover from './popover'
import BPopoverDirectivePlugin from '../../directives/popover'
import { installFactory } from '../../utils/plugins'

const components = {
  BPopover
}

const plugins = {
  BPopoverDirectivePlugin
}

export default {
  install: installFactory({ components, plugins })
}
