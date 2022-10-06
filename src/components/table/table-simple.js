import { extend } from '../../vue'
import { NAME_TABLE_SIMPLE } from '../../constants/components'
import { sortKeys } from '../../utils/object'
import { makePropsConfigurable } from '../../utils/props'
import { attrsMixin } from '../../mixins/attrs'
import { hasListenerMixin } from '../../mixins/has-listener'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { stackedMixin, props as stackedProps } from './helpers/mixin-stacked'
import { tableRendererMixin, props as tableRendererProps } from './helpers/mixin-table-renderer'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...stackedProps,
    ...tableRendererProps
  }),
  NAME_TABLE_SIMPLE
)

// --- Main component ---

// @vue/component
export const BTableSimple = /*#__PURE__*/ extend({
  name: NAME_TABLE_SIMPLE,
  // Order of mixins is important!
  // They are merged from first to last, followed by this component
  mixins: [
    // General mixins
    attrsMixin,
    hasListenerMixin,
    idMixin,
    normalizeSlotMixin,
    // Required table mixins
    tableRendererMixin,
    // Table features mixins
    // Stacked requires extra handling by users via
    // the table cell `stacked-heading` prop
    stackedMixin
  ],
  props,
  computed: {
    isTableSimple() {
      return true
    }
  }
  // Render function is provided by `tableRendererMixin`
})
