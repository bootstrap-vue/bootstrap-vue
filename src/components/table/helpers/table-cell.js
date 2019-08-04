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
    }
  },
  props: props,
  computed: {
    isDark() {
      return this.bvTable && this.bvTable.dark
    },
    isStacked() {
      // We only support stacked-heading in tbody in stacked mode
      return this.bvTableTbody && this.bvTable && this.bvTable.isStacked
    },
    cellClasses() {
      // We use computed props here for improved performance by caching
      // the results of the string interpolation
      return [this.variant ? `${this.isDark ? 'bg' : 'table'}-${this.variant}` : null]
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
      // Make sure col/rowspans are > 0 or null
      const colspan = this.computedColspan
      const rowspan = this.computedRowspan
      // Default role and scope
      let role = 'cell'
      let scope = null

      // Compute role and scope
      // We only add scops with an explicit span of 1 or greater
      if (headOrFoot) {
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
        // Add in the stacked cell label data-attribute if in
        // stacked mode (if a stacked heading label is provided)
        'data-label': this.isStacked && this.stackedHeading ? toString(this.stackedHeading) : null,
        // Allow users to override role/scope plus add other attributes
        ...this.$attrs
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
      [this.isStacked ? h('div', {}, [content]) : content]
    )
  }
})
