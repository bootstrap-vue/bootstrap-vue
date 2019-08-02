import Vue from '../../../utils/vue'
import normalizeSlotMixin from '../../../mixins/normalize-slot'

export const BTableCell = /*#__PURE__*/ Vue.extend({
  name: 'BTableCell',
  inheritAttrs: false,
  mixins: [nomalizeSlotMixin],
  inject: {
    bvTable: {
      default: null
    },
    bvTableHead: {
      default: null
    },
    bvTableFoot: {
      default: null
    },
  },
  props: {
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
    },
    rowspan: {
      type: [Number, String],
      default: null
    }
  },
  computed: {
    isDark() {
      return this.bvTable && this.bvTable.dark
    },
    cellClasses() {
      // We use computed props here for improved performance by caching
      // the results of the string interpolation
      return [
        this.variant ? `${this.isDark ? 'bg' : 'table'}-${this.variant}` : null
      ]
    }
  },
  render(h) {
    return h(
      this.header ? 'th' : 'td',
      {
        class: this.cellClasses,
        attrs: {
          role: this.bvTableHead || this.bvTableFoot
            ? 'columnheader'
            : this.header ? 'rowheader' : 'cell',
          scope: this.bvTableHead || this.bvTableFoot ?
            ? 'col'
            : this.header ? 'row' : null,
          colspan: this.colspan,
          rowspan: this.rowspan,
          // Allow users to override role/scope plus add other attributes
          ...this.$attrs
        },
        // Transfer any native listeners
        on: this.$listeners
      },
      this.noramlizeSlot('default')
    )
  }
})

export default BTableCell
