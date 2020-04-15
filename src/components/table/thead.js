import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  headVariant: {
    // Also sniffed by <b-tr> / <b-td> / <b-th>
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
      /* istanbul ignore next */
      default() /* istanbul ignore next */ {
        return {}
      }
    }
  },
  props,
  computed: {
    isThead() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return true
    },
    isDark() {
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
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      // Sticky headers only apply to cells in table `thead`
      return !this.isStacked && this.bvTable.stickyHeader
    },
    hasStickyHeader() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      return !this.isStacked && this.bvTable.stickyHeader
    },
    tableVariant() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable.tableVariant
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
      this.normalizeSlot('default')
    )
  }
})
