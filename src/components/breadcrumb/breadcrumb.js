import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { isArray, isObject } from '../../utils/inspect'
import { toString } from '../../utils/string'
import { BBreadcrumbItem } from './breadcrumb-item'

export const props = {
  items: {
    type: Array,
    default: null
  }
}

// @vue/component
export const BBreadcrumb = /*#__PURE__*/ Vue.extend({
  name: 'BBreadcrumb',
  functional: true,
  props,
  render(h, { props, data, children }) {
    let childNodes = children
    // Build child nodes from items if given.
    if (isArray(props.items)) {
      let activeDefined = false
      childNodes = props.items.map((item, idx) => {
        if (!isObject(item)) {
          item = { text: toString(item) }
        }
        // Copy the value here so we can normalize it.
        let active = item.active
        if (active) {
          activeDefined = true
        }
        if (!active && !activeDefined) {
          // Auto-detect active by position in list.
          active = idx + 1 === props.items.length
        }

        return h(BBreadcrumbItem, { props: { ...item, active } })
      })
    }

    return h('ol', mergeData(data, { staticClass: 'breadcrumb' }), childNodes)
  }
})
