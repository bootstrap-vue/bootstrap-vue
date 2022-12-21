import { extend, mergeData } from '../../vue'
import { NAME_INPUT_GROUP_TEXT } from '../../constants/components'
import { PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: makeProp(PROP_TYPE_STRING, 'div')
  },
  NAME_INPUT_GROUP_TEXT
)

// --- Main component ---

// @vue/component
export const BInputGroupText = /*#__PURE__*/ extend({
  name: NAME_INPUT_GROUP_TEXT,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'input-group-text'
      }),
      children
    )
  }
})
