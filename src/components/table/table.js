import Vue from '../../vue'
import { NAME_TABLE } from '../../constants/components'
import attrsMixin from '../../mixins/attrs'
import hasListenerMixin from '../../mixins/has-listener'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// Table helper mixins
import bottomRowMixin from './helpers/mixin-bottom-row'
import busyMixin from './helpers/mixin-busy'
import captionMixin from './helpers/mixin-caption'
import colgroupMixin from './helpers/mixin-colgroup'
import emptyMixin from './helpers/mixin-empty'
import filteringMixin from './helpers/mixin-filtering'
import itemsMixin from './helpers/mixin-items'
import paginationMixin from './helpers/mixin-pagination'
import providerMixin from './helpers/mixin-provider'
import selectableMixin from './helpers/mixin-selectable'
import sortingMixin from './helpers/mixin-sorting'
import stackedMixin from './helpers/mixin-stacked'
import tableRendererMixin from './helpers/mixin-table-renderer'
import tbodyMixin from './helpers/mixin-tbody'
import tfootMixin from './helpers/mixin-tfoot'
import theadMixin from './helpers/mixin-thead'
import topRowMixin from './helpers/mixin-top-row'

// b-table component definition
// @vue/component
export const BTable = /*#__PURE__*/ Vue.extend({
  name: NAME_TABLE,
  // Order of mixins is important!
  // They are merged from first to last, followed by this component
  mixins: [
    // General mixins
    attrsMixin,
    hasListenerMixin,
    idMixin,
    normalizeSlotMixin,
    // Required table mixins
    itemsMixin,
    tableRendererMixin,
    stackedMixin,
    theadMixin,
    tfootMixin,
    tbodyMixin,
    // Table features mixins
    stackedMixin,
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
  // Render function is provided by table-renderer mixin
})
