import BCollapse from './collapse'
import BToggleDirectivePlugin from '../../directives/toggle'
import { installFactory } from '../../utils/plugins'

const components = {
  BCollapse
}

const plugins = {
  BToggleDirectivePlugin
}

export default {
  install: installFactory({ components, plugins })
}
