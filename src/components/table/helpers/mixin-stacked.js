import { extend } from '../../../vue'
import { PROP_TYPE_BOOLEAN_STRING } from '../../../constants/props'
import { makeProp } from '../../../utils/props'

// --- Props ---

export const props = {
  stacked: makeProp(PROP_TYPE_BOOLEAN_STRING, false)
}

// --- Mixin ---

// @vue/component
export const stackedMixin = extend({
  props,
  computed: {
    isStacked() {
      const { stacked } = this
      // `true` when always stacked, or returns breakpoint specified
      return stacked === '' ? true : stacked
    },
    isStackedAlways() {
      return this.isStacked === true
    },
    stackedTableClasses() {
      const { isStackedAlways } = this
      return {
        'b-table-stacked': isStackedAlways,
        [`b-table-stacked-${this.stacked}`]: !isStackedAlways && this.isStacked
      }
    }
  }
})
