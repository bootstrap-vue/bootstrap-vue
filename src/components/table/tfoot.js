import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  footVariant: {
    type: String, // supported values: 'lite', 'dark', or null
    default: null
  }
}

// @vue/component
export const BTfoot = /*#__PURE__*/ Vue.extend({
  name: 'BTfoot',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide() /* istanbul ignore next: until tests are written */ {
    return {
      bvTableTfoot: this
    }
  },
  inject: {
    bvTable: {
      default: null
    }
  },
  props: props,
  computed: {
    tfootClasses() /* istanbul ignore next: until tests are written */ {
      return [this.footVariant ? `thead-${this.footVariant}` : null]
    },
    tfootAttrs() /* istanbul ignore next: until tests are written */ {
      return { role: 'rowgroup', ...this.$attrs }
    }
  },
  render(h) /* istanbul ignore next: until tests are written */ {
    return h(
      'tfoot',
      {
        class: this.tfootClasses,
        attrs: this.tfootAttrs,
        // Pass down any native listeners
        on: this.$listeners
      },
      this.normalizeSlot('default', {})
    )
  }
})
