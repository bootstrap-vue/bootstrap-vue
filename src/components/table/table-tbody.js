import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {}

// @vue/component
export const BTableTbody = /*#__PURE__*/ Vue.extend({
  name: 'BTableTbody',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide() /* istanbul ignore next: until tests are written */ {
    return {
      bvTableTbody: this
    }
  },
  inject: {
    bvTable: {
      default: null
    }
  },
  props: props,
  computed: {
    tbodyAttrs() /* istanbul ignore next: until tests are written */ {
      return { role: 'rowgroup', ...this.$attrs }
    }
  },
  render(h) /* istanbul ignore next: until tests are written */ {
    return h(
      'tbody',
      {
        attrs: this.theadAttrs,
        // Pass down any native listeners
        on: this.$listeners
      },
      this.normalizeSlot('default', {})
    )
  }
})
