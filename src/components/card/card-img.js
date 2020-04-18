import { mergeData } from 'vue-functional-data-merge'
import { CLASS_NAME_CARD_IMG } from '../../constants/class-names'
import { NAME_CARD_IMG } from '../../constants/components'
import Vue from '../../utils/vue'
import { suffixClass } from '../../utils/string'

// --- Props ---
export const props = {
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String
    // default: null
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
export const BCardImg = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_IMG,
  functional: true,
  props,
  render(h, { props, data }) {
    const direction = props.top
      ? 'top'
      : props.right || props.end
        ? 'right'
        : props.bottom
          ? 'bottom'
          : props.left || props.start
            ? 'left'
            : ''

    return h(
      'img',
      mergeData(data, {
        staticClass: direction ? suffixClass(CLASS_NAME_CARD_IMG, direction) : CLASS_NAME_CARD_IMG,
        attrs: {
          src: props.src || null,
          alt: props.alt || null,
          height: props.height || null,
          width: props.width || null
        }
      })
    )
  }
})
