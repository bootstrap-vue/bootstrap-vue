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
    isDark() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup && this.bvTableRowGroup.bvTable && this.bvTableRowGroup.bvTable.dark
    },
    isStacked() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup && this.bvTableRowGroup.bvTable && this.bvTableRowGroup.bvTable.isStacked
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
