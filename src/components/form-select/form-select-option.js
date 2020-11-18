import { defineComponent, h, mergeData } from '../../vue'
import { NAME_FORM_SELECT_OPTION } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    value: {
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
