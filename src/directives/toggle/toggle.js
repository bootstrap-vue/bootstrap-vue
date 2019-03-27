import target from '../../utils/target'
import { setAttr, addClass, removeClass } from '../../utils/dom'
import { inBrowser } from '../../utils/env'

// target listen types
const listenTypes = { click: true }

// Property key for handler storage
const BVT = '__BV_toggle__'
const BVTS = '__BV_toggle_STATE__'
const BVTC = '__BV_toggle_CONTROLS__'

// Emitted Control Event for collapse (emitted to collapse)
const EVENT_TOGGLE = 'bv::toggle::collapse'

// Listen to Event for toggle state update (Emited by collapse)
const EVENT_STATE = 'bv::collapse::state'

const handleUpdate(el, binding, vnode) /* istanbul ignore next */ {
  // Ensure the collapse class and aria-* attributes persist
  // after element is updated (eitehr by parent re-rendering
  // or changes to this element or it's contents.
  if (inBrowser) {
    if (el[BVT_STATE] === true) {
      addClass(el, 'collapsed')
      setAttr(el, 'aria-expanded', 'true')
    } else if (el[BVT_STATE] === false) {
      removeClass(el, 'collapsed')
      setAttr(el, 'aria-expanded', 'false')
    }
    setAttr(el, 'aria-controls', el[BVT_CONTROLS])
  }
}

export default {
  bind(el, binding, vnode) {
    const targets = target(vnode, binding, listenTypes, ({ targets, vnode }) => {
      targets.forEach(target => {
        vnode.context.$root.$emit(EVENT_TOGGLE, target)
      })
    })

    if (inBrowser && vnode.context && targets.length > 0) {
      // Add aria attributes to element
      el[BVT_CONTROLS] = targets.join(' ')
      // state is initialy collapsed until we receive a state event
      el[BVT_STATE] = false
      setAttr(el, 'aria-controls', el[BVT_CONTROLS])
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
          el[BVT_STATE] = state
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
  componentUpdated: handleUpdate,
  updated: handleUpdate,
  unbind(el, binding, vnode) /* istanbul ignore next */ {
    if (el[BVT]) {
      // Remove our $root listener
      vnode.context.$root.$off(EVENT_STATE, el[BVT])
      el[BVT] = null
      el[BVT_STATE] = null
      el[BVT_CONTROLS] = null
    }
  }
}
