import Vue from '../../utils/vue'

// Mixins
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// Table helper Mixins
import itemsMixin from './helpers/mixin-items'
import filteringMixin from './helpers/mixin-filtering'
import sortingMixin from './helpers/mixin-sorting'
import paginationMixin from './helpers/mixin-pagination'
import captionMixin from './helpers/mixin-caption'
import colgroupMixin from './helpers/mixin-colgroup'
import theadMixin from './helpers/mixin-thead'
import tfootMixin from './helpers/mixin-tfoot'
import tbodyMixin from './helpers/mixin-tbody'
import emptyMixin from './helpers//mixin-empty'
import topRowMixin from './helpers//mixin-top-row'
import bottomRowMixin from './helpers//mixin-bottom-row'
import busyMixin from './helpers/mixin-busy'
import selectableMixin from './helpers/mixin-selectable'
import providerMixin from './helpers/mixin-provider'

// Main table renderer mixin
import tableRendererMixin from './helpers/mixin-table-renderer'

// b-table component definition
// @vue/component
export const BTable = /*#__PURE__*/ Vue.extend({
  name: 'BTable',
  // Order of mixins is important!
  // They are merged from first to last, followed by this component.
  mixins: [
    // Required Mixins
    idMixin,
    normalizeSlotMixin,
    itemsMixin,
    tableRendererMixin,
    theadMixin,
    tfootMixin,
    tbodyMixin,
    // Features Mixins
    filteringMixin,
    sortingMixin,
    paginationMixin,
    captionMixin,
    colgroupMixin,
    selectableMixin,
    emptyMixin,
    topRowMixin,
    bottomRowMixin,
    busyMixin,
    providerMixin
  ]
  // render function provided by table-renderer mixin
})

export default BTable
