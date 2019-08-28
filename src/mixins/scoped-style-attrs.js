import getScopId from '../utils/get-scope-id'

export default {
  computed: {
    scopedStyleAttrs() {
      const scopeId = getScopId(this.$parent)
      return scopeId ? { [scopeId]: '' } : {}
    }
  }
}
