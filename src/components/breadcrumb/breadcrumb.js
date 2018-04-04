import { mergeData } from 'vue-functional-data-merge'
import { isArray } from '../../utils/array'
import { assign } from '../../utils/object'
import BreadcrumbItem from './breadcrumb-item'

export const props = {
  items: {
    type: Array,
    default: null
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    let childNodes = children
    // Build child nodes from items if given.
    if (isArray(props.items)) {
      let activeDefined = false
      childNodes = props.items.map((item, idx) => {
        if (typeof item !== 'object') {
          item = { text: item }
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

        return h(BreadcrumbItem, { props: assign({}, item, { active }) })
      })
    }

    return h('ol', mergeData(data, { staticClass: 'breadcrumb' }), childNodes)
  }
}
