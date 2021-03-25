import { Vue } from '../../vue'
import { NAME_TABLE_LITE } from '../../constants/components'
import { sortKeys } from '../../utils/object'
import { makePropsConfigurable } from '../../utils/props'
import { attrsMixin } from '../../mixins/attrs'
import { hasListenerMixin } from '../../mixins/has-listener'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { captionMixin, props as captionProps } from './helpers/mixin-caption'
import { colgroupMixin, props as colgroupProps } from './helpers/mixin-colgroup'
import { itemsMixin, props as itemsProps } from './helpers/mixin-items'
import { stackedMixin, props as stackedProps } from './helpers/mixin-stacked'
import { tableRendererMixin, props as tableRendererProps } from './helpers/mixin-table-renderer'
import { tbodyMixin, props as tbodyProps } from './helpers/mixin-tbody'
import { tfootMixin, props as tfootProps } from './helpers/mixin-tfoot'
import { theadMixin, props as theadProps } from './helpers/mixin-thead'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...captionProps,
    ...colgroupProps,
    ...itemsProps,
    ...stackedProps,
    ...tableRendererProps,
    ...tbodyProps,
    ...tfootProps,
    ...theadProps
  }),
  NAME_TABLE_LITE
)

// --- Main component ---

// @vue/component
export const BTableLite = /*#__PURE__*/ Vue.extend({
  name: NAME_TABLE_LITE,
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
    // These are pretty lightweight, and are useful for lightweight tables
    captionMixin,
    colgroupMixin
  ],
  props
  // Render function is provided by `tableRendererMixin`
})
