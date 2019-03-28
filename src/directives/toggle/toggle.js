import { setAttr, removeAttr, addClass, removeClass } from '../../utils/dom'
import { inBrowser } from '../../utils/env'
import { bindTargets, unbindTargets } from '../../utils/target'

// Target listen types
const listenTypes = { click: true }

// Property key for handler storage
const BV_TOGGLE = '__BV_toggle__'
const BV_TOGGLE_STATE = '__BV_toggle_STATE__'
const BV_TOGGLE_CONTROLS = '__BV_toggle_CONTROLS__'

// Emitted control event for collapse (emitted to collapse)
const EVENT_TOGGLE = 'bv::toggle::collapse'

// Listen to event for toggle state update (emitted by collapse)
const EVENT_STATE = 'bv::collapse::state'

// Reset and remove a property from the provided element
const resetProp = (el, prop) => {
  el[prop] = null
  delete el[prop]
}

// Handle directive updates
/* istanbul ignore next: not easy to test */
const handleUpdate = (el, binding, vnode) => {
  if (!inBrowser) {
    return
  }
  // Ensure the collapse class and aria-* attributes persist
  // after element is updated (either by parent re-rendering
  // or changes to this element or it's contents
  if (el[BV_TOGGLE_STATE] === true) {
    addClass(el, 'collapsed')
    setAttr(el, 'aria-expanded', 'true')
  } else if (el[BV_TOGGLE_STATE] === false) {
    removeClass(el, 'collapsed')
    setAttr(el, 'aria-expanded', 'false')
  }
  setAttr(el, 'aria-controls', el[BV_TOGGLE_CONTROLS])
}

/*
 * Export our directive
 */
export default {
  bind(el, binding, vnode) {
    const targets = bindTargets(vnode, binding, listenTypes, ({ targets, vnode }) => {
      targets.forEach(target => {
        vnode.context.$root.$emit(EVENT_TOGGLE, target)
      })
    })

    if (inBrowser && vnode.context && targets.length > 0) {
      // Add aria attributes to element
      el[BV_TOGGLE_CONTROLS] = targets.join(' ')
      // State is initially collapsed until we receive a state event
      el[BV_TOGGLE_STATE] = false
      setAttr(el, 'aria-controls', el[BV_TOGGLE_CONTROLS])
      setAttr(el, 'aria-expanded', 'false')
      // If element is not a button, we add `role="button"` for accessibility
      if (el.tagName !== 'BUTTON') {
        setAttr(el, 'role', 'button')
      }

      // Toggle state handler, stored on element
      el[BV_TOGGLE] = function toggleDirectiveHandler(id, state) {
        if (targets.indexOf(id) !== -1) {
          // Set aria-expanded state
          setAttr(el, 'aria-expanded', state ? 'true' : 'false')
          // Set/Clear 'collapsed' class state
          el[BV_TOGGLE_STATE] = state
          if (state) {
            removeClass(el, 'collapsed')
          } else {
            addClass(el, 'collapsed')
          }
        }
      }

      // Listen for toggle state changes
      vnode.context.$root.$on(EVENT_STATE, el[BV_TOGGLE])
    }
  },
  componentUpdated: handleUpdate,
  updated: handleUpdate,
  unbind(el, binding, vnode) /* istanbul ignore next */ {
    unbindTargets(vnode, binding, listenTypes)
    // Remove our $root listener
    if (el[BV_TOGGLE]) {
      vnode.context.$root.$off(EVENT_STATE, el[BV_TOGGLE])
    }
    // Reset custom  props
    resetProp(el, BV_TOGGLE)
    resetProp(el, BV_TOGGLE_STATE)
    resetProp(el, BV_TOGGLE_CONTROLS)
    // Reset classes/attrs
    removeClass(el, 'collapsed')
    removeAttr(el, 'aria-expanded')
    removeAttr(el, 'aria-controls')
    removeAttr(el, 'role')
  }
}
