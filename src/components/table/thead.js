import Vue from '../../vue'
import { NAME_THEAD } from '../../constants/components'
import attrsMixin from '../../mixins/attrs'
import listenersMixin from '../../mixins/listeners'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  headVariant: {
    // Also sniffed by <b-tr> / <b-td> / <b-th>
    type: String, // Supported values: 'lite', 'dark', or null
    default: null
  }
}

// TODO:
//   In Bootstrap v5, we won't need "sniffing" as table element variants properly inherit
//   to the child elements, so this can be converted to a functional component
// @vue/component
export const BThead = /*#__PURE__*/ Vue.extend({
  name: NAME_THEAD,
  // Mixin order is important!
  mixins: [attrsMixin, listenersMixin, normalizeSlotMixin],
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
  inheritAttrs: false,
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
      return { role: 'rowgroup', ...this.bvAttrs }
    }
  },
  render(h) {
    return h(
      'thead',
      {
        class: this.theadClasses,
        attrs: this.theadAttrs,
        // Pass down any native listeners
        on: this.bvListeners
      },
      this.normalizeSlot()
    )
  }
})
