import BBreadcrumb from './breadcrumb'
import BBreadcrumbItem from './breadcrumb-item'
import BBreadcrumbLink from './breadcrumb-link'
import { registerComponents } from '../../utils/plugins'

const components = {
  BBreadcrumb,
  BBreadcrumbItem,
  BBreadcrumbLink
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
