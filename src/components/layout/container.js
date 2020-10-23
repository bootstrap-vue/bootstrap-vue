import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_CONTAINER } from '../../constants/components'

// --- Props ---

export const props = {
  tag: {
    type: String,
    default: 'div'
  },
  fluid: {
    // String breakpoint name new in Bootstrap v4.4.x
    type: [Boolean, String],
    default: false
  }
}

// --- Main component ---
// @vue/component
export const BContainer = /*#__PURE__*/ defineComponent({
  name: NAME_CONTAINER,
  functional: true,
  props,
  render(_, { props, data, children }) {
    return h(
      props.tag,
      mergeProps(data, {
        class: {
          container: !(props.fluid || props.fluid === ''),
          'container-fluid': props.fluid === true || props.fluid === '',
          // Bootstrap v4.4+ responsive containers
          [`container-${props.fluid}`]: props.fluid && props.fluid !== true
        }
      }),
      children
    )
  }
})
