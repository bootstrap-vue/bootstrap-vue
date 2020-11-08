// Mixin for providing stacked tables
import { NAME_TABLE } from '../../../constants/components'
import { makePropsConfigurable } from '../../../utils/config'

export default {
  props: makePropsConfigurable(
    {
      stacked: {
        type: [Boolean, String],
        default: false
      }
    },
    NAME_TABLE
  ),
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
