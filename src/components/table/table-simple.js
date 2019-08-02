import Vue from '../../utils/vue'

// Mixins
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// Main table renderer mixin
import tableRendererMixin from './helpers/mixin-table-renderer'

// b-table-simple component definition
// @vue/component
export const BTableSimple = /*#__PURE__*/ Vue.extend({
  name: 'BTableSimple',
  // Order of mixins is important!
  // They are merged from first to last, followed by this component.
  mixins: [
    // Required mixins
    idMixin,
    normalizeSlotMixin,
    tableRendererMixin
  ],
  computed: {
    isTableSimple() {
      return true
    }
  }
  // render function provided by table-renderer mixin
})

export default BTableSimple
