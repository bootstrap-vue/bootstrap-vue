import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_FORM_INVALID_FEEDBACK } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    id: {
      type: String
      // default: null
    },
    tag: {
      type: String,
      default: 'div'
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    forceShow: {
      type: Boolean,
      default: false
    },
    state: {
      // Tri-state prop: `true`, `false`, or `null`
      type: Boolean,
      default: null
    },
    ariaLive: {
      type: String
      // default: null
    },
    role: {
      type: String
      // default: null
    }
  },
  NAME_FORM_INVALID_FEEDBACK
)

// --- Main component ---
// @vue/component
export const BFormInvalidFeedback = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_INVALID_FEEDBACK,
  functional: true,
  props,
  render(_, { props, data, children }) {
    const show = props.forceShow === true || props.state === false
    return h(
      props.tag,
      mergeProps(data, {
        class: {
          'invalid-feedback': !props.tooltip,
          'invalid-tooltip': props.tooltip,
          'd-block': show
        },
        attrs: {
          id: props.id || null,
          role: props.role || null,
          'aria-live': props.ariaLive || null,
          'aria-atomic': props.ariaLive ? 'true' : null
        }
      }),
      children
    )
  }
})
