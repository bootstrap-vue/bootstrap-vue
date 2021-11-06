import { Vue } from '../vue'

// --- Mixin ---

// @vue/component
export const useParentMixin = Vue.extend({
  computed: {
    bvParent() {
      return this.$parent || (this.$root === this && this.$options.bvParent)
    }
  }
})
