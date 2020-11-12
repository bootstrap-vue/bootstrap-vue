import { defineComponent, isVue2 } from '../vue'
import { ROOT_EVENT_EMITTER_KEY } from '../constants/events'

// @vue/component
export default defineComponent({
  methods: {
    getRootEmitter() {
      return this[ROOT_EVENT_EMITTER_KEY]
    },

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
      const emitter = this.getRootEmitter()
      if (!emitter) {
        return
      }

      emitter.on(event, callback)

      // TODO: Find a way to remove root listener on destroy in Vue 3
      if (isVue2) {
        this.$on('hook:beforeDestroy', () => {
          emitter.off(event, callback)
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
      const emitter = this.getRootEmitter()
      if (!emitter) {
        return
      }

      emitter.once(event, callback)

      // TODO: Find a way to remove root listener on destroy in Vue 3
      if (isVue2) {
        this.$on('hook:beforeDestroy', () => {
          emitter.off(event, callback)
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
      const emitter = this.getRootEmitter()
      if (emitter) {
        emitter.emit(event, ...args)
      }
    }
  }
})
