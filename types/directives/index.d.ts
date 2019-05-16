import { BvPlugin } from '../'

// Default export is a plugin that installs all plugins
declare const BVDirectivesPlugin: BvPlugin
export default BVDirectivesPlugin

// Named exports of all directives
export * from './toggle'
export * from './modal'
export * from './scrollspy'
export * from './tooltip'
export * from './popover'
