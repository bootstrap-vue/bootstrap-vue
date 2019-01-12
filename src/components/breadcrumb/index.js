import BBreadcrumb from './breadcrumb'
import BBreadcrumbItem from './breadcrumb-item'
import BBreadcrumbLink from './breadcrumb-link'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BBreadcrumb,
  BBreadcrumbItem,
  BBreadcrumbLink
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
