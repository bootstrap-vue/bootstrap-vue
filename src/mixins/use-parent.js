import { extend } from '../vue'

// --- Mixin ---

// @vue/component
export const useParentMixin = extend({
  computed: {
    bvParent() {
      return this.$parent || (this.$root === this && this.$options.bvParent)
    }
  }
})
