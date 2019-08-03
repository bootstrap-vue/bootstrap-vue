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
      // Ture when always stacked, or breakpoint specified
      return this.stacked === '' ? true : Boolean(this.stacked)
    },
    isStackedAlways() {
      // True when stacked === true or stacked === ''
      return this.stacked === true || this.stacked === ''
    },
    stackedTableClasses() {
      return {
        'b-table-stacked': this.isStackedAlways,
        [`b-table-stacked-${this.stacked}`]: !this.isStackedAlways && this.isStacked
      }
    }
  }
}
