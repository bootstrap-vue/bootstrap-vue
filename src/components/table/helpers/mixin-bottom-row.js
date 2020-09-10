import { isFunction } from '../../../utils/inspect'
import { BTr } from '../tr'

const slotName = 'bottom-row'

export default {
  methods: {
    renderBottomRow() {
      const h = this.$createElement

      // Static bottom row slot (hidden in visibly stacked mode as we can't control the data-label)
      // If in *always* stacked mode, we don't bother rendering the row
      if (!this.hasNormalizedSlot(slotName) || this.stacked === true || this.stacked === '') {
        return h()
      }

      const fields = this.computedFields

      return h(
        BTr,
        {
          key: 'b-bottom-row',
          staticClass: 'b-table-bottom-row',
          class: [
            isFunction(this.tbodyTrClass)
              ? /* istanbul ignore next */ this.tbodyTrClass(null, 'row-bottom')
              : this.tbodyTrClass
          ],
          attrs: isFunction(this.tbodyTrAttr)
            ? /* istanbul ignore next */ this.tbodyTrAttr(null, 'row-bottom')
            : this.tbodyTrAttr
        },
        this.normalizeSlot(slotName, { columns: fields.length, fields })
      )
    }
  }
}
