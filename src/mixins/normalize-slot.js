import { SLOT_NAME_DEFAULT } from '../constants/slot-names'
import { hasNormalizedSlot, normalizeSlot } from '../utils/normalize-slot'
import { concat } from '../utils/array'

export default {
  methods: {
    hasNormalizedSlot(name = SLOT_NAME_DEFAULT) {
      // Returns true if the either a $scopedSlot or $slot exists with the specified name
      // `name` can be a string name or an array of names
      return hasNormalizedSlot(name, this.$scopedSlots, this.$slots)
    },
    normalizeSlot(name = SLOT_NAME_DEFAULT, scope = {}) {
      // Returns an array of rendered VNodes if slot found.
      // Returns undefined if not found.
      // `name` can be a string name or an array of names
      const vNodes = normalizeSlot(name, scope, this.$scopedSlots, this.$slots)
      return vNodes ? concat(vNodes) : vNodes
    }
  }
}
