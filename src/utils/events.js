import { hasPassiveEventSupport } from './env'
import { isObject } from './inspect'

// --- Constants ---

export const EVENT_OPTIONS_PASSIVE = { passive: true }
export const EVENT_OPTIONS_NO_CAPTURE = { passive: true, capture: false }

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
