import BPopover from './popover'
import VBPopover from '../../directives/popover/popover'
import { installFactory } from '../../utils/plugins'

const components = {
  BPopover
}

const directives = {
  VBPopover
}

export { BPopover }

export default {
  install: installFactory({ components, directives })
}
