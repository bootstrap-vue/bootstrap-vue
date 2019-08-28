import getScopId from '../utils/get-scope-id'

export default {
  computed: {
    scopeAttrs() {
      const scopeId = getScopId(this.$parent)
      return scopeId ? { [scopeId]: '' } : {}
    }
  }
}
