import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_FORM_ROW } from '../../constants/components'

// --- Props ---

export const props = {
  tag: {
    type: String,
    default: 'div'
  }
}

// --- Main component ---
// @vue/component
export const BFormRow = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_ROW,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(
      props.tag,
      mergeProps(data, {
        staticClass: 'form-row'
      }),
      children
    )
  }
})
