import Vue from '../../../utils/vue'
import { isUndefinedOrNull } from '../../../utils/inspect'
import normalizeSlotMixin from '../../../mixins/normalize-slot'

const digitsRx = /^\d+$/

/* istanbul ignore next */
const spanValidator = val =>
  isUndefinedOrNull(val) || (digitsRx.test(String(val)) && parseInt(val, 10) > 0)

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
      return this.bvTableTbody && this.bvTable && this.bvTable.isStacked
    },
    cellClasses() {
      // We use computed props here for improved performance by caching
      // the results of the string interpolation
      return [this.variant ? `${this.isDark ? 'bg' : 'table'}-${this.variant}` : null]
    },
    cellAttrs() {
      // We use computed props here for improved performance by caching
      // the results of the object spread (Object.assign)
      const headOrFoot = this.bvTableThead || this.bvTableTfoot
      return {
        colspan: this.colspan || null,
        rowspan: this.rowspan || null,
        role: headOrFoot ? 'columnheader' : this.header ? 'rowheader' : 'cell',
        scope: headOrFoot ? 'col' : this.header ? 'row' : null,
        'data-label': this.isStacked ? this.stackedHeading || '' : null,
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
