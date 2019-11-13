import Vue from '../../utils/vue'
import toString from '../../utils/to-string'
import { isUndefinedOrNull } from '../../utils/inspect'
import normalizeSlotMixin from '../../mixins/normalize-slot'

const digitsRx = /^\d+$/

// Parse a rowspan or colspan into a digit (or null if < 1 or NaN)
const parseSpan = val => {
  val = parseInt(val, 10)
  return digitsRx.test(String(val)) && val > 0 ? val : null
}

/* istanbul ignore next */
const spanValidator = val => isUndefinedOrNull(val) || parseSpan(val) > 0

export const props = {
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
export const BTd = /*#__PURE__*/ Vue.extend({
  name: 'BTableCell',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  inject: {
    bvTableTr: {
      default() /* istanbul ignore next */ {
        return {}
      }
    }
  },
  props,
  computed: {
    tag() {
      // Overridden by <b-th>
      return 'td'
    },
    inTbody() {
      return this.bvTableTr.inTbody
    },
    inThead() {
      return this.bvTableTr.inThead
    },
    inTfoot() {
      return this.bvTableTr.inTfoot
    },
    isDark() {
      return this.bvTableTr.isDark
    },
    isStacked() {
      return this.bvTableTr.isStacked
    },
    isStackedCell() {
      // We only support stacked-heading in tbody in stacked mode
      return this.inTbody && this.isStacked
    },
    isResponsive() {
      return this.bvTableTr.isResponsive
    },
    isStickyHeader() {
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      // Sticky headers only apply to cells in table `thead`
      return this.bvTableTr.isStickyHeader
    },
    hasStickyHeader() {
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      return this.bvTableTr.hasStickyHeader
    },
    isStickyColumn() {
      // Needed to handle background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      // Sticky column cells are only available in responsive
      // mode (horizontal scrolling) or when sticky header mode
      // Applies to cells in `thead`, `tbody` and `tfoot`
      return !this.isStacked && (this.isResponsive || this.hasStickyHeader) && this.stickyColumn
    },
    rowVariant() {
      return this.bvTableTr.variant
    },
    headVariant() {
      return this.bvTableTr.headVariant
    },
    footVariant() /* istanbul ignore next: need to add in tests for footer variant */ {
      return this.bvTableTr.footVariant
    },
    tableVariant() {
      return this.bvTableTr.tableVariant
    },
    computedColspan() {
      return parseSpan(this.colspan)
    },
    computedRowspan() {
      return parseSpan(this.rowspan)
    },
    cellClasses() {
      // We use computed props here for improved performance by caching
      // the results of the string interpolation
      // TODO: need to add handling for footVariant
      let variant = this.variant
      if (
        (!variant && this.isStickyHeader && !this.headVariant) ||
        (!variant && this.isStickyColumn)
      ) {
        // Needed for sticky-header mode as Bootstrap v4 table cells do
        // not inherit parent's background-color. Boo!
        variant = this.rowVariant || this.tableVariant || 'b-table-default'
      }
      return [
        variant ? `${this.isDark ? 'bg' : 'table'}-${variant}` : null,
        this.isStickyColumn ? 'b-table-sticky-column' : null
      ]
    },
    cellAttrs() {
      // We use computed props here for improved performance by caching
      // the results of the object spread (Object.assign)
      const headOrFoot = this.inThead || this.inTfoot
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
      } else if (this.tag === 'th') {
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
      this.tag,
      {
        class: this.cellClasses,
        attrs: this.cellAttrs,
        // Transfer any native listeners
        on: this.$listeners
      },
      [this.isStackedCell ? h('div', [content]) : content]
    )
  }
})
