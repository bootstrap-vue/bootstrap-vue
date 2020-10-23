import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_FORM_SELECT_OPTION } from '../../constants/components'

// --- Props ---

export const props = {
  value: {
    // type: [String, Number, Boolean, Object],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

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
      mergeProps(data, {
        attrs: { disabled },
        domProps: { value }
      }),
      children
    )
  }
})
