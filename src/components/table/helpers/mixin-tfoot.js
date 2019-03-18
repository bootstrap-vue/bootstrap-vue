export default {
  props: {
    footClone: {
      type: Boolean,
      default: false
    },
    footVariant: {
      type: String,
      default: ''
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
  computed: {
    footClasses() {
      const variant = this.footVariant || this.headVariant || null
      return [variant ? 'thead-' + variant : '', this.tfootClass]
    }
  },
  methods: {
    renderTfoot() {
      const h = this.$createElement

      // Passing true to renderThead will make it render a tfoot
      return this.footClone ? this.renderThead(true) : h(false)
    }
  }
}
