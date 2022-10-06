import { extend } from '../../vue'
import { NAME_TABLE_CELL } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_NUMBER_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { isTag } from '../../utils/dom'
import { isUndefinedOrNull } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { toString } from '../../utils/string'
import { attrsMixin } from '../../mixins/attrs'
import { listenersMixin } from '../../mixins/listeners'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Helper methods ---

// Parse a rowspan or colspan into a digit (or `null` if < `1` )
const parseSpan = value => {
  value = toInteger(value, 0)
  return value > 0 ? value : null
}

/* istanbul ignore next */
const spanValidator = value => isUndefinedOrNull(value) || parseSpan(value) > 0

// --- Props ---

export const props = makePropsConfigurable(
  {
    colspan: makeProp(PROP_TYPE_NUMBER_STRING, null, spanValidator),
    rowspan: makeProp(PROP_TYPE_NUMBER_STRING, null, spanValidator),
    stackedHeading: makeProp(PROP_TYPE_STRING),
    stickyColumn: makeProp(PROP_TYPE_BOOLEAN, false),
    variant: makeProp(PROP_TYPE_STRING)
  },
  NAME_TABLE_CELL
)

// --- Main component ---

// TODO:
//   In Bootstrap v5, we won't need "sniffing" as table element variants properly inherit
//   to the child elements, so this can be converted to a functional component
// @vue/component
export const BTd = /*#__PURE__*/ extend({
  name: NAME_TABLE_CELL,
  // Mixin order is important!
  mixins: [attrsMixin, listenersMixin, normalizeSlotMixin],
  inject: {
    getBvTableTr: {
      default: /* istanbul ignore next */ () => () => ({})
    }
  },
  inheritAttrs: false,
  props,
  computed: {
    bvTableTr() {
      return this.getBvTableTr()
    },
    // Overridden by `<b-th>`
    tag() {
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
    // We only support stacked-heading in tbody in stacked mode
    isStackedCell() {
      return this.inTbody && this.isStacked
    },
    isResponsive() {
      return this.bvTableTr.isResponsive
    },
    // Needed to handle header background classes, due to lack of
    // background color inheritance with Bootstrap v4 table CSS
    // Sticky headers only apply to cells in table `thead`
    isStickyHeader() {
      return this.bvTableTr.isStickyHeader
    },
    // Needed to handle header background classes, due to lack of
    // background color inheritance with Bootstrap v4 table CSS
    hasStickyHeader() {
      return this.bvTableTr.hasStickyHeader
    },
    // Needed to handle background classes, due to lack of
    // background color inheritance with Bootstrap v4 table CSS
    // Sticky column cells are only available in responsive
    // mode (horizontal scrolling) or when sticky header mode
    // Applies to cells in `thead`, `tbody` and `tfoot`
    isStickyColumn() {
      return !this.isStacked && (this.isResponsive || this.hasStickyHeader) && this.stickyColumn
    },
    rowVariant() {
      return this.bvTableTr.variant
    },
    headVariant() {
      return this.bvTableTr.headVariant
    },
    footVariant() {
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
    // We use computed props here for improved performance by caching
    // the results of the string interpolation
    cellClasses() {
      let { variant, headVariant, isStickyColumn } = this
      if (
        (!variant && this.isStickyHeader && !headVariant) ||
        (!variant && isStickyColumn && this.inTfoot && !this.footVariant) ||
        (!variant && isStickyColumn && this.inThead && !headVariant) ||
        (!variant && isStickyColumn && this.inTbody)
      ) {
        // Needed for sticky-header mode as Bootstrap v4 table cells do
        // not inherit parent's `background-color`
        variant = this.rowVariant || this.tableVariant || 'b-table-default'
      }
      return [
        variant ? `${this.isDark ? 'bg' : 'table'}-${variant}` : null,
        isStickyColumn ? 'b-table-sticky-column' : null
      ]
    },
    cellAttrs() {
      const { stackedHeading } = this

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
      } else if (isTag(this.tag, 'th')) {
        // th's in tbody
        role = 'rowheader'
        scope = rowspan > 0 ? 'rowgroup' : 'row'
      }

      return {
        colspan,
        rowspan,
        role,
        scope,
        // Allow users to override role/scope plus add other attributes
        ...this.bvAttrs,
        // Add in the stacked cell label data-attribute if in
        // stacked mode (if a stacked heading label is provided)
        'data-label':
          this.isStackedCell && !isUndefinedOrNull(stackedHeading)
            ? /* istanbul ignore next */ toString(stackedHeading)
            : null
      }
    }
  },
  render(h) {
    const $content = [this.normalizeSlot()]

    return h(
      this.tag,
      {
        class: this.cellClasses,
        attrs: this.cellAttrs,
        // Transfer any native listeners
        on: this.bvListeners
      },
      [this.isStackedCell ? h('div', [$content]) : $content]
    )
  }
})
