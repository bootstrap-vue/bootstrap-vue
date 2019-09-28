import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  headVariant: {
    type: String, // supported values: 'lite', 'dark', or null
    default: null
  }
}

// @vue/component
export const BThead = /*#__PURE__*/ Vue.extend({
  name: 'BThead',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide() {
    return {
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
    isDark() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable && this.bvTable.dark
    },
    isStacked() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable && this.bvTable.isStacked
    },
    theadClasses() {
      return [this.headVariant ? `thead-${this.headVariant}` : null]
    },
    theadAttrs() {
      return { role: 'rowgroup', ...this.$attrs }
    }
  },
  render(h) {
    return h(
      'thead',
      {
        class: this.theadClasses,
        attrs: this.theadAttrs,
        // Pass down any native listeners
        on: this.$listeners
      },
      this.normalizeSlot('default', {})
    )
  }
})
