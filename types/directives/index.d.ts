import { BvPlugin } from '../bv-plugin'

// Default export is a plugin that installs all plugins
declare const BVDirectivesPlugin: BVDirectivesPlugin
export default BVDirectivesPlugin
export interface BVDirectivesPlugin extends BvPlugin {}

// Named exports of all directives
export * from './toggle'
export * from './modal'
export * from './scrollspy'
export * from './tooltip'
export * from './popover'
