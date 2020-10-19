// Generic collapse transion helper component
//
// Note:
//   Applies the classes `collapse`, `show` and `collapsing`
//   during the enter/leave transition phases only
//   Although it appears that Vue may be leaving the classes
//   in-place after the transition completes
import Vue, { mergeData } from '../vue'
import { NAME_COLLAPSE_HELPER } from '../constants/components'
import { getBCR, reflow, removeStyle, requestAF, setStyle } from './dom'

// Transition event handler helpers
const onEnter = el => {
  setStyle(el, 'height', 0)
  // In a `requestAF()` for `appear` to work
  requestAF(() => {
    reflow(el)
    setStyle(el, 'height', `${el.scrollHeight}px`)
  })
}

const onAfterEnter = el => {
  removeStyle(el, 'height')
}

const onLeave = el => {
  setStyle(el, 'height', 'auto')
  setStyle(el, 'display', 'block')
  setStyle(el, 'height', `${getBCR(el).height}px`)
  reflow(el)
  setStyle(el, 'height', 0)
}

const onAfterLeave = el => {
  removeStyle(el, 'height')
}

// Default transition props
// `appear` will use the enter classes
const TRANSITION_PROPS = {
  css: true,
  enterClass: '',
  enterActiveClass: 'collapsing',
  enterToClass: 'collapse show',
  leaveClass: 'collapse show',
  leaveActiveClass: 'collapsing',
  leaveToClass: 'collapse'
}

// Default transition handlers
// `appear` will use the enter handlers
const TRANSITION_HANDLERS = {
  enter: onEnter,
  afterEnter: onAfterEnter,
  leave: onLeave,
  afterLeave: onAfterLeave
}

// @vue/component
export const BVCollapse = /*#__PURE__*/ Vue.extend({
  name: NAME_COLLAPSE_HELPER,
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
