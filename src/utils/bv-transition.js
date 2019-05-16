// Generic Bootstrap V4 fade (no-fade) transition component

import Vue from './vue'
import { mergeData } from 'vue-functional-data-merge'
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

export const BVTransition = Vue.extend({
  name: 'BVTransition',
  functional: true,
  props: {
    noFade: {
      // Only applicable to the built in transition
      // Has no effect if `trans-props` provided
      type: Boolean,
      default: false
    },
    mode: {
      type: String
      // default: undefined
    },
    // For user supplied transitions (if needed)
    transProps: {
      type: Object,
      default: null
    }
  },
  render(h, { children, data, listeners, props }) {
    let transProps = props.transProps
    if (!isPlainObject(transProps)) {
      transProps = props.noFade ? NO_FADE_PROPS : FADE_PROPS
    }
    transProps = {
      mode: props.mode,
      ...transProps,
      // We always need `css` true
      css: true
    }
    return h(
      'transition',
      // Any listeners will get merged here
      mergeData(data, { props: transProps }),
      children
    )
  }
})

export default BVTransition
