import { arrayIncludes } from '../utils/array'
import { eventOff, eventOn } from '../utils/dom'
import { isBrowser } from '../utils/env'
import { isString, isFunction } from '../utils/inspect'
import { keys } from '../utils/object'

const eventOptions = { passive: true, capture: false }

const PROP = '$_bv_documentHandlers_'

// @vue/component
export default {
  created() {
    /* istanbul ignore next */
    if (!isBrowser) {
      return
    }
    // Declare non-reactive property
    // Object of arrays, keyed by event name,
    // where value is an array of handlers
    // Prop will be defined on client only
    this[PROP] = {}
    // Set up our beforeDestroy handler (client only)
    this.$once('hook:beforeDestroy', () => {
      const items = this[PROP] || {}
      // Immediately delete this[PROP] to prevent the
      // listenOn/Off methods from running (which may occur
      // due to requestAnimationFrame/transition delays)
      delete this[PROP]
      // Remove all registered event handlers
      keys(items).forEach(evtName => {
        const handlers = items[evtName] || []
        handlers.forEach(handler => eventOff(document, evtName, handler, eventOptions))
      })
    })
  },
  methods: {
    listenDocument(on, evtName, handler) {
      on ? this.listenOnDocument(evtName, handler) : this.listenOffDocument(evtName, handler)
    },
    listenOnDocument(evtName, handler) {
      if (this[PROP] && isString(evtName) && isFunction(handler)) {
        this[PROP][evtName] = this[PROP][evtName] || []
        if (!arrayIncludes(this[PROP][evtName], handler)) {
          this[PROP][evtName].push(handler)
          eventOn(document, evtName, handler, eventOptions)
        }
      }
    },
    listenOffDocument(evtName, handler) {
      if (this[PROP] && isString(evtName) && isFunction(handler)) {
        eventOff(document, evtName, handler, eventOptions)
        this[PROP][evtName] = (this[PROP][evtName] || []).filter(h => h !== handler)
      }
    }
  }
}
