import { arrayIncludes } from '../utils/array'
import { isBrowser } from '../utils/env'
import { EVENT_OPTIONS_NO_CAPTURE, eventOn, eventOff } from '../utils/events'
import { isString, isFunction } from '../utils/inspect'
import { keys } from '../utils/object'

const PROP = '$_bv_windowHandlers_'

// @vue/component
export default {
  beforeCreate() {
    // Declare non-reactive property
    // Object of arrays, keyed by event name,
    // where value is an array of handlers
    this[PROP] = {}
  },
  beforeDestroy() {
    if (isBrowser) {
      const items = this[PROP]
      // Immediately delete this[PROP] to prevent the
      // listenOn/Off methods from running (which may occur
      // due to requestAnimationFrame delays)
      delete this[PROP]
      // Remove all registered event handlers
      keys(items).forEach(evtName => {
        const handlers = items[evtName] || []
        handlers.forEach(handler => eventOff(window, evtName, handler, EVENT_OPTIONS_NO_CAPTURE))
      })
    }
  },
  methods: {
    listenWindow(on, evtName, handler) {
      on ? this.listenOnWindow(evtName, handler) : this.listenOffWindow(evtName, handler)
    },
    listenOnWindow(evtName, handler) {
      if (isBrowser && this[PROP] && isString(evtName) && isFunction(handler)) {
        this[PROP][evtName] = this[PROP][evtName] || []
        if (!arrayIncludes(this[PROP][evtName], handler)) {
          this[PROP][evtName].push(handler)
          eventOn(window, evtName, handler, EVENT_OPTIONS_NO_CAPTURE)
        }
      }
    },
    listenOffWindow(evtName, handler) {
      if (isBrowser && this[PROP] && isString(evtName) && isFunction(handler)) {
        eventOff(window, evtName, handler, EVENT_OPTIONS_NO_CAPTURE)
        this[PROP][evtName] = (this[PROP][evtName] || []).filter(h => h !== handler)
      }
    }
  }
}
