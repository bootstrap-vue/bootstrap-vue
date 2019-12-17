import { keys } from '../utils/object'
import { iconComponents } from './plugin'

// These re-exports are not currently used, as Webpack 4 has
// issues with tree shaking re-exports of re-exports
// `/src/index.js` does a single level re-export `* from './icons/icons/icons'`
// export * from './icons'
//
// export { BIcon }

// Plugin
export { IconsPlugin } from './plugin'

// Array of icon names (for use by the docs excluding helper BIcon component)
export const iconNames = /*#__PURE__*/ keys(iconComponents).filter(i => i !== 'BIcon')
