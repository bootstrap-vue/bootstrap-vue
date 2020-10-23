import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_CARD_IMG } from '../../constants/components'

// --- Props ---

export const props = {
  src: {
    type: String,
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
    type: [Number, String]
    // default: null
  },
  width: {
    type: [Number, String]
    // default: null
  }
}

// --- Main component ---
// @vue/component
export const BCardImg = /*#__PURE__*/ defineComponent({
  name: NAME_CARD_IMG,
  functional: true,
  props,
  render(_, { props, data }) {
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
      mergeProps(data, {
        class: [baseClass],
        attrs: {
          src: props.src || null,
          alt: props.alt,
          height: props.height || null,
          width: props.width || null
        }
      })
    )
  }
})
