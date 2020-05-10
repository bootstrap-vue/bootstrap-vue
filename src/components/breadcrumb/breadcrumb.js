import { CLASS_NAME_BREADCRUMB } from '../../constants/class-names'
import { NAME_BREADCRUMB } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { isArray, isObject } from '../../utils/inspect'
import { toString } from '../../utils/string'
import { BBreadcrumbItem } from './breadcrumb-item'

// --- Props ---
export const props = {
  items: {
    type: Array,
    default: null
  }
}

// --- Main component ---
// @vue/component
export const BBreadcrumb = /*#__PURE__*/ Vue.extend({
  name: NAME_BREADCRUMB,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { items } = props
    let childNodes = children

    // Build child nodes from items if given
    if (isArray(items)) {
      const itemsCount = props.items.length
      let activeDefined = false
      childNodes = items.map((item, idx) => {
        if (!isObject(item)) {
          item = { text: toString(item) }
        }

        // Copy the value here so we can normalize it
        let active = item.active
        if (active) {
          activeDefined = true
        }

        // Auto-detect active by position in list
        if (!active && !activeDefined) {
          active = idx + 1 === itemsCount
        }

        return h(BBreadcrumbItem, { props: { ...item, active } })
      })
    }

    return h('ol', mergeData(data, { staticClass: CLASS_NAME_BREADCRUMB }), childNodes)
  }
})
