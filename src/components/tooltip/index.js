import BTooltip from './tooltip'
import BTooltipDirectivePlugin from '../../directives/tooltip'
import { installFactory } from '../../utils/plugins'

const components = {
  BTooltip
}

const plugins = {
  BTooltipDirectivePlugin
}

export default {
  install: installFactory({ components, plugins })
}
