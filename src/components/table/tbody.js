import Vue from '../../utils/vue'
import attrsMixin from '../../mixins/attrs'
import listenersMixin from '../../mixins/listeners'
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

// TODO:
//   In Bootstrap v5, we won't need "sniffing" as table element variants properly inherit
//   to the child elements, so this can be converted to a functional component
// @vue/component
export const BTbody = /*#__PURE__*/ Vue.extend({
  name: 'BTbody',
  // Mixin order is important!
  mixins: [attrsMixin, listenersMixin, normalizeSlotMixin],
  inheritAttrs: false,
  provide() {
    return {
      bvTableRowGroup: this
    }
  },
  inject: {
    bvTable: {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      /* istanbul ignore next */
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
    hasStickyHeader() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      return !this.isStacked && this.bvTable.stickyHeader
    },
    tableVariant() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable.tableVariant
    },
    isTransitionGroup() {
      return this.tbodyTransitionProps || this.tbodyTransitionHandlers
    },
    tbodyAttrs() {
      return { role: 'rowgroup', ...this.bvAttrs }
    },
    tbodyProps() {
      return this.tbodyTransitionProps ? { ...this.tbodyTransitionProps, tag: 'tbody' } : {}
    }
  },
  render(h) {
    const data = {
      props: this.tbodyProps,
      attrs: this.tbodyAttrs
    }
    if (this.isTransitionGroup) {
      // We use native listeners if a transition group for any delegated events
      data.on = this.tbodyTransitionHandlers || {}
      data.nativeOn = this.bvListeners
    } else {
      // Otherwise we place any listeners on the tbody element
      data.on = this.bvListeners
    }
    return h(
      this.isTransitionGroup ? 'transition-group' : 'tbody',
      data,
      this.normalizeSlot('default')
    )
  }
})
