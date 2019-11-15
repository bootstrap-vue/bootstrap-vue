import Vue from '../../utils/vue'

// Mixins
import hasListenerMixin from '../../mixins/has-listener'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// Table helper Mixins
import itemsMixin from './helpers/mixin-items'
import captionMixin from './helpers/mixin-caption'
import colgroupMixin from './helpers/mixin-colgroup'
import stackedMixin from './helpers/mixin-stacked'
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
    hasListenerMixin,
    idMixin,
    normalizeSlotMixin,
    itemsMixin,
    tableRendererMixin,
    stackedMixin,
    theadMixin,
    tfootMixin,
    tbodyMixin,
    // Features Mixins
    // These are pretty lightweight, and are useful for lightweight tables
    captionMixin,
    colgroupMixin
  ]
  // render function provided by table-renderer mixin
})
