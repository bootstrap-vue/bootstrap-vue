import { mergeData } from 'vue-functional-data-merge'
import { CLASS_NAME_BREADCRUMB_ITEM } from '../../constants/class-names'
import { NAME_BREADCRUMB_ITEM } from '../../constants/components'
import Vue from '../../utils/vue'
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
        staticClass: CLASS_NAME_BREADCRUMB_ITEM,
        class: { active: props.active }
      }),
      [h(BBreadcrumbLink, { props }, children)]
    )
  }
})
