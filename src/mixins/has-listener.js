// Mixin to determine if an event listener has been registered
// either via `v-on:name` (in the parent) or programmatically
// via `vm.$on('name', ...)`
import { isArray } from '../utils/array'
import ( isDefined } from '../utils/inspect'

export default {
  methods: {
    hasListener(name) {
      // Only includes listeners registerd via `v-on:name`
      const $listeners = this.$listeners || {}
      // Includes `v-on:name` and `this.$on('name')` registerd listeners
      const $events = this._events || {}
      // Registered listeners in this._events are always an array (but might be 0 length)
      return isDefined($listeners[name]) || (isArray($events[name]) && $events[name].length > 0)
    }
  }
}
