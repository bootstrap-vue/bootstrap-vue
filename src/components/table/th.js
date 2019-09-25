import Vue from '../../utils/vue'
import { BTableCell } from './helpers/table-cell'

// @vue/component
export const BTh = /*#__PURE__*/ Vue.extend({
  name: 'BTh',
  extends: BTableCell,
  computed: {
    tag() {
      return 'th'
    }
  }
})
