import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_MEDIA_ASIDE } from '../../constants/components'

// --- Props ---

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  verticalAlign: {
    type: String,
    default: 'top'
  }
}

// --- Main component ---
// @vue/component
export const BMediaAside = /*#__PURE__*/ defineComponent({
  name: NAME_MEDIA_ASIDE,
  functional: true,
  props,
  render(_, { props, data, children }) {
    const align =
      props.verticalAlign === 'top'
        ? 'start'
        : props.verticalAlign === 'bottom'
          ? 'end'
          : /* istanbul ignore next */ props.verticalAlign
    return h(
      props.tag,
      mergeProps(data, {
        staticClass: 'd-flex',
        class: {
          [`align-self-${align}`]: align
        }
      }),
      children
    )
  }
})
