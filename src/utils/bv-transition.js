// Generic Bootstrap v4 fade (no-fade) transition component
//
// Assumes that `show` class is not required when
// the transition has finished the enter transition
// (show and fade classes are only applied during transition)

import { defineComponent, h, mergeProps } from '../vue'
import { CLASS_NAME_FADE, CLASS_NAME_SHOW } from '../constants/class-names'
import { NAME_TRANSITION } from '../constants/components'
import { isPlainObject } from './inspect'

// --- Constants ---

const NO_FADE_PROPS = {
  name: '',
  enterClass: '',
  enterActiveClass: '',
  enterToClass: CLASS_NAME_SHOW,
  leaveClass: CLASS_NAME_SHOW,
  leaveActiveClass: '',
  leaveToClass: ''
}

const FADE_PROPS = {
  ...NO_FADE_PROPS,
  enterActiveClass: CLASS_NAME_FADE,
  leaveActiveClass: CLASS_NAME_FADE
}

// --- Main component ---
// @vue/component
export const BVTransition = /*#__PURE__*/ defineComponent({
  name: NAME_TRANSITION,
  functional: true,
  props: {
    noFade: {
      // Only applicable to the built in transition
      // Has no effect if `trans-props` provided
      type: Boolean,
      default: false
    },
    appear: {
      // Has no effect if `trans-props` provided
      type: Boolean,
      default: false
    },
    mode: {
      // Can be overridden by user supplied trans-props
      type: String
      // default: undefined
    },
    // For user supplied transitions (if needed)
    transProps: {
      type: Object,
      default: null
    }
  },
  render(_, { props, data, children }) {
    let transProps = props.transProps
    if (!isPlainObject(transProps)) {
      transProps = props.noFade ? NO_FADE_PROPS : FADE_PROPS
      if (props.appear) {
        // Default the appear classes to equal the enter classes
        transProps = {
          ...transProps,
          appear: true,
          appearClass: transProps.enterClass,
          appearActiveClass: transProps.enterActiveClass,
          appearToClass: transProps.enterToClass
        }
      }
    }
    transProps = {
      mode: props.mode,
      ...transProps,
      // We always need `css` true
      css: true
    }
    return h(
      'transition',
      // Any transition event listeners will get merged here
      mergeProps(data, { props: transProps }),
      children
    )
  }
})

export default BVTransition
