// v-b-hover directive
import {
  EVENT_NAME_MOUSEENTER,
  EVENT_NAME_MOUSELEAVE,
  EVENT_OPTIONS_NO_CAPTURE
} from '../../constants/events'
import { isBrowser } from '../../utils/env'
import { eventOnOff } from '../../utils/events'
import { isFunction } from '../../utils/inspect'

// --- Constants ---

const PROP = '__BV_hover_handler__'

// --- Utility methods ---

const createListener = handler => {
  const listener = evt => {
    handler(evt.type === EVENT_NAME_MOUSEENTER, evt)
  }
  listener.fn = handler
  return listener
}

const updateListeners = (on, el, listener) => {
  eventOnOff(on, el, EVENT_NAME_MOUSEENTER, listener, EVENT_OPTIONS_NO_CAPTURE)
  eventOnOff(on, el, EVENT_NAME_MOUSELEAVE, listener, EVENT_OPTIONS_NO_CAPTURE)
}

// --- Directive bind/unbind/update handler ---

const directive = (el, { value: handler = null }) => {
  if (isBrowser) {
    const listener = el[PROP]
    const hasListener = isFunction(listener)
    const handlerChanged = !(hasListener && listener.fn === handler)
    if (hasListener && handlerChanged) {
      updateListeners(false, el, listener)
      delete el[PROP]
    }
    if (isFunction(handler) && handlerChanged) {
      el[PROP] = createListener(handler)
      updateListeners(true, el, el[PROP])
    }
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
