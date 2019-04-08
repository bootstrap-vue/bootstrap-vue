import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'
import BBreadcrumbLink, { props } from './breadcrumb-link'

// @vue/component
export default Vue.extend({
  name: 'BBreadcrumbItem',
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
