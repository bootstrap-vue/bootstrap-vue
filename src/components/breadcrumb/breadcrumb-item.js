import { NAME_BREADCRUMB_ITEM } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { BBreadcrumbLink, props } from './breadcrumb-link'

// @vue/component
export const BBreadcrumbItem = /*#__PURE__*/ Vue.extend({
  name: NAME_BREADCRUMB_ITEM,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      'li',
      mergeData(data, {
        staticClass: 'breadcrumb-item',
        class: { active: props.active }
      }),
      [h(BBreadcrumbLink, { props }, children)]
    )
  }
})
