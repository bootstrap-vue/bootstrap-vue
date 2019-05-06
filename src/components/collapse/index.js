import BCollapse from './collapse'
import BToggleDirective from '../../directives/toggle/toggle'
import { installFactory } from '../../utils/plugins'

const components = {
  BCollapse
}

const directives = {
  BToggle: BToggleDirective
}

const CollapsePlugin = {
  install: installFactory({ components, directives })
}

export {
  // Plugins
  CollapsePlugin,
  // Components
  BCollapse
}

// Legacy: default is plugin
export default CollapsePlugin
