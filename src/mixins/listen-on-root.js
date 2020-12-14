import { Vue } from '../vue'
import { HOOK_EVENT_NAME_BEFORE_DESTROY } from '../constants/events'

// @vue/component
export const listenOnRootMixin = Vue.extend({
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
      this.$root.$on(event, callback)
      this.$on(HOOK_EVENT_NAME_BEFORE_DESTROY, () => {
        this.$root.$off(event, callback)
      })
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
      this.$root.$once(event, callback)
      this.$on(HOOK_EVENT_NAME_BEFORE_DESTROY, () => {
        this.$root.$off(event, callback)
      })
    },

    /**
     * Convenience method for calling `vm.$emit()` on `vm.$root`
     *
     * @param {string} event
     * @param {*} args
     */
    emitOnRoot(event, ...args) {
      this.$root.$emit(event, ...args)
    }
  }
})
