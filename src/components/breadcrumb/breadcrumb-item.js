import { mergeData } from '../../utils'
import { assign } from '../../utils/object'
import BreadcrumbLink, { props as crumbLinks } from './breadcrumb-link'

export const props = assign({}, crumbLinks, {
  text: {
    type: String,
    default: null
  },
  href: {
    type: String,
    default: null
  }
})

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    return h(
      'li',
      mergeData(data, {
        staticClass: 'breadcrumb-item',
        class: { active: props.active },
        attrs: { role: 'presentation' }
      }),
      [h(BreadcrumbLink, { props }, children)]
    )
  }
}
