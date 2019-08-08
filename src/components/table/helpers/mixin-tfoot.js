import { getComponentConfig } from '../../../utils/config'

export default {
  props: {
    footClone: {
      type: Boolean,
      default: false
    },
    footVariant: {
      type: String,
      default: () => getComponentConfig('BTable', 'footVariant')
    },
    tfootClass: {
      type: [String, Array, Object],
      default: null
    },
    tfootTrClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  methods: {
    renderTfoot() {
      const h = this.$createElement

      // Passing true to renderThead will make it render a tfoot
      return this.footClone ? this.renderThead(true) : h()
    }
  }
}
