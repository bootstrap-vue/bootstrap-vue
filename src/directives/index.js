import { installFactory } from '../utils/plugins'
import * as directivePlugins from './plugins'


// Named exports of all directives
export * from './toggle'
export * from './modal'
export * from './scrollspy'
export * from './tooltip'
export * from './popover'

// Default export is a plugin that installs all plugins
export default {
  install: installFactory({ plugins: directivePlugins })
}
