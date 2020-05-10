import looseEqual from '../../utils/loose-equal'
import { arrayIncludes, concat } from '../../utils/array'
import { addClass, hasAttr, removeAttr, removeClass, setAttr } from '../../utils/dom'
import { isString } from '../../utils/inspect'
import { isBrowser } from '../../utils/env'
import { keys } from '../../utils/object'
import { bindTargets, unbindTargets } from '../../utils/target'

// --- Constants ---

// Classes to apply to trigger element
const CLASS_VBTOGGLE_COLLAPSED = 'collapsed'
const CLASS_VBTOGGLE_NOT_COLLAPSED = 'not-collapsed'

// Target listen types
const listenTypes = { click: true }

// Property key for handler storage
const BV_TOGGLE_HANDLER = '__BV_toggle_HANDLER__'
const BV_TOGGLE_STATE = '__BV_toggle_STATE__'
const BV_TOGGLE_CONTROLS = '__BV_toggle_CONTROLS__'
const BV_TOGGLE_TARGETS = '__BV_toggle_TARGETS__'

// Commonly used Strings
const STRING_FALSE = 'false'
const STRING_TRUE = 'true'
const ATTR_ARIA_CONTROLS = 'aria-controls'
const ATTR_ARIA_EXPANDED = 'aria-expanded'
const ATTR_ROLE = 'role'

// Emitted control event for collapse (emitted to collapse)
export const EVENT_TOGGLE = 'bv::toggle::collapse'

// Listen to event for toggle state update (emitted by collapse)
export const EVENT_STATE = 'bv::collapse::state'

// Private event emitted on `$root` to ensure the toggle state is always synced
// Gets emitted even if the state of b-collapse has not changed
// This event is NOT to be documented as people should not be using it
export const EVENT_STATE_SYNC = 'bv::collapse::sync::state'
// Private event we send to collapse to request state update sync event
export const EVENT_STATE_REQUEST = 'bv::request::collapse::state'

const RX_SPLIT_SEPARATOR = /\s+/

// --- Helper methods ---

// Parse binding for tagets
const getTargets = ({ modifiers, arg, value }) => {
  // Any modifiers are condisered target IDs
  const targets = keys(modifiers || {})

  // If value is a string, split out individual targets (if space delimited)
  value = isString(value) ? value.split(RX_SPLIT_SEPARATOR) : value

  // Add ID from `arg` (if provided), and support value
  // as a single string ID or an array of string IDs
  // If `value` is not an array or string, then it gets filtered out
  concat(arg, value).forEach(t => isString(t) && targets.push(t))

  // Return only unique and truthy target IDs
  return targets.filter((t, index, arr) => t && arr.indexOf(t) === index)
}

const setToggleState = (el, state) => {
  // State refers to the visibility of the collapse/sidebar
  if (state) {
    removeClass(el, CLASS_VBTOGGLE_COLLAPSED)
    addClass(el, CLASS_VBTOGGLE_NOT_COLLAPSED)
    setAttr(el, ATTR_ARIA_EXPANDED, STRING_TRUE)
  } else {
    removeClass(el, CLASS_VBTOGGLE_NOT_COLLAPSED)
    addClass(el, CLASS_VBTOGGLE_COLLAPSED)
    setAttr(el, ATTR_ARIA_EXPANDED, STRING_FALSE)
  }
}

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
  if (!isBrowser || !vnode.context) {
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
    /* istanbul ignore else */
    if (el[BV_TOGGLE_CONTROLS]) {
      setAttr(el, ATTR_ARIA_CONTROLS, el[BV_TOGGLE_CONTROLS])
    } else {
      removeAttr(el, ATTR_ARIA_CONTROLS)
    }
    // Request a state update from targets so that we can ensure
    // expanded state is correct
    targets.forEach(target => {
      vnode.context.$root.$emit(EVENT_STATE_REQUEST, target)
    })
  }

  // If element is not a button or link, we add `role="button"`
  // and `tabindex="0"` for accessibility reasons
  if (el.tagName !== 'BUTTON' && el.tagName !== 'A') {
    if (!hasAttr(el, 'role')) {
      setAttr(el, 'role', 'button')
    }
    if (!hasAttr(el, 'tabindex')) {
      setAttr(el, 'tabindex', '0')
    }
  }

  // Ensure the collapse class and aria-* attributes persist
  // after element is updated (either by parent re-rendering
  // or changes to this element or its contents)
  setToggleState(el, el[BV_TOGGLE_STATE])
}

/*
 * Export our directive
 */
export const VBToggle = {
  bind(el, binding, vnode) {
    // State is initially collapsed until we receive a state event
    el[BV_TOGGLE_STATE] = false
    el[BV_TOGGLE_TARGETS] = []

    // Toggle state handler
    el[BV_TOGGLE_HANDLER] = (id, state) => {
      // `state` will be true of target is expanded
      const targets = el[BV_TOGGLE_TARGETS] || []
      if (arrayIncludes(targets, id)) {
        // Set/Clear 'collapsed' visibility class state
        el[BV_TOGGLE_STATE] = state
        // Set aria-expanded and class state on trigger element
        setToggleState(el, state)
      }
    }

    if (vnode.context) {
      // Listen for toggle state changes (public)
      vnode.context.$root.$on(EVENT_STATE, el[BV_TOGGLE_HANDLER])
      // Listen for toggle state sync (private)
      vnode.context.$root.$on(EVENT_STATE_SYNC, el[BV_TOGGLE_HANDLER])
    }

    // Initial update of trigger
    handleUpdate(el, binding, vnode)
  },
  componentUpdated: handleUpdate,
  updated: handleUpdate,
  unbind(el, binding, vnode) /* istanbul ignore next */ {
    unbindTargets(vnode, binding, listenTypes)
    // Remove our $root listener
    if (el[BV_TOGGLE_HANDLER]) {
      vnode.context.$root.$off(EVENT_STATE, el[BV_TOGGLE_HANDLER])
      vnode.context.$root.$off(EVENT_STATE_SYNC, el[BV_TOGGLE_HANDLER])
    }
    // Reset custom props
    resetProp(el, BV_TOGGLE_HANDLER)
    resetProp(el, BV_TOGGLE_STATE)
    resetProp(el, BV_TOGGLE_CONTROLS)
    resetProp(el, BV_TOGGLE_TARGETS)
    // Reset classes/attrs
    removeClass(el, CLASS_VBTOGGLE_COLLAPSED)
    removeClass(el, CLASS_VBTOGGLE_NOT_COLLAPSED)
    removeAttr(el, ATTR_ARIA_EXPANDED)
    removeAttr(el, ATTR_ARIA_CONTROLS)
    removeAttr(el, ATTR_ROLE)
  }
}
