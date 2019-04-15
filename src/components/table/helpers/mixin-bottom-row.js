import { isFunction } from '../../../utils/inspect'

export default {
  methods: {
    renderBottomRow() {
      const h = this.$createElement

      // Static bottom row slot (hidden in visibly stacked mode as we can't control the data-label)
      // If in always stacked mode, we don't bother rendering the row
      if (!this.hasNormalizedSlot('bottom-row') || this.isStacked === true) {
        return h(false)
      }

      const fields = this.computedFields

      return h(
        'tr',
        {
          key: '__b-table-bottom-row__',
          staticClass: 'b-table-bottom-row',
          class: [
            isFunction(this.tbodyTrClass)
              ? this.tbodyTrClass(null, 'row-bottom')
              : this.tbodyTrClass
          ],
          attrs: { role: 'row' }
        },
        this.normalizeSlot('bottom-row', { columns: fields.length, fields: fields })
      )
    }
  }
}
