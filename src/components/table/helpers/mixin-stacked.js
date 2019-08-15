// Mixin for providing stacked tables

export default {
  props: {
    stacked: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    isStacked() {
      // `true` when always stacked, or returns breakpoint specified
      return this.stacked === '' ? true : this.stacked
    },
    isStackedAlways() {
      return this.isStacked === true
    },
    stackedTableClasses() {
      return {
        'b-table-stacked': this.isStackedAlways,
        [`b-table-stacked-${this.stacked}`]: !this.isStackedAlways && this.isStacked
      }
    }
  }
}
