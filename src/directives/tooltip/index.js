import BTooltipDirective from './tooltip'
import { installFactory } from '../../utils/plugins'

const directives = {
  BTooltip: BTooltipDirective
}

export {
  BTooltipDirective as BTooltip
}

export default {
  install: installFactory({ directives })
}
