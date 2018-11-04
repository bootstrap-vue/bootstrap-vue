import {mergeData} from 'vue-functional-data-merge'

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
  left: {
    type: Boolean,
    default: false
  },
  start: {
    type: Boolean,
    default: false
    // alias of 'left'
  },
  right: {
    type: Boolean,
    default: false
  },
  end: {
    type: Boolean,
    default: false
    // alias of 'right'
  },
  height: {
    type: String,
    default: null
  },
  width: {
    type: String,
    default: null
  },
  fluid: {
    type: Boolean,
    default: false
  }
}

export default {
  functional: true,
  props,
  render (h, {props, data}) {
    let staticClass = 'card-img'
    if (props.top) {
      staticClass += '-top'
    } else if (props.right || props.end) {
      staticClass += '-right'
    } else if (props.bottom) {
      staticClass += '-bottom'
    } else if (props.left || props.start) {
      staticClass += '-left'
    }

    return h(
      'img',
      mergeData(data, {
        staticClass,
        class: {'img-fluid': props.fluid},
        attrs: {src: props.src, alt: props.alt, height: props.height, width: props.width}
      })
    )
  }
}
