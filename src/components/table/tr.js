import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  variant: {
    type: String,
    default: null
  }
}

// @vue/component
export const BTr = /*#__PURE__*/ Vue.extend({
  name: 'BTr',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide() {
    return {
      bvTableTr: this
    }
  },
  inject: {
    bvTableRowGroup: {
      defaut: null
    }
  },
  props,
  computed: {
    inTbody() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup && this.bvTableRowGroup.isTbody
    },
    inThead() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup && this.bvTableRowGroup.isThead
    },
    inTfoot() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup && this.bvTableRowGroup.isTfoot
      )
    },
    isDark() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup && this.bvTableRowGroup.isDark
    },
    isStacked() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup && this.bvTableRowGroup.isStacked
    },
    isResponsive() {
      // Sniffed by <b-td> / <b-th>
      return !this.isStacked && this.bvTableRowGroup && this.bvTableRowGroup.isResponsive
    },
    isStickyHeader() {
      // Sniffed by <b-td> / <b-th>
      // Sticky headers are only supported in thead
      return this.bvTableRowGroup && this.bvTableRowGroup.isStacked
    },
    trClasses() {
      return [this.variant ? `${this.isDark ? 'bg' : 'table'}-${this.variant}` : null]
    },
    trAttrs() {
      return { role: 'row', ...this.$attrs }
    }
  },
  render(h) {
    return h(
      'tr',
      {
        class: this.trClasses,
        attrs: this.trAttrs,
        // Pass native listeners to child
        on: this.$listeners
      },
      this.normalizeSlot('default', {})
    )
  }
})
