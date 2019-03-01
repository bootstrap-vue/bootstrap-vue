import normalizeSlot from '../utils/normalize-slot'

export default {
  methods: {
    normalizeSlot(name, scope = {}) {
      return normalizeSlot(name, scope, this.$scopedSlots, this.$slots)
    }
  }
}
