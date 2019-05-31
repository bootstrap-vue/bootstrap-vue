// Legacy index file supporting legacy plugin names and default export.
// This file is only here from transpilation purposes for `es/` build.
// src/index imports /src/components/index.esm so that we don't
// have top-level duplicate plugin names.

// Import the main components plugin
import { componentsPlugin } from './index.esm'

// Export all component group plugins and components as named exports
export * from './index.esm'

// Export all legacy name component group plugins as named exports
// To be removed in stable release
export * from './plugins-legacy'

// Export default as a plugin that installs all the component group plugins
export default componentsPlugin
