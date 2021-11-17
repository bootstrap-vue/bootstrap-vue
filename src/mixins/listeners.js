import { makePropCacheMixin } from '../utils/cache'
import { Vue, isVue3 } from '../vue'

const listenersMixinVue2 = makePropCacheMixin('$listeners', 'bvListeners')

const listenersMixinVue3 = Vue.extend({
  data() {
    return {
      bvListeners: {}
    }
  },
  created() {
    this.bvListeners = {
      ...this.$listeners
    }
  },
  beforeUpdate() {
    this.bvListeners = {
      ...this.$listeners
    }
  }
})

export const listenersMixin = isVue3 ? listenersMixinVue3 : listenersMixinVue2
