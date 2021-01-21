import { HAS_PASSIVE_EVENT_SUPPORT } from '../constants/env'
import { ROOT_EVENT_NAME_PREFIX, ROOT_EVENT_NAME_SEPARATOR } from '../constants/events'
import { RX_BV_PREFIX } from '../constants/regex'
import { isObject } from './inspect'
import { kebabCase } from './string'

// --- Utils ---

// Normalize event options based on support of passive option
// Exported only for testing purposes
export const parseEventOptions = options => {
  /* istanbul ignore else: can't test in JSDOM, as it supports passive */
  if (HAS_PASSIVE_EVENT_SUPPORT) {
    return isObject(options) ? options : { capture: !!options || false }
  } else {
    // Need to translate to actual Boolean value
    return !!(isObject(options) ? options.capture : options)
  }
}

// Attach an event listener to an element
export const eventOn = (el, eventName, handler, options) => {
  if (el && el.addEventListener) {
    el.addEventListener(eventName, handler, parseEventOptions(options))
  }
}

// Remove an event listener from an element
export const eventOff = (el, eventName, handler, options) => {
  if (el && el.removeEventListener) {
    el.removeEventListener(eventName, handler, parseEventOptions(options))
  }
}

// Utility method to add/remove a event listener based on first argument (boolean)
// It passes all other arguments to the `eventOn()` or `eventOff` method
export const eventOnOff = (on, ...args) => {
  const method = on ? eventOn : eventOff
  method(...args)
}

// Utility method to prevent the default event handling and propagation
export const stopEvent = (
  event,
  { preventDefault = true, propagation = true, immediatePropagation = false } = {}
) => {
  if (preventDefault) {
    event.preventDefault()
  }
  if (propagation) {
    event.stopPropagation()
  }
  if (immediatePropagation) {
    event.stopImmediatePropagation()
  }
}

// Helper method to convert a component/directive name to a base event name
// `getBaseEventName('BNavigationItem')` => 'navigation-item'
// `getBaseEventName('BVToggle')` => 'toggle'
const getBaseEventName = value => kebabCase(value.replace(RX_BV_PREFIX, ''))

// Get a root event name by component/directive and event name
// `getBaseEventName('BModal', 'show')` => 'bv::modal::show'
export const getRootEventName = (name, eventName) =>
  [ROOT_EVENT_NAME_PREFIX, getBaseEventName(name), eventName].join(ROOT_EVENT_NAME_SEPARATOR)

// Get a root action event name by component/directive and action name
// `getRootActionEventName('BModal', 'show')` => 'bv::show::modal'
export const getRootActionEventName = (name, actionName) =>
  [ROOT_EVENT_NAME_PREFIX, actionName, getBaseEventName(name)].join(ROOT_EVENT_NAME_SEPARATOR)
