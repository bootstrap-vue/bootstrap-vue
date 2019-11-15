// Mixin to determine if an event listener has been registered
// either via `v-on:name` (in the parent) or programmatically
// via `vm.$on('name', ...)`
import { isArray } from '../utils/array'
import { isUndefined } from '../utils/inspect'

export default {
  methods: {
    hasListener(name) {
      // Only includes listeners registerd via `v-on:name`
      const $listeners = this.$listeners || {}
      // Includes `v-on:name` and `this.$on('name')` registerd listeners
      // Note this property is not part of the public Vue API, but it is
      // the only way to determine if a listener was added via `vm.$on`
      const $events = this._events || {}
      // Registered listeners in this._events are always an array (but might be 0 length)
      return !isUndefined($listeners[name]) || (isArray($events[name]) && $events[name].length > 0)
    }
  }
}
