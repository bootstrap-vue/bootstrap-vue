import { BBreadcrumb } from './breadcrumb'
import { BBreadcrumbItem } from './breadcrumb-item'
import { BBreadcrumbLink } from './breadcrumb-link'
import { pluginFactory } from '../../utils/plugins'

const BreadcrumbPlugin = /*#__PURE__*/ pluginFactory({
  components: { BBreadcrumb, BBreadcrumbItem, BBreadcrumbLink }
})

export { BreadcrumbPlugin, BBreadcrumb, BBreadcrumbItem, BBreadcrumbLink }

export default BreadcrumbPlugin
