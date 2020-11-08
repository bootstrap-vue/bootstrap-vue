import { defineComponent, isVue2 } from '../vue'
import { ROOT_EVENT_EMITTER_KEY } from '../constants/events'

// @vue/component
export default defineComponent({
  methods: {
    /**
     * Safely register event listeners on the root Vue node
     * While Vue automatically removes listeners for individual components,
     * when a component registers a listener on root and is destroyed,
     * this orphans a callback because the node is gone,
     * but the root does not clear the callback
     *
     * When registering a `$root` listener, it also registers a listener on
     * the component's `beforeDestroy()` hook to automatically remove the
     * event listener from the `$root` instance
     *
     * @param {string} event
     * @param {function} callback
     */
    listenOnRoot(event, callback) {
      this[ROOT_EVENT_EMITTER_KEY].on(event, callback)

      // TODO: Find a way to remove root listener on destroy in Vue 3
      if (isVue2) {
        this.$on('hook:beforeDestroy', () => {
          this[ROOT_EVENT_EMITTER_KEY].off(event, callback)
        })
      }
    },

    /**
     * Safely register a `$once()` event listener on the root Vue node
     * While Vue automatically removes listeners for individual components,
     * when a component registers a listener on root and is destroyed,
     * this orphans a callback because the node is gone,
     * but the root does not clear the callback
     *
     * When registering a $root listener, it also registers a listener on
     * the component's `beforeDestroy` hook to automatically remove the
     * event listener from the $root instance.
     *
     * @param {string} event
     * @param {function} callback
     */
    listenOnRootOnce(event, callback) {
      this[ROOT_EVENT_EMITTER_KEY].once(event, callback)

      // TODO: Find a way to remove root listener on destroy in Vue 3
      if (isVue2) {
        this.$on('hook:beforeDestroy', () => {
          this[ROOT_EVENT_EMITTER_KEY].off(event, callback)
        })
      }
    },

    /**
     * Convenience method for calling `vm.$emit()` on `vm.$root`
     *
     * @param {string} event
     * @param {*} args
     */
    emitOnRoot(event, ...args) {
      this[ROOT_EVENT_EMITTER_KEY].emit(event, ...args)
    }
  }
})
