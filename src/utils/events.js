import { ROOT_EVENT_NAME_PREFIX, ROOT_EVENT_NAME_SEPARATOR } from '../constants/events'
import { hasPassiveEventSupport } from './env'
import { isObject } from './inspect'
import { kebabCase } from './string'

// --- Utils ---

// Normalize event options based on support of passive option
// Exported only for testing purposes
export const parseEventOptions = options => {
  /* istanbul ignore else: can't test in JSDOM, as it supports passive */
  if (hasPassiveEventSupport) {
    return isObject(options) ? options : { capture: !!options || false }
  } else {
    // Need to translate to actual Boolean value
    return !!(isObject(options) ? options.capture : options)
  }
}

// Attach an event listener to an element
export const eventOn = (el, evtName, handler, options) => {
  if (el && el.addEventListener) {
    el.addEventListener(evtName, handler, parseEventOptions(options))
  }
}

// Remove an event listener from an element
export const eventOff = (el, evtName, handler, options) => {
  if (el && el.removeEventListener) {
    el.removeEventListener(evtName, handler, parseEventOptions(options))
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
  evt,
  { preventDefault = true, propagation = true, immediatePropagation = false } = {}
) => {
  if (preventDefault) {
    evt.preventDefault()
  }
  if (propagation) {
    evt.stopPropagation()
  }
  if (immediatePropagation) {
    evt.stopImmediatePropagation()
  }
}

// Helper method to convert a component name to a event name
// `getComponentEventName('BNavigationItem')` => 'navigation-item'
const getComponentEventName = componentName => kebabCase(componentName.substring(1))

// Get a root event name by component and event name
// `getComponentEventName('BModal', 'show')` => 'bv::modal::show'
export const getRootEventName = (componentName, eventName) =>
  [ROOT_EVENT_NAME_PREFIX, getComponentEventName(componentName), eventName].join(
    ROOT_EVENT_NAME_SEPARATOR
  )

// Get a root action event name by component and action name
// `getRootActionEventName('BModal', 'show')` => 'bv::show::modal'
export const getRootActionEventName = (componentName, actionName) =>
  [ROOT_EVENT_NAME_PREFIX, actionName, getComponentEventName(componentName)].join(
    ROOT_EVENT_NAME_SEPARATOR
  )
