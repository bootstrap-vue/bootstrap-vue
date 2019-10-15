import { getComponentConfig } from '../../../utils/config'
import { BTfoot } from '../tfoot'

export default {
  props: {
    footClone: {
      type: Boolean,
      default: false
    },
    footVariant: {
      type: String, // 'dark', 'light', or `null` (or custom)
      default: () => getComponentConfig('BTable', 'footVariant')
    },
    footRowVariant: {
      type: String, // Any Bootstrap theme variant (or custom). Falls back to `headRowVariant`
      default: null
    },
    tfootClass: {
      type: [String, Array, Object],
      default: null
    },
    tfootTrClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  methods: {
    renderTFootCustom() {
      const h = this.$createElement
      if (this.hasNormalizedSlot('custom-foot')) {
        return h(
          BTfoot,
          {
            key: 'bv-tfoot-custom',
            class: this.tfootClass || null,
            props: { footVariant: this.footVariant || this.headVariant || null }
          },
          this.normalizeSlot('custom-foot', {
            items: this.computedItems.slice(),
            fields: this.computedFields.slice(),
            columns: this.computedFields.length
          })
        )
      } else {
        return h()
      }
    },
    renderTfoot() {
      // Passing true to renderThead will make it render a tfoot
      return this.footClone ? this.renderThead(true) : this.renderTFootCustom()
    }
  }
}
