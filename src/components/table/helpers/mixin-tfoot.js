import { getComponentConfig } from '../../../utils/config'
import { BTfoot } from '../tfoot'

export default {
  props: {
    footClone: {
      type: Boolean,
      default: false
    },
    footVariant: {
      type: String,
      default: () => getComponentConfig('BTable', 'footVariant')
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
          { props: { footVariant: this.footVariant || this.headVariant } },
          this.normalizeSlot('tfoot', {
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
