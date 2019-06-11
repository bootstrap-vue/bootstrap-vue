// Legacy index file supporting legacy plugin names.
// This file is only here from transpilation purposes for `es/` build.
// src/index imports /src/directives/index.esm so that we don't
// have top-level duplicate plugin names.

// Import the main directives plugin
import { directivesPlugin } from './index.esm'

// Export all directive group plugins and directives as named exports
export * from './index.esm'

// Export all legacy named directive group plugins as named exports
// To be removed in stable release
export { VBModalPlugin as Modal } from './modal'
export { VBPopoverPlugin as Popover } from './popover'
export { VBScrollspyPlugin as Scrollspy } from './scrollspy'
export { VBTogglePlugin as Toggle } from './toggle'
export { VBTooltipPlugin as Tooltip } from './tooltip'

// Default export is a plugin that installs all plugins
export default directivesPlugin
