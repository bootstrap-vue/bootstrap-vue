import { extend, mergeData } from '../../vue'
import { NAME_FORM_SELECT_OPTION } from '../../constants/components'
import { PROP_TYPE_ANY, PROP_TYPE_BOOLEAN } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    disabled: makeProp(PROP_TYPE_BOOLEAN, false),
    value: makeProp(PROP_TYPE_ANY, undefined, true) // Required
  },
  NAME_FORM_SELECT_OPTION
)

// --- Main component ---

// @vue/component
export const BFormSelectOption = /*#__PURE__*/ extend({
  name: NAME_FORM_SELECT_OPTION,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { value, disabled } = props

    return h(
      'option',
      mergeData(data, {
        attrs: { disabled },
        domProps: { value }
      }),
      children
    )
  }
})
