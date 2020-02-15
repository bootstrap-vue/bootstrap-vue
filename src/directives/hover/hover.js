// v-b-hover directive
import { isBrowser } from '../../utils/env'
import { EVENT_OPTIONS_NO_CAPTURE, eventOn, eventOff } from '../../utils/events'
import { isFunction } from '../../utils/inspect'

// --- Constants ---

const PROP = '__BV_hover_handler__'
const MOUSEENTER = 'mouseenter'
const MOUSELEAVE = 'mouseleave'

// --- Directive bind/unbind/update handler ---

const directive = (el, { value: callback }) => {
  if (isBrowser && isFunction(el[PROP]) && el[PROP] !== callback) {
    eventOff(el, MOUSEENTER, el[PROP], EVENT_OPTIONS_NO_CAPTURE)
    eventOff(el, MOUSELEAVE, el[PROP], EVENT_OPTIONS_NO_CAPTURE)
  }
  if (isBrowser && isFunction(callback) && isBrowser) {
    el[PROP] = evt => {
      // eslint-disable-next-line standard/no-callback-literal
      callback(evt.type === 'mouseenter')
    }
    eventOn(el, MOUSEENTER, el[PROP], EVENT_OPTIONS_NO_CAPTURE)
    eventOn(el, MOUSELEAVE, el[PROP], EVENT_OPTIONS_NO_CAPTURE)
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
