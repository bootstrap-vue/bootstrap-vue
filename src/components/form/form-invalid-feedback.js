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
  }
}

// @vue/component
export default {
  name: 'BFormInvalidFeedback',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        class: {
          'invalid-feedback': !props.tooltip,
          'invalid-tooltip': props.tooltip,
          'd-block': props.forceShow
        },
        attrs: { id: props.id }
      }),
      children
    )
  }
}
