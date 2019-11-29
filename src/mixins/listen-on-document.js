import { arrayIncludes } from '../utils/array'
import { eventOff, eventOn } from '../utils/dom'
import { isBrowser } from '../utils/env'
import { isString, isFunction } from '../utils/inspect'
import { keys } from '../utils/object'

const eventOptions = { passive: true, capture: false }

const PROP = '$_bv_documentHandlers_'

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
      keys(this[PROP]).forEach(evtName => {
        const handlers = this[PROP][evtName] || []
        handlers.forEach(handler => this.listenOffWindow(evtName, handler))
      })
      delete this[PROP]
    }
  },
  methods: {
    listenDocument(on, evtName, handler) {
      on ? this.listenOnDocument(evtName, handler) : this.listenOffDocument(evtName, handler)
    },
    listenOnDocument(evtName, handler) {
      if (isBrowser && this[PROP] && isString(evtName) && isFunction(handler)) {
        this[PROP][evtName] = this[PROP][evtName] || []
        if (!arrayIncludes(this[PROP][evtName], handler)) {
          this[PROP][evtName].push(handler)
          eventOn(document, evtName, handler, eventOptions)
        }
      }
    },
    listenOffDocument(evtName, handler) {
      if (isBrowser && this[PROP] && isString(evtName) && isFunction(handler)) {
        eventOff(document, evtName, handler, eventOptions)
        this[PROP][evtName] = (this[PROP][evtName] || []).filter(h => h !== handler)
      }
    }
  }
}
