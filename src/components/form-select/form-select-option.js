import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_FORM_SELECT_OPTION } from '../../constants/components'
import { PROP_NAME_MODEL_VALUE } from '../../constants/props'
import { makePropsConfigurable } from '../../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    [PROP_NAME_MODEL_VALUE]: {
      // type: [String, Number, Boolean, Object],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  NAME_FORM_SELECT_OPTION
)

// --- Main component ---
// @vue/component
export const BFormSelectOption = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_SELECT_OPTION,
  functional: true,
  props,
  render(_, { props, data, children }) {
    const { disabled } = props

    return h(
      'option',
      mergeProps(data, {
        attrs: { disabled },
        domProps: { value: props[PROP_NAME_MODEL_VALUE] }
      }),
      children
    )
  }
})
