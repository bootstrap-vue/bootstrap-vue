import { BvPlugin } from '../bv-plugin'

// Default export is a plugin that installs all plugins
declare const BVDirectivesPlugin: BVDirectivesPlugin
export default BVDirectivesPlugin
export interface BVDirectivesPlugin extends BvPlugin {}

// Export all directive group plugins as named exports
export * from './plugins'

// Export all legacy named directive group plugins as named exports
export * from './plugins-legacy'

// Named exports of all directives
export * from './toggle'
export * from './modal'
export * from './scrollspy'
export * from './tooltip'
export * from './popover'
