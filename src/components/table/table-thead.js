import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  headVariant: {
    type: String, // supported values: 'lite', 'dark', or null
    default: null
  }
}

// @vue/component
export const BTableThead = /*#__PURE__*/ Vue.extend({
  name: 'BTableThead',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide() /* istanbul ignore next: until tests are written */ {
    return {
      bvTableThead: this
    }
  },
  inject: {
    bvTable: {
      default: null
    }
  },
  props: props,
  computed: {
    theadClasses() /* istanbul ignore next: until tests are written */ {
      return [this.headVariant ? `thead-${this.headVariant}` : null]
    },
    theadAttrs() /* istanbul ignore next: until tests are written */ {
      return { role: 'rowgroup', ...this.$attrs }
    }
  },
  render(h) /* istanbul ignore next: until tests are written */ {
    return h(
      'thead',
      {
        class: this.theadClasses,
        attrs: this.theadAttrs,
        // Pass down any native listeners
        on: this.$listeners
      },
      this.normalizeSlot('default', {})
    )
  }
})
