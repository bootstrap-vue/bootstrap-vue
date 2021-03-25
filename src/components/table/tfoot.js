import { Vue } from '../../vue'
import { NAME_TFOOT } from '../../constants/components'
import { PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { attrsMixin } from '../../mixins/attrs'
import { listenersMixin } from '../../mixins/listeners'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Props ---

export const props = makePropsConfigurable(
  {
    // Supported values: 'lite', 'dark', or null
    footVariant: makeProp(PROP_TYPE_STRING)
  },
  NAME_TFOOT
)

// --- Main component ---

// TODO:
//   In Bootstrap v5, we won't need "sniffing" as table element variants properly inherit
//   to the child elements, so this can be converted to a functional component
// @vue/component
export const BTfoot = /*#__PURE__*/ Vue.extend({
  name: NAME_TFOOT,
  mixins: [attrsMixin, listenersMixin, normalizeSlotMixin],
  provide() {
    return {
      bvTableRowGroup: this
    }
  },
  inject: {
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    bvTable: {
      default: /* istanbul ignore next */ () => ({})
    }
  },
  inheritAttrs: false,
  props,
  computed: {
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    isTfoot() {
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
    // Sticky headers are only supported in thead
    isStickyHeader() {
      return false
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
    tfootClasses() {
      return [this.footVariant ? `thead-${this.footVariant}` : null]
    },
    tfootAttrs() {
      return { ...this.bvAttrs, role: 'rowgroup' }
    }
  },
  render(h) {
    return h(
      'tfoot',
      {
        class: this.tfootClasses,
        attrs: this.tfootAttrs,
        // Pass down any native listeners
        on: this.bvListeners
      },
      this.normalizeSlot()
    )
  }
})
