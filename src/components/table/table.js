import { extend } from '../../vue'
import { NAME_TABLE } from '../../constants/components'
import { sortKeys } from '../../utils/object'
import { makePropsConfigurable } from '../../utils/props'
import { attrsMixin } from '../../mixins/attrs'
import { hasListenerMixin } from '../../mixins/has-listener'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { bottomRowMixin, props as bottomRowProps } from './helpers/mixin-bottom-row'
import { busyMixin, props as busyProps } from './helpers/mixin-busy'
import { captionMixin, props as captionProps } from './helpers/mixin-caption'
import { colgroupMixin, props as colgroupProps } from './helpers/mixin-colgroup'
import { emptyMixin, props as emptyProps } from './helpers/mixin-empty'
import { filteringMixin, props as filteringProps } from './helpers/mixin-filtering'
import { itemsMixin, props as itemsProps } from './helpers/mixin-items'
import { paginationMixin, props as paginationProps } from './helpers/mixin-pagination'
import { providerMixin, props as providerProps } from './helpers/mixin-provider'
import { selectableMixin, props as selectableProps } from './helpers/mixin-selectable'
import { sortingMixin, props as sortingProps } from './helpers/mixin-sorting'
import { stackedMixin, props as stackedProps } from './helpers/mixin-stacked'
import { tableRendererMixin, props as tableRendererProps } from './helpers/mixin-table-renderer'
import { tbodyMixin, props as tbodyProps } from './helpers/mixin-tbody'
import { tfootMixin, props as tfootProps } from './helpers/mixin-tfoot'
import { theadMixin, props as theadProps } from './helpers/mixin-thead'
import { topRowMixin, props as topRowProps } from './helpers/mixin-top-row'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...bottomRowProps,
    ...busyProps,
    ...captionProps,
    ...colgroupProps,
    ...emptyProps,
    ...filteringProps,
    ...itemsProps,
    ...paginationProps,
    ...providerProps,
    ...selectableProps,
    ...sortingProps,
    ...stackedProps,
    ...tableRendererProps,
    ...tbodyProps,
    ...tfootProps,
    ...theadProps,
    ...topRowProps
  }),
  NAME_TABLE
)

// --- Main component ---

// @vue/component
export const BTable = /*#__PURE__*/ extend({
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
  ],
  props
  // Render function is provided by `tableRendererMixin`
})
