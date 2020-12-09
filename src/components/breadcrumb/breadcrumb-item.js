import { Vue, mergeData } from '../../vue'
import { NAME_BREADCRUMB_ITEM } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/props'
import { BBreadcrumbLink, props as BBreadcrumbLinkProps } from './breadcrumb-link'

// --- Props ---

export const props = makePropsConfigurable(BBreadcrumbLinkProps, NAME_BREADCRUMB_ITEM)

// --- Main component ---

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
