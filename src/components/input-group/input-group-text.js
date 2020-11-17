import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_INPUT_GROUP_TEXT } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: {
      type: String,
      default: 'div'
    }
  },
  NAME_INPUT_GROUP_TEXT
)

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
