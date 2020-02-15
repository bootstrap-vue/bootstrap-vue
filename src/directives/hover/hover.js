// v-b-hover directive
import { isBrowser } from '../../utils/env'
import { EVENT_OPTIONS_NO_CAPTURE, eventOnOff } from '../../utils/events'
import { isFunction } from '../../utils/inspect'

// --- Constants ---

const PROP = '__BV_hover_handler__'
const MOUSEENTER = 'mouseenter'
const MOUSELEAVE = 'mouseleave'

// --- Utility methods ---

const wrapHandler = handler => evt => {
  handler(evt.type === MOUSEENTER, evt)
}

const updateListeners = (on, el, handler) => {
  eventOnOff(on, el, MOUSEENTER, handler, EVENT_OPTIONS_NO_CAPTURE)
  eventOnOff(on, el, MOUSELEAVE, handler, EVENT_OPTIONS_NO_CAPTURE)
}

// --- Directive bind/unbind/update handler ---

const directive = (el, { value: handler = null }) => {
  if (!isBrowser) {
    return
  }
  if (handler) {
    handler = wrapHandler(handler)
  }
  const currentHandler = el[PROP] || null
  const handlerChanged = currentHandler !== handler
  if (!handlerChanged) {
    return
  }
  if (isFunction(currentHandler)) {
    updateListeners(false, el, currentHandler)
    delete el[PROP]
  }
  if (isFunction(handler)) {
    updateListeners(true, el, handler)
    el[PROP] = handler
  }
}

// VBHover directive

export const VBHover = {
  bind: directive,
  componentUpdated: directive,
  unbind(el) {
    directive(el, { value: null })
  }
}
