import KeyCodes from '../../utils/key-codes'
import looseEqual from '../../utils/loose-equal'
import { arrayIncludes, concat } from '../../utils/array'
import { addClass, hasAttr, isDisabled, removeAttr, removeClass, setAttr } from '../../utils/dom'
import { isBrowser } from '../../utils/env'
import { eventOn, eventOff } from '../..//utils/events'
import { isString } from '../..//utils/inspect'
import { keys } from '../../utils/object'

// --- Constants ---

const { ENTER, SPACE } = KeyCodes

// Classes to apply to trigger element
const CLASS_BV_TOGGLE_COLLAPSED = 'collapsed'
const CLASS_BV_TOGGLE_NOT_COLLAPSED = 'not-collapsed'

// Target listen types
const listenTypes = { click: true }
const allListenTypes = { click: true, keydown: true }

// Property key for handler storage
const BV_BASE = '__BV_toggle'
const BV_TOGGLE_ROOT_HANDLER = `${BV_BASE}_HANDLER__`
const BV_TOGGLE_CLICK_HANDLER = `${BV_BASE}_CLICK__`
const BV_TOGGLE_STATE = `${BV_BASE}_STATE__`
const BV_TOGGLE_CONTROLS = `${BV_BASE}_CONTROLS__`
const BV_TOGGLE_TARGETS = `${BV_BASE}_TARGETS__`
const BV_TOGGLE_LISTENERS = `${BV_BASE}_LISTENERS__`

// Commonly used strings
const STRING_FALSE = 'false'
const STRING_TRUE = 'true'

// Commonly used attribute names
const ATTR_ARIA_CONTROLS = 'aria-controls'
const ATTR_ARIA_EXPANDED = 'aria-expanded'
const ATTR_ROLE = 'role'
const ATTR_TABINDEX = 'tabindex'

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

const keyDownEvents = [ENTER, SPACE]

const standardTags = ['BUTTON', 'A']

const RX_SPLIT_SEPARATOR = /\s+/

// --- Helper methods ---

