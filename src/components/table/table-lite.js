import Vue from '../../utils/vue'

// Mixins
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// Table helper Mixins
import itemsMixin from './helpers/mixin-items'
import captionMixin from './helpers/mixin-caption'
import colgroupMixin from './helpers/mixin-colgroup'
import theadMixin from './helpers/mixin-thead'
import tfootMixin from './helpers/mixin-tfoot'
import tbodyMixin from './helpers/mixin-tbody'

// Main table renderer mixin
import tableRendererMixin from './helpers/mixin-table-renderer'

// b-table-lite component definition
// @vue/component
export const BTableLite = /*#__PURE__*/ Vue.extend({
  name: 'BTableLite',
  // Order of mixins is important!
  // They are merged from first to last, followed by this component.
  mixins: [
    // Required mixins
    idMixin,
    normalizeSlotMixin,
    itemsMixin,
    tableRendererMixin,
    theadMixin,
    tfootMixin,
    tbodyMixin,
    // Features Mixins
    // These are pretty lightweight, and are useful for plain tables
    captionMixin,
    colgroupMixin
  ]
  // render function provided by table-renderer mixin
})

export default BTableLite
