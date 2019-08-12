import Vue from '../../../utils/vue'
import toString from '../../../utils/to-string'
import { isUndefinedOrNull } from '../../../utils/inspect'
import normalizeSlotMixin from '../../../mixins/normalize-slot'

const digitsRx = /^\d+$/

// Parse a rowspan or colspan into a digit (or null if < 1 or NaN)
const parseSpan = val => {
  val = parseInt(val, 10)
  return digitsRx.test(String(val)) && val > 0 ? val : null
}

/* istanbul ignore next */
const spanValidator = val => isUndefinedOrNull(val) || parseSpan(val) > 0

export const props = {
  header: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: null
  },
  colspan: {
    type: [Number, String],
    default: null,
    validator: spanValidator
  },
  rowspan: {
    type: [Number, String],
    default: null,
    validator: spanValidator
  },
  stackedHeading: {
    type: String,
    default: null
  },
  stickyColumn: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export const BTableCell = /*#__PURE__*/ Vue.extend({
  name: 'BTableCell',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  inject: {
    // Injections for feature / attribute detection
    bvTable: {
      default: null
    },
    bvTableTbody: {
      default: null
    },
    bvTableThead: {
      default: null
    },
    bvTableTfoot: {
      default: null
    },
    bvTableTr: {
      default: null
    }
  },
  props,
  computed: {
    isDark() {
      return this.bvTable && this.bvTable.dark
    },
    isStacked() {
      return this.bvTable && this.bvTable.isStacked
    },
    isStackedCell() {
      // We only support stacked-heading in tbody in stacked mode
      return this.isStacked && this.bvTableTbody
    },
    isResponsive() {
      return this.bvTable && this.bvTable.isResponsive && !this.isStacked
    },
    isStickyHeader() {
      // Needed to handle header background classes, due to lack of
      // bg color inheritance with Bootstrap v4 tabl css
      // Sticky headers only apply to cells in table `thead`
      return (
        !this.isStacked &&
        this.bvTable &&
        this.bvTableThead &&
        this.bvTableTr &&
        this.bvTable.stickyHeader
      )
    },
    isStickyColumn() {
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table css.
      // Sticky column cells are only available in responsive
      // mode (horzontal scrolling) or when sticky header mode.
      // Applies to cells in `thead`, `tbody` and `tfoot`
      return (
        (this.isResponsive || this.isStickyHeader) &&
        this.stickyColumn &&
        !this.isStacked &&
        this.bvTable &&
        this.bvTableTr
      )
    },
    cellClasses() {
      // We use computed props here for improved performance by caching
      // the results of the string interpolation
      let variant = this.variant
      if (
        (!variant && this.isStickyHeader && !this.bvTableThead.headVariant) ||
        (!variant && this.isStickyColumn)
      ) {
        // Needed for stickyheader mode as Bootstrap v4 table cells do
        // not inherit parent's background-color. Boo!
        variant = this.bvTableTr.variant || this.bvTable.tableVariant || 'b-table-default'
      }
      return [
        variant ? `${this.isDark ? 'bg' : 'table'}-${variant}` : null,
        this.isStickyColumn ? 'b-table-sticky-column' : null
      ]
    },
    computedColspan() {
      return parseSpan(this.colspan)
    },
    computedRowspan() {
      return parseSpan(this.rowspan)
    },
    cellAttrs() {
      // We use computed props here for improved performance by caching
      // the results of the object spread (Object.assign)
      const headOrFoot = this.bvTableThead || this.bvTableTfoot
      // Make sure col/rowspan's are > 0 or null
      const colspan = this.computedColspan
      const rowspan = this.computedRowspan
      // Default role and scope
      let role = 'cell'
      let scope = null

      // Compute role and scope
      // We only add scopes with an explicit span of 1 or greater
      if (headOrFoot) {
        // Header or footer cells
        role = 'columnheader'
        scope = colspan > 0 ? 'colspan' : 'col'
      } else if (this.header) {
        // th's in tbody
        role = 'rowheader'
        scope = rowspan > 0 ? 'rowgroup' : 'row'
      }

      return {
        colspan: colspan,
        rowspan: rowspan,
        role: role,
        scope: scope,
        // Allow users to override role/scope plus add other attributes
        ...this.$attrs,
        // Add in the stacked cell label data-attribute if in
        // stacked mode (if a stacked heading label is provided)
        'data-label':
          this.isStackedCell && !isUndefinedOrNull(this.stackedHeading)
            ? toString(this.stackedHeading)
            : null
      }
    }
  },
  render(h) {
    const content = [this.normalizeSlot('default')]
    return h(
      this.header ? 'th' : 'td',
      {
        class: this.cellClasses,
        attrs: this.cellAttrs,
        // Transfer any native listeners
        on: this.$listeners
      },
      [this.isStackedCell ? h('div', {}, [content]) : content]
    )
  }
})