const getTargets = ({ modifiers, arg, value }) => {
  // Any modifiers are considered target IDs
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

const removeListeners = el => {
  const listener = el[BV_TOGGLE_CLICK_HANDLER]
  if (listener) {
    eventOff(el, 'click', listener)
    eventOff(el, 'keydown', listener)
  }
  el[BV_TOGGLE_CLICK_HANDLER] = null
}

const addListeners = (el, handler) => {
  el[BV_TOGGLE_CLICK_HANDLER] = handler
  eventOn(el, 'click', handler)
  if(arrayIncludes(standardTags, el.tagName)) {
    eventOn(el, 'keydown', handler)
  }
}

const bindTargets = (vnode, binding, listenTypes, fn) => {
  const targets = getTargets(binding)

  // To trigger adding ENTER/SPACE handlers
  if (listenTypes.click && !arrayIncludes(standardTags, vnode.elm.tagName)) {
    listenTypes = { ...listenTypes, keydown: true }
  }

  const listener = evt => {
    const el = evt.currentTarget
    const ignore = evt.type === 'keydown' && !arrayIncludes(keyDownEvents, evt.keyCode)
    if (!evt.defaultPrevented && !ignore && !isDisabled(el)) {
      fn({ targets, vnode, evt })
    }
  }

  keys(allListenTypes).forEach(type => {
    if (listenTypes[type]) {
      eventOn(vnode.elm, type, listener)
      const boundListeners = vnode.elm[BV_TOGGLE_LISTENERS] || {}
      boundListeners[type] = boundListeners[type] || []
      boundListeners[type].push(listener)
      vnode.elm[BV_TOGGLE_LISTENERS] = boundListeners
    }
  })

  // Return the list of targets
  return targets
}

const unbindTargets = (vnode, binding, listenTypes) => {
  if (listenTypes.click && !arrayIncludes(standardTags, vnode.elm.tagName)) {
    listenTypes = { ...listenTypes, keydown: true }
  }

  keys(allListenTypes).forEach(type => {
    if (listenTypes[type]) {
      const boundListeners = vnode.elm[BV_TOGGLE_LISTENERS] && vnode.elm[BV_TOGGLE_LISTENERS][type]
      if (boundListeners) {
        boundListeners.forEach(listener => eventOff(vnode.elm, type, listener))
        delete vnode.elm[BV_TOGGLE_LISTENERS][type]
      }
    }
  })
}

const setToggleState = (el, state) => {
  // State refers to the visibility of the collapse/sidebar
  if (state) {
    removeClass(el, CLASS_BV_TOGGLE_COLLAPSED)
    addClass(el, CLASS_BV_TOGGLE_NOT_COLLAPSED)
    setAttr(el, ATTR_ARIA_EXPANDED, STRING_TRUE)
  } else {
    removeClass(el, CLASS_BV_TOGGLE_NOT_COLLAPSED)
    addClass(el, CLASS_BV_TOGGLE_COLLAPSED)
    setAttr(el, ATTR_ARIA_EXPANDED, STRING_FALSE)
  }
}

// Reset and remove a property from the provided element
const resetProp = (el, prop) => {
  el[prop] = null
  delete el[prop]
}

// Handle targets update
const handleTargets = ({ targets, vnode, evt }) => {
  if (!evt.defaultPrevented && !isDisabled(evt.currentTarget)) {
    targets.forEach(target => {
      vnode.context.$root.$emit(EVENT_TOGGLE, target)
    })
  }
}

// Handle directive updates
const handleUpdate = (el, binding, vnode) => {
  if (!isBrowser || !vnode.context) {
    return
  }

  // If targets array has changed, reset stuff
  if (!looseEqual(getTargets(binding), el[BV_TOGGLE_TARGETS])) {
    unbindTargets(vnode, binding, listenTypes)
    const targets = getTargets(binding)
    bindTargets(vnode, binding, listenTypes, handleTargets)
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
    // Request a state update from targets so that we can
    // ensure expanded state is correct (in most cases)
    targets.forEach(target => {
      vnode.context.$root.$emit(EVENT_STATE_REQUEST, target)
    })
  }

  // If element is not a button or link, we add `role="button"`
  // and `tabindex="0"` for accessibility reasons
  if (!arrayIncludes(standardTags, el.tagName)) {
    if (!hasAttr(el, ATTR_ROLE)) {
      setAttr(el, ATTR_ROLE, 'button')
    }
    if (!hasAttr(el, ATTR_TABINDEX)) {
      setAttr(el, ATTR_TABINDEX, '0')
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
    // Assume no targets initially
    el[BV_TOGGLE_TARGETS] = []

    // Toggle state handler
    el[BV_TOGGLE_ROOT_HANDLER] = (id, state) => {
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
      vnode.context.$root.$on(EVENT_STATE, el[BV_TOGGLE_ROOT_HANDLER])
      // Listen for toggle state sync (private)
      vnode.context.$root.$on(EVENT_STATE_SYNC, el[BV_TOGGLE_ROOT_HANDLER])
    }

    // Initial update of trigger
    handleUpdate(el, binding, vnode)
  },
  componentUpdated: handleUpdate,
  // updated: handleUpdate,
  unbind(el, binding, vnode) /* istanbul ignore next */ {
    unbindTargets(vnode, binding, listenTypes)
    // Remove our $root listener
    if (el[BV_TOGGLE_ROOT_HANDLER]) {
      vnode.context.$root.$off(EVENT_STATE, el[BV_TOGGLE_ROOT_HANDLER])
      vnode.context.$root.$off(EVENT_STATE_SYNC, el[BV_TOGGLE_ROOT_HANDLER])
    }
    removeListeners(el)
    // Reset custom props
    resetProp(el, BV_TOGGLE_ROOT_HANDLER)
    resetProp(el, BV_TOGGLE_STATE)
    resetProp(el, BV_TOGGLE_CONTROLS)
    resetProp(el, BV_TOGGLE_TARGETS)
    resetProp(el, BV_TOGGLE_LISTENERS)
    // Reset classes/attrs
    removeClass(el, CLASS_BV_TOGGLE_COLLAPSED)
    removeClass(el, CLASS_BV_TOGGLE_NOT_COLLAPSED)
    removeAttr(el, ATTR_ARIA_EXPANDED)
    removeAttr(el, ATTR_ARIA_CONTROLS)
    removeAttr(el, ATTR_ROLE)
  }
}
