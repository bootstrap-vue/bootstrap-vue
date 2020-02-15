// v-b-hover directive
import { isBrowser } from '../../utils/env'
import { EVENT_OPTIONS_NO_CAPTURE, eventOnOff } from '../../utils/events'
import { isFunction } from '../../utils/inspect'

// --- Constants ---

const HANDLER_PROP = '__BV_hover_handler__'
const LISTENER_PROP = '__BV_hover_listener__'
const MOUSEENTER = 'mouseenter'
const MOUSELEAVE = 'mouseleave'

// --- Utility methods ---

const createListener = handler => evt => {
  handler(evt.type === MOUSEENTER, evt)
}

const updateListeners = (on, el, listener) => {
  eventOnOff(on, el, MOUSEENTER, listener, EVENT_OPTIONS_NO_CAPTURE)
  eventOnOff(on, el, MOUSELEAVE, listener, EVENT_OPTIONS_NO_CAPTURE)
}

// --- Directive bind/unbind/update handler ---

const directive = (el, { value: handler = null }) => {
  /* istanbul ignore next */
  if (!isBrowser) {
    return
  }
  const currentHandler = el[HANDLER_PROP] || null
  if (currentHandler === handler) {
    return
  }
  if (isFunction(currentHandler)) {
    updateListeners(false, el, el[LISTENER_PROP])
    delete el[HANDLER_PROP]
    delete el[LISTENER_PROP]
  }
  if (isFunction(handler)) {
    el[HANDLER_PROP] = handler
    el[LISTENER_PROP] = createListener(handler)
    updateListeners(true, el, el[LISTENER_PROP])
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
