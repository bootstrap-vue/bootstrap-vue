// Index file used for the main builds, which does not include legacy plugin names
// Once es/ buld is removed, then this file will be renamed to index.js
import { pluginFactory } from '../utils/plugins'

import { default as VBModalPlugin } from './modal'
import { default as VBPopoverPlugin } from './popover'
import { default as VBScrollspyPlugin } from './scrollspy'
import { default as VBTogglePlugin } from './toggle'
import { default as VBTooltipPlugin } from './tooltip'

// Main plugin for installing all directive plugins
export const directivesPlugin = /*#__PURE__*/ pluginFactory({
  plugins: {
    VBModalPlugin,
    VBPopoverPlugin,
    VBScrollspyPlugin,
    VBTogglePlugin,
    VBTooltipPlugin
  }
})

// Named exports of all directives (VB<Name>) and Plugins (VB<name>Plugin)
// See src/compinents/index.esm.js for notes/comment

// export * from './modal'
export { VBModalPlugin } from './modal/modal'
export { VBModal } from './modal/modal'

// export * from './popover'
export { VBPopoverPlugin } from './popover'
export { VBPopover } from './popover/popover'

// export * from './scrollspy'
export { VBScrollspyPlugin } from './scrollspy'
export { VBScrollspy } from './scrollspy/scrollspy'

// export * from './toggle'
export { VBTogglePlugin } from './toggle'
export { VBToggle } from './toggle/toggle'

// export * from './tooltip'
export { VBTooltipPlugin } from './tooltip'
export { VBTooltip } from './tooltip/tooltip'
