import Vue from '../../utils/vue'
import { omit } from '../../utils/object'
import { BTableCell } from './helpers/table-cell'

// @vue/component
export const BTd = /*#__PURE__*/ Vue.extend({
  name: 'BTd',
  extends: BTableCell,
  computed: {
    tag() {
      return 'td'
    }
  }
})
