// Generic collapse transion helper component
//
// applies the classes `collapse`, `show` and `collapsing`
// during hte enter/leave transition phases only
//
import Vue from './vue'
import { mergeData } from 'vue-functional-data-merge'
import { getBCR, reflow } from './dom'

// Transition event handler helpers
const onEnter = el => {
  el.style.height = 0
  reflow(el)
  el.style.height = el.scrollHeight + 'px'
}

const onAfterEnter => el {
  el.style.height = null
}

const onLeave = el => {
  el.style.height = 'auto'
  el.style.display = 'block'
  el.style.height = getBCR(el).height + 'px'
  reflow(el)
  el.style.height = 0
}

const onAfterLeave = el => {
  el.style.height = null
}

// Default transition props
const TRANS_PROPS = {
  css: true,
  enterClass: 'collapse',
  enterActiveClass: 'collapsing',
  enterToClass: 'collapse show',
  leaveClass: 'collapse show',
  leaveActiveClass: 'collapsing',
  leaveToClass: 'collapse'
}

// Default transition handlers
const TRANS_HANDLERS = {
  enter: onEnter,
  afterEnter: onAfterEnter,
  leave: onLeave,
  afterLeave: onAfterLeave
}

// @vue/component
export const BVCollapse = /*#__PURE__*/ Vue.extend({
  name: 'BVCollapse',
  functional: true,
  props: {
    appear: {
      // If true (and content is visible on mount), animate initially visible state
      type: Boolean,
      deault: false
    }
  },
  render(h, { props, data, children }) {
    return h(
      'transition',
      mergeData(data, { props: TRANS_PROPS, on: TRANS_HANDLERS }, { props }),
      children
    )
  }
})
