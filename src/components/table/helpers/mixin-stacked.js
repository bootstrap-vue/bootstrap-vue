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
      return this.stacked === '' ? true : Boolean(this.stacked)
    },
    stackedTableClasses() {
      return {
        'b-table-stacked': this.stacked === true || this.stacked === '',
        [`b-table-stacked-${this.stacked}`]: this.stacked !== true && this.stacked
      }
    }
  }
}
