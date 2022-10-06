import { extend } from '../vue'
import { IS_BROWSER } from '../constants/env'
import { EVENT_OPTIONS_NO_CAPTURE } from '../constants/events'
import { arrayIncludes } from '../utils/array'
import { eventOn, eventOff } from '../utils/events'
import { keys } from '../utils/object'

// --- Constants ---

const PROP = '$_windowListeners'

// --- Mixin ---

// @vue/component
export const listenOnWindowMixin = extend({
  created() {
    // Define non-reactive property
    // Object of arrays, keyed by event name,
    // where value is an array of callbacks
    this[PROP] = {}
  },
  beforeDestroy() {
    // Unregister all registered listeners
    keys(this[PROP] || {}).forEach(event => {
      this[PROP][event].forEach(callback => {
        this.listenOffWindow(event, callback)
      })
    })

    this[PROP] = null
  },
  methods: {
    registerWindowListener(event, callback) {
      if (this[PROP]) {
        this[PROP][event] = this[PROP][event] || []
        if (!arrayIncludes(this[PROP][event], callback)) {
          this[PROP][event].push(callback)
        }
      }
    },
    unregisterWindowListener(event, callback) {
      if (this[PROP] && this[PROP][event]) {
        this[PROP][event] = this[PROP][event].filter(cb => cb !== callback)
      }
    },

    listenWindow(on, event, callback) {
      on ? this.listenOnWindow(event, callback) : this.listenOffWindow(event, callback)
    },
    listenOnWindow(event, callback) {
      if (IS_BROWSER) {
        eventOn(window, event, callback, EVENT_OPTIONS_NO_CAPTURE)
        this.registerWindowListener(event, callback)
      }
    },
    listenOffWindow(event, callback) {
      if (IS_BROWSER) {
        eventOff(window, event, callback, EVENT_OPTIONS_NO_CAPTURE)
      }

      this.unregisterWindowListener(event, callback)
    }
  }
})
