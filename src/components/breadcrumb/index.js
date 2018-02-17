import bBreadcrumb from './breadcrumb'
import bBreadcrumbItem from './breadcrumb-item'
import bBreadcrumbLink from './breadcrumb-link'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bBreadcrumb,
  bBreadcrumbItem,
  bBreadcrumbLink
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
