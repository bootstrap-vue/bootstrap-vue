import { extend } from '../../vue'
import { NAME_TR } from '../../constants/components'
import { PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { attrsMixin } from '../../mixins/attrs'
import { listenersMixin } from '../../mixins/listeners'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Constants ---

const LIGHT = 'light'
const DARK = 'dark'

// --- Props ---

export const props = makePropsConfigurable(
  {
    variant: makeProp(PROP_TYPE_STRING)
  },
  NAME_TR
)

// --- Main component ---

// TODO:
//   In Bootstrap v5, we won't need "sniffing" as table element variants properly inherit
//   to the child elements, so this can be converted to a functional component
// @vue/component
export const BTr = /*#__PURE__*/ extend({
  name: NAME_TR,
  mixins: [attrsMixin, listenersMixin, normalizeSlotMixin],
  provide() {
    return {
      getBvTableTr: () => this
    }
  },
  inject: {
    getBvTableRowGroup: {
      default: /* istanbul ignore next */ () => () => ({})
    }
  },
  inheritAttrs: false,
  props,
  computed: {
    bvTableRowGroup() {
      return this.getBvTableRowGroup()
    },
    // Sniffed by `<b-td>` / `<b-th>`
    inTbody() {
      return this.bvTableRowGroup.isTbody
    },
    // Sniffed by `<b-td>` / `<b-th>`
    inThead() {
      return this.bvTableRowGroup.isThead
    },
    // Sniffed by `<b-td>` / `<b-th>`
    inTfoot() {
      return this.bvTableRowGroup.isTfoot
    },
    // Sniffed by `<b-td>` / `<b-th>`
    isDark() {
      return this.bvTableRowGroup.isDark
    },
    // Sniffed by `<b-td>` / `<b-th>`
    isStacked() {
      return this.bvTableRowGroup.isStacked
    },
    // Sniffed by `<b-td>` / `<b-th>`
    isResponsive() {
      return this.bvTableRowGroup.isResponsive
    },
    // Sniffed by `<b-td>` / `<b-th>`
    // Sticky headers are only supported in thead
    isStickyHeader() {
      return this.bvTableRowGroup.isStickyHeader
    },
    // Sniffed by <b-tr> / `<b-td>` / `<b-th>`
    // Needed to handle header background classes, due to lack of
    // background color inheritance with Bootstrap v4 table CSS
    hasStickyHeader() {
      return !this.isStacked && this.bvTableRowGroup.hasStickyHeader
    },
    // Sniffed by `<b-td>` / `<b-th>`
    tableVariant() {
      return this.bvTableRowGroup.tableVariant
    },
    // Sniffed by `<b-td>` / `<b-th>`
    headVariant() {
      return this.inThead ? this.bvTableRowGroup.headVariant : null
    },
    // Sniffed by `<b-td>` / `<b-th>`
    footVariant() {
      return this.inTfoot ? this.bvTableRowGroup.footVariant : null
    },
    isRowDark() {
      return this.headVariant === LIGHT || this.footVariant === LIGHT
        ? /* istanbul ignore next */ false
        : this.headVariant === DARK || this.footVariant === DARK
          ? /* istanbul ignore next */ true
          : this.isDark
    },
    trClasses() {
      const { variant } = this
      return [variant ? `${this.isRowDark ? 'bg' : 'table'}-${variant}` : null]
    },
    trAttrs() {
      return { role: 'row', ...this.bvAttrs }
    }
  },
  render(h) {
    return h(
      'tr',
      {
        class: this.trClasses,
        attrs: this.trAttrs,
        // Pass native listeners to child
        on: this.bvListeners
      },
      this.normalizeSlot()
    )
  }
})
