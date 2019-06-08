// Index file used for the main builds, which does not include legacy plugin names
// Once es/ buld is removed, then this file will be renamed to index.js
import { pluginFactory } from '../utils/plugins'
import * as componentPlugins from './plugins'

// Export all component group plugins as named exports
export * from './plugins'

// Export all individual components as named exports.
// This is mainly for users who import individual components and directives.
//
// Webpack 4 has optimization difficulties with re-eport of re-exports, so
// we import some of the components individulaly here for better tree shaking,
// specifically some of the component groups that have components that would
// be used individually or not as the full complement.
//
// Webpack v5 fixes the optimizations with re-export of re-exports so this
// can be reverted back to `export * from './table'` when Webpack v5 is released.
// https://github.com/webpack/webpack/pull/9203 (available in Webpack v5.0.0-alpha.15)
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
// export * from './image'
export { default as BImg } from './image/img'
export { default as BImgLazy } from './image/img-lazy'
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
// export * from './table'
export { default as BTable } from './table/table'
export { default as BTableLite } from './table/table-lite'
export * from './tabs'
export * from './toast'
export * from './tooltip'

export const componentsPlugin = /*#__PURE__*/ pluginFactory({ plugins: componentPlugins })
