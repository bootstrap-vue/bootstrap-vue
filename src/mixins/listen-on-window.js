import { concat } from '../utils/array'
import { eventOff, eventOn } from '../utils/dom'
import { isBrowser } from '../utils/env'
import { isString, isFunction } from '../utils/inspect'
import { keys } from '../utils/object'

const eventOptions = { passive: true, capture: false }

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
      keys(this[PROP]).forEach(type => {
        const handlers = this[PROP][type] || []
        handlers.forEach(handler => {
          this.listenOffWindow(type, handler)
        })
      })
    }
  },
  methods: {
    listenWindow(on, type, handler) {
      on ? this.listenOnWindow(type, handler) : this.listenOffWindow(type, handler)
    },
    listenOnWindow(type, handler) {
      if (isBrowser && isString(type) && isFunction(handler) && this[PROP]) {
        this[PROP][type] = concat(this[PROP][type] || [], handler)
        eventOn(window, type, handler, eventOptions)
      }
    },
    listenOffWindow(type, handler) {
      if (isBrowser && isString(type) && isFunction(handler) && this[PROP]) {
        eventOff(window, type, handler, eventOptions)
        this[PROP][type] = (this[PROP][type] || []).filter(h => h !== handler)
      }
    }
  }
}
