import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  variant: {
    type: String,
    default: null
  }
}

// @vue/component
export const BTableTr = /*#__PURE__*/ Vue.extend({
  name: 'BTableTr',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide() {
    return {
      bvTableRow: this
    }
  },
  inject: {
    bvTable: {
      default: null
    }
  },
  props: props,
  computed: {
    isDark() /* istanbul ignore next: until tests are written */ {
      return this.bvTable && this.bvTable.dark
    },
    trClasses() /* istanbul ignore next: until tests are written */ {
      return [this.variant ? `${this.isDark ? 'bg' : 'table'}-${this.variant}` : null]
    },
    trAttrs() /* istanbul ignore next: until tests are written */ {
      return { role: 'row', ...this.$attrs }
    }
  },
  render(h) /* istanbul ignore next: until tests are written */ {
    return h(
      'div',
      {
        class: this.trClasses,
        attrs: this.trAttrs,
        // Pass native listeners to child
        on: this.$listeners
      },
      this.noramlizeSlot('default', {})
    )
  }
})
