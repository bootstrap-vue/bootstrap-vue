import Vue from '../utils/vue'
import { keys } from '../tils/object'
import { pluginFactory } from '../utils/plugins'
import { BIcon } from './icon'
import * as iconComponents from './icons'

// This re-export is not currently used, as Webpack 4 has
// issues with tree shaking re-exports of re-exports
// /src/index.js does a single level re-export * from ./icons/icons/icons
// export * from './icons'

export {
  BIcon,
  // Plugin
  IconsPlugin: /*#__PURE__*/ pluginFactory({ components: { BIcon, ...iconComponents } }),
  // Array of icon names (for use by the docs)
  iconNames: keys(iconComponents)
}
