import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_MEDIA_BODY } from '../../constants/components'

// --- Props ---

export const props = {
  tag: {
    type: String,
    default: 'div'
  }
}

// --- Main component ---
// @vue/component
export const BMediaBody = /*#__PURE__*/ defineComponent({
  name: NAME_MEDIA_BODY,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(
      props.tag,
      mergeProps(data, {
        staticClass: 'media-body'
      }),
      children
    )
  }
})
