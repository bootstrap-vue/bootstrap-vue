import { extend } from '../vue'
import { arrayIncludes } from '../utils/array'
import { keys } from '../utils/object'
import { getEventRoot } from '../utils/get-event-root'
// --- Constants ---

const PROP = '$_rootListeners'

// --- Mixin ---

// @vue/component
export const listenOnRootMixin = extend({
  computed: {
    bvEventRoot() {
      return getEventRoot(this)
    }
  },
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
        this.listenOffRoot(event, callback)
      })
    })

    this[PROP] = null
  },
  methods: {
    registerRootListener(event, callback) {
      if (this[PROP]) {
        this[PROP][event] = this[PROP][event] || []
        if (!arrayIncludes(this[PROP][event], callback)) {
          this[PROP][event].push(callback)
        }
      }
    },
    unregisterRootListener(event, callback) {
      if (this[PROP] && this[PROP][event]) {
        this[PROP][event] = this[PROP][event].filter(cb => cb !== callback)
      }
    },

    /**
     * Safely register event listeners on the root Vue node
     * While Vue automatically removes listeners for individual components,
     * when a component registers a listener on `$root` and is destroyed,
     * this orphans a callback because the node is gone, but the `$root`
     * does not clear the callback
     *
     * When registering a `$root` listener, it also registers the listener
     * to be removed in the component's `beforeDestroy()` hook
     *
     * @param {string} event
     * @param {function} callback
     */
    listenOnRoot(event, callback) {
      if (this.bvEventRoot) {
        this.bvEventRoot.$on(event, callback)
        this.registerRootListener(event, callback)
      }
    },

    /**
     * Safely register a `$once()` event listener on the root Vue node
     * While Vue automatically removes listeners for individual components,
     * when a component registers a listener on `$root` and is destroyed,
     * this orphans a callback because the node is gone, but the `$root`
     * does not clear the callback
     *
     * When registering a `$root` listener, it also registers the listener
     * to be removed in the component's `beforeDestroy()` hook
     *
     * @param {string} event
     * @param {function} callback
     */
    listenOnRootOnce(event, callback) {
      if (this.bvEventRoot) {
        const _callback = (...args) => {
          this.unregisterRootListener(_callback)
          // eslint-disable-next-line node/no-callback-literal
          callback(...args)
        }

        this.bvEventRoot.$once(event, _callback)
        this.registerRootListener(event, _callback)
      }
    },

    /**
     * Safely unregister event listeners from the root Vue node
     *
     * @param {string} event
     * @param {function} callback
     */
    listenOffRoot(event, callback) {
      this.unregisterRootListener(event, callback)

      if (this.bvEventRoot) {
        this.bvEventRoot.$off(event, callback)
      }
    },

    /**
     * Convenience method for calling `vm.$emit()` on `$root`
     *
     * @param {string} event
     * @param {*} args
     */
    emitOnRoot(event, ...args) {
      if (this.bvEventRoot) {
        this.bvEventRoot.$emit(event, ...args)
      }
    }
  }
})
