import { extend } from '../../../vue'
import { SLOT_NAME_BOTTOM_ROW } from '../../../constants/slots'
import { isFunction } from '../../../utils/inspect'
import { BTr } from '../tr'

// --- Props ---

export const props = {}

// --- Mixin ---

// @vue/component
export const bottomRowMixin = extend({
  props,
  methods: {
    renderBottomRow() {
      const { computedFields: fields, stacked, tbodyTrClass, tbodyTrAttr } = this
      const h = this.$createElement

      // Static bottom row slot (hidden in visibly stacked mode as we can't control the data-label)
      // If in *always* stacked mode, we don't bother rendering the row
      if (!this.hasNormalizedSlot(SLOT_NAME_BOTTOM_ROW) || stacked === true || stacked === '') {
        return h()
      }

      return h(
        BTr,
        {
          staticClass: 'b-table-bottom-row',
          class: [
            isFunction(tbodyTrClass)
              ? /* istanbul ignore next */ tbodyTrClass(null, 'row-bottom')
              : tbodyTrClass
          ],
          attrs: isFunction(tbodyTrAttr)
            ? /* istanbul ignore next */ tbodyTrAttr(null, 'row-bottom')
            : tbodyTrAttr,
          key: 'b-bottom-row'
        },
        this.normalizeSlot(SLOT_NAME_BOTTOM_ROW, { columns: fields.length, fields })
      )
    }
  }
})
