import { defineComponent } from '../vue'
import getScopeId from '../utils/get-scope-id'

export default defineComponent({
  computed: {
    scopedStyleAttrs() {
      const scopeId = getScopeId(this.$parent)
      return scopeId ? { [scopeId]: '' } : {}
    }
  }
})
