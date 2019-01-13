import target from '../../utils/target'
import { setAttr, addClass, removeClass } from '../../utils/dom'

// Are we client side?
const inBrowser = typeof window !== 'undefined'

// target listen types
const listenTypes = { click: true }

// Property key for handler storage
const BVT = '__BV_toggle__'

// Emitted Control Event for collapse (emitted to collapse)
const EVENT_TOGGLE = 'bv::toggle::collapse'

// Listen to Event for toggle state update (Emited by collapse)
const EVENT_STATE = 'bv::collapse::state'

export default {
  bind(el, binding, vnode) {
    const targets = target(vnode, binding, listenTypes, ({ targets, vnode }) => {
      targets.forEach(target => {
        vnode.context.$root.$emit(EVENT_TOGGLE, target)
      })
    })

    if (inBrowser && vnode.context && targets.length > 0) {
      // Add aria attributes to element
      setAttr(el, 'aria-controls', targets.join(' '))
      setAttr(el, 'aria-expanded', 'false')
      if (el.tagName !== 'BUTTON') {
        // If element is not a button, we add `role="button"` for accessibility
        setAttr(el, 'role', 'button')
      }

      // Toggle state hadnler, stored on element
      el[BVT] = function toggleDirectiveHandler(id, state) {
        if (targets.indexOf(id) !== -1) {
          // Set aria-expanded state
          setAttr(el, 'aria-expanded', state ? 'true' : 'false')
          // Set/Clear 'collapsed' class state
          if (state) {
            removeClass(el, 'collapsed')
          } else {
            addClass(el, 'collapsed')
          }
        }
      }

      // Listen for toggle state changes
      vnode.context.$root.$on(EVENT_STATE, el[BVT])
    }
  },
  unbind(el, binding, vnode) {
    if (el[BVT]) {
      // Remove our $root listener
      vnode.context.$root.$off(EVENT_STATE, el[BVT])
      el[BVT] = null
    }
  }
}
