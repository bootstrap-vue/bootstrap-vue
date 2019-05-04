import { installFactory } from '../utils/plugins'
import * as componentPlugins from './plugins'

// Export all component group plugins as named exports
export * from './plugins'

// Export all legacy name component group plugins as named exports
export * from './plugins-legacy'

// Export all individual components as named exports
export * from './alert'
export * from './badge'
export * from './breadcrumb'
export * from './button'
export * from './button-group'
export * from './button-toolbar'
export * from './input-group'
export * from './card'
export * from './carousel'
export * from './layout'
export * from './collapse'
export * from './dropdown'
export * from './embed'
export * from './form'
export * from './form-group'
export * from './form-checkbox'
export * from './form-radio'
export * from './form-input'
export * from './form-textarea'
export * from './form-file'
export * from './form-select'
export * from './image'
export * from './jumbotron'
export * from './link'
export * from './list-group'
export * from './media'
export * from './modal'
export * from './nav'
export * from './navbar'
export * from './pagination'
export * from './pagination-nav'
export * from './popover'
export * from './progress'
export * from './spinner'
export * from './table'
export * from './tabs'
export * from './toast'
export * from './tooltip'

// Export default as a plugin that installs all the component group plugins
export default {
  install: installFactory({ plugins: componentPlugins })
}
