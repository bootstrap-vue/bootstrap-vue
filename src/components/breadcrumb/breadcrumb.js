import { defineComponent, h, mergeData } from '../../vue'
import { NAME_BREADCRUMB } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { isArray, isObject } from '../../utils/inspect'
import { toString } from '../../utils/string'
import { BBreadcrumbItem } from './breadcrumb-item'

// --- Props ---

export const props = makePropsConfigurable(
  {
    items: {
      type: Array,
      default: null
    }
  },
  NAME_BREADCRUMB
)

// --- Main component ---

// @vue/component
export const BBreadcrumb = /*#__PURE__*/ defineComponent({
  name: NAME_BREADCRUMB,
  functional: true,
  props,
  render(_, { props, data, children }) {
    let childNodes = children

    // Build child nodes from items if given
    if (isArray(props.items)) {
      let activeDefined = false
      childNodes = props.items.map((item, idx) => {
        if (!isObject(item)) {
          item = { text: toString(item) }
        }
        // Copy the value here so we can normalize it
        let { active } = item
        if (active) {
          activeDefined = true
        }
        if (!active && !activeDefined) {
          // Auto-detect active by position in list
          active = idx + 1 === props.items.length
        }

        return h(BBreadcrumbItem, { props: { ...item, active } })
      })
    }

    return h('ol', mergeData(data, { staticClass: 'breadcrumb' }), childNodes)
  }
})
