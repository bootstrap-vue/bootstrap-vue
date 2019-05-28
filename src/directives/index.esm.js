// Index file used for the main builds, which does not include legacy plugin names
import { installFactory } from '../utils/plugins'
import * as directivePlugins from './plugins'

// Export all directive group plugins as named exports (VB<name>Plugin)
export * from './plugins'

// Named exports of all directives (VB<Name>)
export * from './toggle'
export * from './modal'
export * from './scrollspy'
export * from './tooltip'
export * from './popover'

export const directivesPlugin = {
  install: installFactory({ plugins: directivePlugins })
}

// To be removed shortly
export default directivesPlugin
