import { installFactory } from '../utils/plugins'

// Export a named eport 'plugins' which is an object of all plugins
// Note this is may not be tree shake-able if user imports plugins from
// this named export.
import * as plugins from './plugins'
export { plugins }

// Named exports of all directives
export * from './toggle'
export * from './modal'
export * from './scrollspy'
export * from './tooltip'
export * from './popover'

// Default export is a plugin that installs all plugins
export default {
  install: installFactory({ plugins })
}
