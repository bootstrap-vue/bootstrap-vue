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
    const { tooltip, ariaLive } = props
    const show = props.forceShow === true || props.state === false

    return h(
      props.tag,
      mergeProps(data, {
        class: {
          'd-block': show,
          'invalid-feedback': !tooltip,
          'invalid-tooltip': tooltip
        },
        attrs: {
          id: props.id || null,
          role: props.role || null,
          'aria-live': ariaLive || null,
          'aria-atomic': ariaLive ? 'true' : null
        }
      }),
      children
    )
  }
})
