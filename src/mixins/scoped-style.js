import { defineComponent } from '../vue'
import { useParentMixin } from '../mixins/use-parent'
import { getScopeId } from '../utils/get-scope-id'

// @vue/component
export const scopedStyleMixin = defineComponent({
  mixins: [useParentMixin],
  computed: {
    scopedStyleAttrs() {
      const scopeId = getScopeId(this.bvParent)
      return scopeId ? { [scopeId]: '' } : {}
    }
  }
})
