import BTooltip from './tooltip'
import BTooltipDirective from '../../directives/tooltip/tooltip'
import { installFactory } from '../../utils/plugins'

const components = {
  BTooltip
}

const directives = {
  BTooltip: BTooltipDirective
}

export { BTooltip }

export default {
  install: installFactory({ components, directives })
}
