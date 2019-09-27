import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'

export const props = {
  src: {
    type: String,
    default: null,
    required: true
  },
  alt: {
    type: String,
    default: null
  },
  top: {
    type: Boolean,
    default: false
  },
  bottom: {
    type: Boolean,
    default: false
  },
  start: {
    type: Boolean,
    default: false
  },
  left: {
    // alias of 'start'
    type: Boolean,
    default: false
  },
  end: {
    type: Boolean,
    default: false
  },
  right: {
    // alias of 'end'
    type: Boolean,
    default: false
  },
  height: {
    type: [Number, String],
    default: null
  },
  width: {
    type: [Number, String],
    default: null
  }
}

// @vue/component
export const BCardImg = /*#__PURE__*/ Vue.extend({
  name: 'BCardImg',
  functional: true,
  props,
  render(h, { props, data }) {
    let baseClass = 'card-img'
    if (props.top) {
      baseClass += '-top'
    } else if (props.right || props.end) {
      baseClass += '-right'
    } else if (props.bottom) {
      baseClass += '-bottom'
    } else if (props.left || props.start) {
      baseClass += '-left'
    }

    return h(
      'img',
      mergeData(data, {
        class: [baseClass],
        attrs: {
          src: props.src,
          alt: props.alt,
          height: props.height,
          width: props.width
        }
      })
    )
  }
})
