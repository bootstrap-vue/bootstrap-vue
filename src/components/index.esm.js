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

// export * from './alert'
export { BAlert } from './alert/alert'

// export * from './badge'
export { BBadge } from './badge/badge'

// export * from './breadcrumb'
export { BBreadcrumb } from './breadcrumb/breadcrumb'
export { BBreadcrumbItem } from './breadcrumb/breadcrumb-item'

// export * from './button'
export { default as BButton } from './button/button'
export { default as BButtonClose } from './button/button-close'

// export * from './button-group'
export { default as BButtonGroup } from './button-group/button-group'

// export * from './button-toolbar'
export { default as BButtonToolbar } from './button-toolbar/button-toolbar'

// export * from './card'
export { default as BCard } from './card/card'
export { default as BCardBody } from './card/card-body'
export { default as BCardFooter } from './card/card-footer'
export { default as BCardGroup } from './card/card-group'
export { default as BCardHeader } from './card/card-header'
export { default as BCardImg } from './card/card-img'
export { default as BCardImgLazy } from './card/card-img-lazy'
export { default as BCardSubTitle } from './card/card-sub-title'
export { default as BCardText } from './card/card-text'
export { default as BCardTitle } from './card/card-title'

// export * from './carousel'
export { default as BCarousel } from './carousel/carousel'
export { default as BCarouselSlide } from './carousel/carousel-slide'

// export * from './collapse'
export { default as BCollapse } from './collapse/collapse'

// export * from './dropdown'
export { default as BDropdown } from './dropdown/dropdown'
export { default as BDropdownItem } from './dropdown/dropdown-item'
export { default as BDropdownItemButton } from './dropdown/dropdown-item-button'
export { default as BDropdownDivider } from './dropdown/dropdown-divider'
export { default as BDropdownForm } from './dropdown/dropdown-form'
export { default as BDropdownGroup } from './dropdown/dropdown-group'
export { default as BDropdownHeader } from './dropdown/dropdown-header'
export { default as BDropdownText } from './dropdown/dropdown-text'

// export * from './embed'
export { default as BEmbed } from './embed/embed'

// export * from './form'
export { default as BForm } from './form/form'
export { default as BFormDatalist } from './form/form-datalist'
export { default as BFormText } from './form/form-text'
export { default as BFormInvalidFeedback } from './form/form-invalid-feedback'
export { default as BFormValidFeedback } from './form/form-valid-feedback'

// export * from './form-checkbox'
export { default as BFormCheckbox } from './form-checkbox/form-checkbox'
export { default as BFormCheckboxGroup } from './form-checkbox/form-checkbox-group'

// export * from './form-file'
export { default as BFormFile } from './form-file/form-file'

// export * from './form-group'
export { default as BFormGroup } from './form-group/form-group'

// export * from './form-input'
export { default as BFormInput } from './form-input/form-input'

// export * from './form-radio'
export { default as BFormRadio } from './form-radio/form-radio'
export { default as BFormRadioGroup } from './form-radio/form-radio-group'

// export * from './form-select'
export { default as BFormSelect } from './form-select/form-select'

// export * from './form-textarea'
export { default as BFormTextArea } from './form-textarea/form-textarea'

// export * from './image'
export { default as BImg } from './image/img'
export { default as BImgLazy } from './image/img-lazy'

// export * from './input-group'
export { default as BInputGroup } from './input-group/input-group'
export { default as BInputGroupAddon } from './input-group/input-group-addon'
export { default as BInputGroupAppend } from './input-group/input-group-append'
export { default as BInputGroupPrepend } from './input-group/input-group-prepend'
export { default as BInputGroupText } from './input-group/input-group-text'

// export * from './jumbotron'
export { default as BJumbotron } from './jumbotron/jumbotron'

// export * from './layout'
export { default as BContainer } from './layout/container'
export { default as BRow } from './layout/row'
export { default as BCol } from './layout/col'
export { default as BFormRow } from './layout/form-row'

// export * from './link'
export { default as BLink } from './link/link'

// export * from './list-group'
export { default as BListGroup } from './list-group/list-group'
export { default as BListGroupItem } from './list-group/list-group-item'

// export * from './media'
export { default as BMedia } from './media/media'
export { default as BMediaAside } from './media/media-aside'
export { default as BMediaBody } from './media/media-body'

// export * from './modal'
export { default as BModal } from './modal/modal'

// export * from './nav'
export { default as BNav } from './nav/nav'
export { default as BNavForm } from './nav/nav-form'
export { default as BNavItem } from './nav/nav-item'
export { default as BNavItemDropdown } from './nav/nav-item-dropdown'
export { default as BNavText } from './nav/nav-text'

// export * from './navbar'
export { default as BNavbar } from './navbar/navbar'
export { default as BNavbarBrand } from './navbar/navbar-brand'
export { default as BNavbarNav } from './navbar/navbar-nav'
export { default as BNavbarToggle } from './navbar/navbar-toggle'

// export * from './pagination'
export { default as BPagination } from './pagination/pagination'

// export * from './pagination-nav'
export { default as BPaginationNav } from './pagination-nav/pagination-nav'

// export * from './popover'
export { default as BPopover } from './popover/popover'

// export * from './progress'
export { default as BProgress } from './progress/progress'
export { default as BProgressBar } from './progress/progress-bar'

// export * from './spinner'
export { default as BSpinner } from './spinner/spinner'

// export * from './table'
export { default as BTable } from './table/table'
export { default as BTableLite } from './table/table-lite'

// export * from './tabs'
export { default as BTabs } from './tabs/tabs'
export { default as BTab } from './tabs/tab'

// export * from './toast'
export { default as BToast } from './toast/toast'
export { default as BToaster } from './toast/toaster'

// export * from './tooltip'
export { default as BTooltip } from './tooltip/tooltip'

// Main plugin to install all component plugins
export const componentsPlugin = /*#__PURE__*/ pluginFactory({ plugins: componentPlugins })
