import { mergeData } from 'vue-functional-data-merge'
import { assign } from '../../utils/object'
import BBreadcrumbLink, { props as crumbLinks } from './breadcrumb-link'

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

// @vue/component
export default {
  name: 'BBreadcrumbItem',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      'li',
      mergeData(data, {
        staticClass: 'breadcrumb-item',
        class: { active: props.active },
        attrs: { role: 'presentation' }
      }),
      [h(BBreadcrumbLink, { props }, children)]
    )
  }
}
