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
  right: {
    type: Boolean,
    default: false
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
  render (h, {props, data, slots}) {
    let staticClass = 'card-img'
    if (props.left) {
      staticClass += '-left'
    }
    if (props.right) {
      staticClass += '-right'
    }
    if (props.top) {
      staticClass += '-top'
    }
    if (props.bottom) {
      staticClass += '-bottom'
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
