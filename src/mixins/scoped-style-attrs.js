import getScopeId from '../utils/get-scope-id'

export default {
  computed: {
    scopedStyleAttrs() {
      const scopeId = getScopeId(this.$parent)
      return scopeId ? { [scopeId]: '' } : {}
    }
  }
}
