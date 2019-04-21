import { isFunction } from '../../../utils/inspect'

export default {
  methods: {
    renderTopRow() {
      const h = this.$createElement

      // Add static Top Row slot (hidden in visibly stacked mode as we can't control the data-label)
      // If in always stacked mode, we don't bother rendering the row
      if (!this.hasNormalizedSlot('top-row') || this.isStacked === true) {
        return h(false)
      }

      const fields = this.computedFields

      return h(
        'tr',
        {
          key: 'top-row',
          staticClass: 'b-table-top-row',
          class: [
            isFunction(this.tbodyTrClass) ? this.tbodyTrClass(null, 'row-top') : this.tbodyTrClass
          ],
          attrs: { role: 'row' }
        },
        [this.normalizeSlot('top-row', { columns: fields.length, fields: fields })]
      )
    }
  }
}
