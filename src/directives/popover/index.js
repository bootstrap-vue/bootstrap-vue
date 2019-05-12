import VBPopover from './popover'
import { installFactory } from '../../utils/plugins'

const directives = {
  VBPopover
}

export { VBPopover }

export default {
  install: installFactory({ directives })
}
