import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_INPUT_GROUP_TEXT } from '../../constants/components'

// --- Props ---

export const props = {
  tag: {
    type: String,
    default: 'div'
  }
}

// --- Main component ---
// @vue/component
export const BInputGroupText = /*#__PURE__*/ defineComponent({
  name: NAME_INPUT_GROUP_TEXT,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(
      props.tag,
      mergeProps(data, {
        staticClass: 'input-group-text'
      }),
      children
    )
  }
})
