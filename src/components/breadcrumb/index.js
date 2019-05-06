import BBreadcrumb from './breadcrumb'
import BBreadcrumbItem from './breadcrumb-item'
import BBreadcrumbLink from './breadcrumb-link'
import { installFactory } from '../../utils/plugins'

const components = {
  BBreadcrumb,
  BBreadcrumbItem,
  BBreadcrumbLink
}

const BreadcrumbPlugin = {
  install: installFactory({ components })
}

export {
  // Plugins
  BreadcrumbPlugin,
  // Components
  BBreadcrumb,
  BBreadcrumbItem,
  BBreadcrumbLink
}

export default BreadcrumbPlugin
