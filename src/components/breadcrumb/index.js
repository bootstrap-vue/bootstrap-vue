import BBreadcrumb from './breadcrumb'
import BBreadcrumbItem from './breadcrumb-item'
import BBreadcrumbLink from './breadcrumb-link'
import { installFactory } from '../../utils/plugins'

const components = {
  BBreadcrumb,
  BBreadcrumbItem,
  BBreadcrumbLink
}

export { BBreadcrumb, BBreadcrumbItem, BBreadcrumbLink }

export default {
  install: installFactory({ components })
}
