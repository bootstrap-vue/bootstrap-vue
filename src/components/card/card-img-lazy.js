import BImgLazy from '../image/img-lazy'
import { mergeData } from 'vue-functional-data-merge'

// Copy of b-img-lazy props, and remove conflicting/non-applicable props
const lazyProps = { ...BImgLazy.props }
delete lazyProps.left
delete lazyProps.right
delete lazyProps.center
delete lazyProps.block
delete lazyProps.rounded
delete lazyProps.thumbnail
delete lazyProps.fluid
delete lazyProps.fluidGrow

export const props = {
  ...lazyProps,
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

    // Remove the left/center/right props before passing to b-img-lazy
    const lazyProps = { ...props }
    delete lazyProps.left
    delete lazyProps.right
    delete lazyProps.center
    return h(
      BImgLazy,
      mergeData(data, {
        class: [baseClass],
        props: lazyProps
      })
    )
  }
}
