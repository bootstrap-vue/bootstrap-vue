import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  tbodyTransitionProps: {
    type: Object
    // default: undefined
  },
  tbodyTransitionHandlers: {
    type: Object
    // default: undefined
  }
}

// @vue/component
export const BTbody = /*#__PURE__*/ Vue.extend({
  name: 'BTbody',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide() {
    return {
      bvTableRowGroup: this
    }
  },
  inject: {
    bvTable: {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      default() /* istanbul ignore next */ {
        return {}
      }
    }
  },
  props,
  computed: {
    isTbody() {
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
      // Sticky headers are only supported in thead
      return false
    },
    tableVariant() /* istanbul ignore next: Not currently sniffed in tests */ {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable.tableVariant
    },
    isTransitionGroup() {
      return this.tbodyTransitionProps || this.tbodyTransitionHandlers
    },
    tbodyAttrs() {
      return { role: 'rowgroup', ...this.$attrs }
    },
    tbodyProps() {
      return this.tbodyTransitionProps ? { ...this.tbodyTransitionProps, tag: 'tbody' } : {}
    },
    tbodyListeners() {
      const handlers = this.tbodyTransitionHandlers || {}
      return { ...this.$listeners, ...handlers }
    }
  },
  render(h) {
    return h(
      this.isTransitionGroup ? 'transition-group' : 'tbody',
      {
        props: this.tbodyProps,
        attrs: this.tbodyAttrs,
        // Pass down any listeners
        on: this.tbodyListeners
      },
      this.normalizeSlot('default', {})
    )
  }
})
