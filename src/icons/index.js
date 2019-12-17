import { keys } from '../utils/object'
import { iconComponents } from './plugin'

// These re-exports are not currently used, as Webpack 4 has
// issues with tree shaking re-exports of re-exports
// `/src/index.js` does a single level re-export `* from './icons/icons/icons'`
// export * from './icons'
//
// export { BIcon }

// Plugin (an iconNames for docs)
export { IconsPlugin, iconNames } from './plugin'
