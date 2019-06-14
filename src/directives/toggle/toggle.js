import looseEqual from '../../utils/loose-equal'
import { addClass, removeAttr, removeClass, setAttr } from '../../utils/dom'
import { isBrowser } from '../../utils/env'
import { bindTargets, getTargets, unbindTargets } from '../../utils/target'

// Target listen types
const listenTypes = { click: true }

// Property key for handler storage
const BV_TOGGLE = '__BV_toggle__'
const BV_TOGGLE_STATE = '__BV_toggle_STATE__'
const BV_TOGGLE_CONTROLS = '__BV_toggle_CONTROLS__'
const BV_TOGGLE_TARGETS = '__BV_toggle_TARGETS__'

// Emitted control event for collapse (emitted to collapse)
const EVENT_TOGGLE = 'bv::toggle::collapse'

// Listen to event for toggle state update (emitted by collapse)
const EVENT_STATE = 'bv::collapse::state'

// Private event emitted on $root to ensure the toggle state is always synced.
// Gets emitted even if the state of b-collapse has not changed.
// This event is NOT to be documented as people should not be using it.
const EVENT_STATE_SYNC = 'bv::collapse::sync::state'
// Private event we send to collapse to request state update sync event
const EVENT_STATE_REQUEST = 'bv::request::collapse::state'

// Reset and remove a property from the provided element
const resetProp = (el, prop) => {
  el[prop] = null
  delete el[prop]
}

// Handle targets update
const handleTargets = ({ targets, vnode }) => {
  targets.forEach(target => {
    vnode.context.$root.$emit(EVENT_TOGGLE, target)
  })
}

// Handle directive updates
/* istanbul ignore next: not easy to test */
const handleUpdate = (el, binding, vnode) => {
  if (!isBrowser) {
    return
  }

  if (!looseEqual(getTargets(binding), el[BV_TOGGLE_TARGETS])) {
    // Targets have changed, so update accordingly
    unbindTargets(vnode, binding, listenTypes)
    const targets = bindTargets(vnode, binding, listenTypes, handleTargets)
    // Update targets array to element
    el[BV_TOGGLE_TARGETS] = targets
    // Add aria attributes to element
    el[BV_TOGGLE_CONTROLS] = targets.join(' ')
    // ensure aria-controls is up to date
    setAttr(el, 'aria-controls', el[BV_TOGGLE_CONTROLS])
    // Request a state update from targets so that we can ensure
    // expanded state is correct
    targets.forEach(target => {
      vnode.context.$root.$emit(EVENT_STATE_REQUEST, target)
    })
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
export const VBToggle = {
  bind(el, binding, vnode) {
    const targets = bindTargets(vnode, binding, listenTypes, handleTargets)
    if (isBrowser && vnode.context && targets.length > 0) {
      // Add targets array to element
      el[BV_TOGGLE_TARGETS] = targets
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
        const targets = el[BV_TOGGLE_TARGETS] || []
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

      // Listen for toggle state changes (public)
      vnode.context.$root.$on(EVENT_STATE, el[BV_TOGGLE])
      // Listen for toggle state sync (private)
      vnode.context.$root.$on(EVENT_STATE_SYNC, el[BV_TOGGLE])
    }
  },
  componentUpdated: handleUpdate,
  updated: handleUpdate,
  unbind(el, binding, vnode) /* istanbul ignore next */ {
    unbindTargets(vnode, binding, listenTypes)
    // Remove our $root listener
    if (el[BV_TOGGLE]) {
      vnode.context.$root.$off(EVENT_STATE, el[BV_TOGGLE])
      vnode.context.$root.$off(EVENT_STATE_SYNC, el[BV_TOGGLE])
    }
    // Reset custom  props
    resetProp(el, BV_TOGGLE)
    resetProp(el, BV_TOGGLE_STATE)
    resetProp(el, BV_TOGGLE_CONTROLS)
    resetProp(el, BV_TOGGLE_TARGETS)
    // Reset classes/attrs
    removeClass(el, 'collapsed')
    removeAttr(el, 'aria-expanded')
    removeAttr(el, 'aria-controls')
    removeAttr(el, 'role')
  }
}

export default VBToggle
