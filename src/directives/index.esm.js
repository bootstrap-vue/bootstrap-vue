// Index file used for the main builds, which does not include legacy plugin names
// Once es/ buld is removed, then this file will be renamed to index.js
import { pluginFactory } from '../utils/plugins'
import * as directivePlugins from './plugins'

// Export all directive group plugins as named exports (VB<name>Plugin)
export * from './plugins'

// Named exports of all directives (VB<Name>)

// export * from './toggle'
export { VBToggle } from './toggle/toggle'

// export * from './modal'
export { VBModal } from './modal/modal'

// export * from './scrollspy'
export { VBScrollspy } from './scrollspy/scrollspy'

// export * from './tooltip'
export { VBTooltip } from './tooltip/tooltip'

// export * from './popover'
export { VBPopover } from './popover'

// Main plugin for installing all directive plugins
export const directivesPlugin = /*#__PURE__*/ pluginFactory({ plugins: directivePlugins })
