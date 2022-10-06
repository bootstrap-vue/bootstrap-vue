// Mixin to determine if an event listener has been registered
// either via `v-on:name` (in the parent) or programmatically
// via `vm.$on('name', ...)`
// See: https://github.com/vuejs/vue/issues/10825
import { isVue3, extend } from '../vue'
import { isArray, isUndefined } from '../utils/inspect'

// @vue/component
export const hasListenerMixin = extend({
  methods: {
    hasListener(name) {
      if (isVue3) {
        return true
      }
      // Only includes listeners registered via `v-on:name`
      const $listeners = this.$listeners || {}
      // Includes `v-on:name` and `this.$on('name')` registered listeners
      // Note this property is not part of the public Vue API, but it is
      // the only way to determine if a listener was added via `vm.$on`
      const $events = this._events || {}
      // Registered listeners in `this._events` are always an array,
      // but might be zero length
      return !isUndefined($listeners[name]) || (isArray($events[name]) && $events[name].length > 0)
    }
  }
})
