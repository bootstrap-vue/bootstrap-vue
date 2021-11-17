import { makePropCacheMixin } from '../utils/cache'
import { Vue, isVue3 } from '../vue'

const attrsMixinVue2 = makePropCacheMixin('$attrs', 'bvAttrs')
const attrsMixinVue3 = Vue.extend({
  computed: {
    bvAttrs() {
      const bvAttrs = { ...this.$attrs }
      Object.keys(bvAttrs).forEach(key => {
        if (bvAttrs[key] === undefined) {
          delete bvAttrs[key]
        }
      })
      return bvAttrs
    }
  }
})

export const attrsMixin = isVue3 ? attrsMixinVue3 : attrsMixinVue2
