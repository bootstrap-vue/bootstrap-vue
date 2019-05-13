// Generic Bootstrap V4 fade (no-fade) transition component

import { mergeData } from 'vue-functional-data-merge'

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
      type: Boolean,
      default: false
    },
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
