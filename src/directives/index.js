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
