import Vue from '../../vue'
import { NAME_TABLE_SIMPLE } from '../../constants/components'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// Table mixins
import stackedMixin from './helpers/mixin-stacked'
import tableRendererMixin from './helpers/mixin-table-renderer'

// b-table-simple component definition
// @vue/component
export const BTableSimple = /*#__PURE__*/ Vue.extend({
  name: NAME_TABLE_SIMPLE,
  // Order of mixins is important!
  // They are merged from first to last, followed by this component.
  mixins: [
    // Required mixins
    idMixin,
    normalizeSlotMixin,
    tableRendererMixin,
    // feature mixin
    // Stacked requires extra handling by users via
    // the table cell `stacked-heading` prop
    stackedMixin
  ],
  computed: {
    isTableSimple() {
      return true
    }
  }
  // render function provided by table-renderer mixin
})
