import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  footVariant: {
    type: String, // supported values: 'lite', 'dark', or null
    default: null
  }
}

// @vue/component
export const BTfoot = /*#__PURE__*/ Vue.extend({
  name: 'BTfoot',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide() {
    return {
      bvTableTfoot: this,
      bvTableRowGroup: this
    }
  },
  inject: {
    bvTable: {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      default: null
    }
  },
  props,
  computed: {
    isTfoot() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return true
    },
    tfootClasses() {
      return [this.footVariant ? `thead-${this.footVariant}` : null]
    },
    tfootAttrs() {
      return { role: 'rowgroup', ...this.$attrs }
    }
  },
  render(h) {
    return h(
      'tfoot',
      {
        class: this.tfootClasses,
        attrs: this.tfootAttrs,
        // Pass down any native listeners
        on: this.$listeners
      },
      this.normalizeSlot('default', {})
    )
  }
})
