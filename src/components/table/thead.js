import { extend } from '../../vue'
import { NAME_THEAD } from '../../constants/components'
import { PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { attrsMixin } from '../../mixins/attrs'
import { listenersMixin } from '../../mixins/listeners'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Props ---

export const props = makePropsConfigurable(
  {
    // Also sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    // Supported values: 'lite', 'dark', or `null`
    headVariant: makeProp(PROP_TYPE_STRING)
  },
  NAME_THEAD
)

// --- Main component ---

// TODO:
//   In Bootstrap v5, we won't need "sniffing" as table element variants properly inherit
//   to the child elements, so this can be converted to a functional component
// @vue/component
export const BThead = /*#__PURE__*/ extend({
  name: NAME_THEAD,
  mixins: [attrsMixin, listenersMixin, normalizeSlotMixin],
  provide() {
    return {
      getBvTableRowGroup: () => this
    }
  },
  inject: {
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    getBvTable: {
      default: /* istanbul ignore next */ () => () => ({})
    }
  },
  inheritAttrs: false,
  props,
  computed: {
    bvTable() {
      return this.getBvTable()
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    isThead() {
      return true
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    isDark() {
      return this.bvTable.dark
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    isStacked() {
      return this.bvTable.isStacked
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    isResponsive() {
      return this.bvTable.isResponsive
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    // Needed to handle header background classes, due to lack of
    // background color inheritance with Bootstrap v4 table CSS
    // Sticky headers only apply to cells in table `thead`
    isStickyHeader() {
      return !this.isStacked && this.bvTable.stickyHeader
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    // Needed to handle header background classes, due to lack of
    // background color inheritance with Bootstrap v4 table CSS
    hasStickyHeader() {
      return !this.isStacked && this.bvTable.stickyHeader
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    tableVariant() {
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
