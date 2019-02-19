import BImgLazy from '../image/img-lazy'
import { mergeData } from 'vue-functional-data-merge'

export const props = {
  ...BImgLazy.props,
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
  }
}

// @vue/component
export default {
  name: 'BCardImgLazy',
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
      BImgLazy,
      mergeData(data, {
        class: [baseClass],
        props
      })
    )
  }
}
