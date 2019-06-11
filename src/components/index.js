// Legacy index file supporting legacy plugin names and default export.
// This file is only here from transpilation purposes for `es/` build.
// src/index imports /src/components/index.esm so that we don't
// have top-level duplicate plugin names.
//
// TODO:
// Once `es/` build is removed, we will rename index.esm.js to index.js
// and update /src/index.js to import the new index.js

// Import the main components plugin
import { componentsPlugin } from './index.esm'

// Export all component group plugins and components as named exports
export * from './index.esm'

// Export all legacy named component group plugins as named exports
// To be removed in stable release
export { AlertPlugin as Alert } from './alert'
export { BadgePlugin as Badge } from './badge'
export { BreadcrumbPlugin as Breadcrumb } from './breadcrumb'
export { ButtonPlugin as Button } from './button'
export { ButtonGroupPlugin as ButtonGroup } from './button-group'
export { ButtonToolbarPlugin as ButtonToolbar } from './button-toolbar'
export { CardPlugin as Card } from './card'
export { CarouselPlugin as Carousel } from './carousel'
export { CollapsePlugin as Collapse } from './collapse'
export { DropdownPlugin as Dropdown } from './dropdown'
export { EmbedPlugin as Embed } from './embed'
export { FormPlugin as Form } from './form'
export { FormGroupPlugin as FormGroup } from './form-group'
export { FormCheckboxPlugin as FormCheckbox } from './form-checkbox'
export { FormRadioPlugin as FormRadio } from './form-radio'
export { FormInputPlugin as FormInput } from './form-input'
export { FormTextareaPlugin as FormTextarea } from './form-textarea'
export { FormFilePlugin as FormFile } from './form-file'
export { FormSelectPlugin as FormSelect } from './form-select'
export { ImagePlugin as Image } from './image'
export { InputGroupPlugin as InputGroup } from './input-group'
export { JumbotronPlugin as Jumbotron } from './jumbotron'
export { LayoutPlugin as Layout } from './layout'
export { LinkPlugin as Link } from './link'
export { ListGroupPlugin as ListGroup } from './list-group'
export { MediaPlugin as Media } from './media'
export { ModalPlugin as Modal } from './modal'
export { NavPlugin as Nav } from './nav'
export { NavbarPlugin as Navbar } from './navbar'
export { PaginationPlugin as Pagination } from './pagination'
export { PaginationNavPlugin as PaginationNav } from './pagination-nav'
export { PopoverPlugin as Popover } from './popover'
export { ProgressPlugin as Progress } from './progress'
export { SpinnerPlugin as Spinner } from './spinner'
export { TablePlugin as Table } from './table'
export { TabsPlugin as Tabs } from './tabs'
export { ToastPlugin as Toast } from './toast'
export { TooltipPlugin as Tooltip } from './tooltip'

// Export default as a plugin that installs all the component group plugins
export default componentsPlugin
