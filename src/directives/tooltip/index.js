import VBTooltipDirective from './tooltip'
import { installFactory } from '../../utils/plugins'

const directives = {
  BTooltip: VBTooltipDirective
}

export { VBTooltipDirective as VBTooltip }

export default {
  install: installFactory({ directives })
}
