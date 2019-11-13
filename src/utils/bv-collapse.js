// Generic collapse transion helper component
//
// Note:
//   Applies the classes `collapse`, `show` and `collapsing`
//   during the enter/leave transition phases only
import Vue from './vue'
import { mergeData } from 'vue-functional-data-merge'
import { getBCR, reflow, requestAF } from './dom'

// Transition event handler helpers
const onEnter = el => {
  el.style.height = 0
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

// Default transition props
const TRANSITION_PROPS = {
  css: true,
  enterClass: '',
  enterActiveClass: 'collapsing',
  enterToClass: 'collapse show',
  leaveClass: 'collapse show',
  leaveActiveClass: 'collapsing',
  leaveToClass: 'collapse'
}

const APPEAR_TRANSITION_PROPS = {
  ...TRANSITION_PROPS,
  appearClass: '',
  appearActiveClass: 'collapsing',
  appearToClass: 'collapse show'
}

// Default transition handlers
const TRANSITION_HANDLERS = {
  enter: onEnter,
  afterEnter: onAfterEnter,
  leave: onLeave,
  afterLeave: onAfterLeave
}

const APPEAR_TRANSITION_HANDLERS = {
  ...TRANSITION_HANDLERS,
  appear: onEnter,
  afterAppear: onAfterEnter
}

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
    const transitionProps = props.appear ? APPEAR_TRANSITION_PROPS : TRANSITION_PROPS
    const transitionHandlers = props.appear ? APPEAR_TRANSITION_HANDLERS : TRANSITION_HANDLERS
    return h(
      'transition',
      mergeData(data, { props: transitionProps, on: transitionHandlers }, { props }),
      children
    )
  }
})
