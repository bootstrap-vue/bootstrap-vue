import { pluginFactory } from '../utils/plugins'

import { VBHoverPlugin } from './hover'
import { VBModalPlugin } from './modal'
import { VBPopoverPlugin } from './popover'
import { VBScrollspyPlugin } from './scrollspy'
import { VBTogglePlugin } from './toggle'
import { VBTooltipPlugin } from './tooltip'
import { VBVisiblePlugin } from './visible'

// Main plugin for installing all directive plugins
export const directivesPlugin = /*#__PURE__*/ pluginFactory({
  plugins: {
    VBHoverPlugin,
    VBModalPlugin,
    VBPopoverPlugin,
    VBScrollspyPlugin,
    VBTogglePlugin,
    VBTooltipPlugin,
    VBVisiblePlugin
  }
})
