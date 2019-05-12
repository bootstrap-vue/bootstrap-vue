import BTooltip from './tooltip'
import VBTooltip from '../../directives/tooltip/tooltip'
import { installFactory } from '../../utils/plugins'

const components = {
  BTooltip
}

const directives = {
  VBTooltip
}

export { BTooltip }

export default {
  install: installFactory({ components, directives })
}
