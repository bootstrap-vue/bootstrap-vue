import { defineComponent } from '../vue'

// --- Mixin ---

// @vue/component
export const useParentMixin = defineComponent({
  computed: {
    bvParent() {
      return this.$parent || (this.$root === this && this.$options.bvParent)
    }
  }
})
