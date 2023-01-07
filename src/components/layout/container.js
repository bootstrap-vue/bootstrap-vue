import { extend, mergeData } from '../../vue'
import { NAME_CONTAINER } from '../../constants/components'
import { PROP_TYPE_BOOLEAN_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    // String breakpoint name new in Bootstrap v4.4.x
    fluid: makeProp(PROP_TYPE_BOOLEAN_STRING, false),
    tag: makeProp(PROP_TYPE_STRING, 'div')
  },
  NAME_CONTAINER
)

// --- Main component ---

// @vue/component
export const BContainer = /*#__PURE__*/ extend({
  name: NAME_CONTAINER,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { fluid } = props

    return h(
      props.tag,
      mergeData(data, {
        class: {
          container: !(fluid || fluid === ''),
          'container-fluid': fluid === true || fluid === '',
          // Bootstrap v4.4+ responsive containers
          [`container-${fluid}`]: fluid && fluid !== true
        }
      }),
      children
    )
  }
})
