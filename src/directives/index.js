// Legacy index file supporting leagacy plugin names.
// This file is only here from transpilation purposes for `es/` build.
// src/index import /src/components/index.esm so that we don't
// have top-level duplicate plugin names.

// Import teh main plugin
import directivesPlugin from './index.esm'

// Export all directive group plugins as named exports
export * from './index.esm'

// Export all legacy named directive group plugins as named exports
export * from './plugins-legacy'

// Default export is a plugin that installs all plugins
export default directivesPlugin
