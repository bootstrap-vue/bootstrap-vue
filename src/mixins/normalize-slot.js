import { Vue } from '../vue'
import { SLOT_NAME_DEFAULT } from '../constants/slots'
import { hasNormalizedSlot, normalizeSlot } from '../utils/normalize-slot'
import { concat } from '../utils/array'

// @vue/component
export const normalizeSlotMixin = Vue.extend({
  methods: {
    // Returns `true` if the either a `$scopedSlot` or `$slot` exists with the specified name
    // `name` can be a string name or an array of names
    hasNormalizedSlot(
      name = SLOT_NAME_DEFAULT,
      scopedSlots = this.$scopedSlots,
      slots = this.$slots
    ) {
      return hasNormalizedSlot(name, scopedSlots, slots)
    },
    // Returns an array of rendered VNodes if slot found, otherwise `undefined`
    // `name` can be a string name or an array of names
    normalizeSlot(
      name = SLOT_NAME_DEFAULT,
      scope = {},
      scopedSlots = this.$scopedSlots,
      slots = this.$slots
    ) {
      const vNodes = normalizeSlot(name, scope, scopedSlots, slots)
      return vNodes ? concat(vNodes) : vNodes
    }
  }
})
