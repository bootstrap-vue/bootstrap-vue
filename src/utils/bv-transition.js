// Generic Bootstrap v4 fade (no-fade) transition component
//
// Assumes that `show` class is not required when
// the transition has finished the enter transition
// (show and fade classes are only applied during transition)

import Vue, { mergeData } from '../vue'
import { NAME_TRANSITION } from '../constants/components'
import { isPlainObject } from './inspect'

const NO_FADE_PROPS = {
  name: '',
  enterClass: '',
  enterActiveClass: '',
  enterToClass: 'show',
  leaveClass: 'show',
  leaveActiveClass: '',
  leaveToClass: ''
}

const FADE_PROPS = {
  ...NO_FADE_PROPS,
  enterActiveClass: 'fade',
  leaveActiveClass: 'fade'
}

// @vue/component
export const BVTransition = /*#__PURE__*/ Vue.extend({
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
  render(h, { children, data, props }) {
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
      mergeData(data, { props: transProps }),
      children
    )
  }
})

export default BVTransition
