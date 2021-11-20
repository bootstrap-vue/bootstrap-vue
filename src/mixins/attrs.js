import { makePropCacheMixin } from '../utils/cache'
import { defineComponent, isVue3 } from '../vue'

const attrsMixinVue2 = makePropCacheMixin('$attrs', 'bvAttrs')
const attrsMixinVue3 = defineComponent({
  computed: {
    bvAttrs() {
      return this.$attrs
    }
  }
})

export const attrsMixin = isVue3 ? attrsMixinVue3 : attrsMixinVue2
