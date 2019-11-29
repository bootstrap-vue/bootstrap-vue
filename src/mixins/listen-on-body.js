import { concat } from '../utils/array'
import { eventOff, eventOn } from '../utils/dom'
import { isBrowser } from '../utils/env'
import { isString, isFunction } from '../utils/inspect'
import { keys } from '../utils/object'

const eventOptions = { passive: true, capture: false }

const PROP = '$_bv_bodyHandlers_'

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
      keys(this[PROP]).forEach(type => {
        const handlers = this[PROP][type] || []
        handlers.forEach(handler => {
          this.listenOffBody(type, handler)
        })
      })
      delete this[PROP]
    }
  },
  methods: {
    listenOnBody(type, handler) {
      if (isBrowser && isString(type) && isFunction(handler)) {
        this[PROP][type] = concat(this[PROP][type] || [], handler)
        eventOn(document.body, type, handler, eventOptions)
      }
    },
    listenOffBody(type, handler) {
      if (isBrowser && isString(type) && isFunction(handler)) {
        eventOff(document.body, type, handler, eventOptions)
        this[PROP][type] = (this[PROP][type] || []).filter(h => h !== handler)
      }
    }
  }
}
