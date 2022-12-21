import { extend, mergeData } from '../../vue'
import { NAME_BREADCRUMB } from '../../constants/components'
import { PROP_TYPE_ARRAY } from '../../constants/props'
import { isArray, isObject } from '../../utils/inspect'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { toString } from '../../utils/string'
import { BBreadcrumbItem } from './breadcrumb-item'

// --- Props ---

export const props = makePropsConfigurable(
  {
    items: makeProp(PROP_TYPE_ARRAY)
  },
  NAME_BREADCRUMB
)

// --- Main component ---

// @vue/component
export const BBreadcrumb = /*#__PURE__*/ extend({
  name: NAME_BREADCRUMB,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { items } = props

    // Build child nodes from items, if given
    let childNodes = children
    if (isArray(items)) {
      let activeDefined = false
      childNodes = items.map((item, idx) => {
        if (!isObject(item)) {
          item = { text: toString(item) }
        }
        // Copy the value here so we can normalize it
        let { active } = item
        if (active) {
          activeDefined = true
        }
        // Auto-detect active by position in list
        if (!active && !activeDefined) {
          active = idx + 1 === items.length
        }

        return h(BBreadcrumbItem, { props: { ...item, active } })
      })
    }

    return h('ol', mergeData(data, { staticClass: 'breadcrumb' }), childNodes)
  }
})
