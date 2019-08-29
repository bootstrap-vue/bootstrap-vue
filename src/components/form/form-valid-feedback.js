import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

export const props = {
  id: {
    type: String,
    default: null
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
    type: Boolean,
    default: null
  },
  ariaLive: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: null
  }
}

// @vue/component
export const BFormValidFeedback = /*#__PURE__*/ Vue.extend({
  name: 'BFormValidFeedback',
  functional: true,
  props,
  render(h, { props, data, children }) {
    const show = props.forceShow === true || props.state === true
    return h(
      props.tag,
      mergeData(data, {
        class: {
          'valid-feedback': !props.tooltip,
          'valid-tooltip': props.tooltip,
          'd-block': show
        },
        attrs: {
          id: props.id,
          role: props.role,
          'aria-live': props.ariaLive,
          'aria-atomic': props.ariaLive ? 'true' : null
        }
      }),
      children
    )
  }
})
