import { hasNormalizedSlot, normalizeSlot } from '../utils/normalize-slot'
import { concat } from '../utils/array'

export default {
  methods: {
    hasNormalizedSlot(names) {
      // Returns true if the either a $scopedSlot or $slot exists with the specified name
      // `names` can be a string name or an array of names
      return hasNormalizedSlot(names, this.$scopedSlots, this.$slots)
    },
    normalizeSlot(names, scope = {}) {
      // Returns an array of rendered VNodes if slot found.
      // Returns undefined if not found.
      // `names` can be a string name or an array of names
      const vNodes = normalizeSlot(names, scope, this.$scopedSlots, this.$slots)
      return vNodes ? concat(vNodes) : vNodes
    }
  }
}
