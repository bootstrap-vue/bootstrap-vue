// Icons Plugin

// These re-exports are not currently used, as Webpack 4 has
// issues with tree shaking re-exports of re-exports
// `/src/index.js` does a single level re-export `* from './icons/icons/icons'`
// Export all icons
export * from './icons'

// Export helper component
export { BIcon } from './icon'

// Plugin (an iconNames for docs)
export { IconsPlugin, BootstrapVueIcons, iconNames } from './plugin'
