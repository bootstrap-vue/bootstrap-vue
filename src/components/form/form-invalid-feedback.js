import { ARIA_VALUE_TRUE } from '../../constants/aria'
import {
  CLASS_NAME_DISPLAY_BLOCK,
  CLASS_NAME_FORM_INVALID_FEEDBACK,
  CLASS_NAME_FORM_INVALID_TOOLTIP
} from '../../constants/class-names'
import { NAME_FORM_INVALID_FEEDBACK } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'

// --- Props ---
export const props = {
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
}

// --- Main component ---
// @vue/component
export const BFormInvalidFeedback = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_INVALID_FEEDBACK,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { tooltip, ariaLive } = props
    const show = props.forceShow === true || props.state === false

    return h(
      props.tag,
      mergeData(data, {
        class: {
          [CLASS_NAME_FORM_INVALID_FEEDBACK]: !tooltip,
          [CLASS_NAME_FORM_INVALID_TOOLTIP]: tooltip,
          [CLASS_NAME_DISPLAY_BLOCK]: show
        },
        attrs: {
          id: props.id || null,
          role: props.role || null,
          'aria-live': ariaLive || null,
          'aria-atomic': ariaLive ? ARIA_VALUE_TRUE : null
        }
      }),
      children
    )
  }
})
