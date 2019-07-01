import { pluginFactory } from '../utils/plugins'

import { VBModalPlugin } from './modal'
import { VBPopoverPlugin } from './popover'
import { VBScrollspyPlugin } from './scrollspy'
import { VBTogglePlugin } from './toggle'
import { VBTooltipPlugin } from './tooltip'

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
//
// Webpack 4 has optimization difficulties with re-eport of re-exports, so
// we import the directives individulaly here for better tree shaking,
//
// Webpack v5 fixes the optimizations with re-export of re-exports so this
// can be reverted back to `export * from './scrollspy'` when Webpack v5 is released.
// https://github.com/webpack/webpack/pull/9203 (available in Webpack v5.0.0-alpha.15)

// export * from './modal'
export { VBModalPlugin } from './modal'
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
