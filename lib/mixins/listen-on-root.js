/**
 * Issue #569: collapse::toggle::state triggered too many times
 * @link https://github.com/bootstrap-vue/bootstrap-vue/issues/569
 */
export default {
    data() {
        return {
            // This should not be altered by anything apart from this mixin.
            _bv_root_listeners: []
        }
    },

    methods: {
        /**
         * Safely register event listeners on the root Vue node.
         * While Vue automatically removes listeners for individual components,
         * when a component registers a listener on root and is destroyed,
         * this orphans a callback because the node is gone,
         * but the root does not clear the callback.
         * @param {string} event
         * @param {function} callback
         * @chainable
         */
        listenOnRoot(event, callback) {
            this.$data._bv_root_listeners.push({ event, callback })
            this.$root.$on(event, callback)

            return this
        },

        /**
         * Convenience method for calling vm.$emit on vm.$root.
         * @param {string} event
         * @param {*} args
         * @chainable
         */
        emitOnRoot(event, ...args) {
            this.$root.$emit(event, ...args)

            return this
        }
    },

    destroyed() {
        while (this.$data._bv_root_listeners.length > 0) {
            // shift to process in order
            const { event, callback } = this.$data._bv_root_listeners.shift()
            this.$root.$off(event, callback)
        }
    }
}
