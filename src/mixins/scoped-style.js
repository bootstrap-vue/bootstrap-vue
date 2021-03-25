import { Vue } from '../vue'
import { getScopeId } from '../utils/get-scope-id'

// @vue/component
export const scopedStyleMixin = Vue.extend({
  computed: {
    scopedStyleAttrs() {
      const scopeId = getScopeId(this.$parent)
      return scopeId ? { [scopeId]: '' } : {}
    }
  }
})
