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
      bvTableRowGroup: this
    }
  },
  inject: {
    bvTable: {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      /* istanbul ignore next */
      default() /* istanbul ignore next */ {
        return {}
      }
    }
  },
  props,
  computed: {
    isTfoot() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return true
    },
    isDark() /* istanbul ignore next: Not currently sniffed in tests */ {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable.dark
    },
    isStacked() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable.isStacked
    },
    isResponsive() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable.isResponsive
    },
    isStickyHeader() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      // Sticky headers are only supported in thead
      return false
    },
    hasStickyHeader() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      return !this.isStacked && this.bvTable.stickyHeader
    },
    tableVariant() /* istanbul ignore next: Not currently sniffed in tests */ {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable.tableVariant
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
      this.normalizeSlot('default')
    )
  }
})
