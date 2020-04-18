// Generic collapse transion helper component
//
// Note:
//   Applies the classes `collapse`, `show` and `collapsing`
//   during the enter/leave transition phases only
//   Although it appears that Vue may be leaving the classes
//   in-place after the transition completes
import {
  CLASS_NAME_COLLAPSE,
  CLASS_NAME_COLLAPSING,
  CLASS_NAME_SHOW
} from '../constants/class-names'
import Vue from './vue'
import { mergeData } from 'vue-functional-data-merge'
import { getBCR, reflow, requestAF } from './dom'

// --- Utility methods ---

// Transition event handler helpers
const onEnter = el => {
  el.style.height = 0
  // Animation frame delay needed for `appear` to work
  requestAF(() => {
    reflow(el)
    el.style.height = `${el.scrollHeight}px`
  })
}

const onAfterEnter = el => {
  el.style.height = null
}

const onLeave = el => {
  el.style.height = 'auto'
  el.style.display = 'block'
  el.style.height = `${getBCR(el).height}px`
  reflow(el)
  el.style.height = 0
}

const onAfterLeave = el => {
  el.style.height = null
}

// --- Constants

// Default transition props
// `appear` will use the enter classes
const TRANSITION_PROPS = {
  css: true,
  enterClass: '',
  enterActiveClass: CLASS_NAME_COLLAPSING,
  enterToClass: [CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW].join(' '),
  leaveClass: [CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW].join(' '),
  leaveActiveClass: CLASS_NAME_COLLAPSING,
  leaveToClass: CLASS_NAME_COLLAPSE
}

// Default transition handlers
// `appear` will use the enter handlers
const TRANSITION_HANDLERS = {
  enter: onEnter,
  afterEnter: onAfterEnter,
  leave: onLeave,
  afterLeave: onAfterLeave
}

// --- Main component ---
// @vue/component
export const BVCollapse = /*#__PURE__*/ Vue.extend({
  name: 'BVCollapse',
  functional: true,
  props: {
    appear: {
      // If `true` (and `visible` is `true` on mount), animate initially visible
      type: Boolean,
      default: false
    }
  },
  render(h, { props, data, children }) {
    return h(
      'transition',
      // We merge in the `appear` prop last
      mergeData(data, { props: TRANSITION_PROPS, on: TRANSITION_HANDLERS }, { props }),
      // Note: `<transition>` supports a single root element only
      children
    )
  }
})
