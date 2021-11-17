import { makePropCacheMixin } from '../utils/cache'
import { Vue, isVue3 } from '../vue'

const attrsMixinVue2 = makePropCacheMixin('$attrs', 'bvAttrs')
const attrsMixinVue3 = Vue.extend({
  computed: {
    bvAttrs() {
      return this.$attrs
    }
  }
})

export const attrsMixin = isVue3 ? attrsMixinVue3 : attrsMixinVue2
