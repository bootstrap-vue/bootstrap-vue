import { mergeData } from '../../utils'

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
  fluid: {
    type: Boolean,
    default: false
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, slots }) {
    let staticClass = 'card-img'
    if (props.top) {
      staticClass += '-top'
    } else if (props.bottom) {
      staticClass += '-bottom'
    }

    return h(
      'img',
      mergeData(data, {
        staticClass,
        class: { 'img-fluid': props.fluid },
        attrs: { src: props.src, alt: props.alt }
      })
    )
  }
}
