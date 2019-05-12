import VBTooltip from './tooltip'
import { installFactory } from '../../utils/plugins'

const directives = {
  VBTooltip
}

export { VBTooltip }

export default {
  install: installFactory({ directives })
}
