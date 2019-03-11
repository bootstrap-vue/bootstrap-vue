export default {
  methods: {
    renderBusy() {
      const h = this.$createElement

      // Return a busy indicator row, or null if not busy
      if (this.computedBusy && this.hasNormalizedSlot('table-busy')) {
        // Show the busy slot
        const trAttrs = {
          role: this.isStacked ? 'row' : null
        }
        const tdAttrs = {
          colspan: String(this.computedFields.length),
          role: this.isStacked ? 'cell' : null
        }
        return h(
          'tr',
          {
            key: 'table-busy-slot',
            staticClass: 'b-table-busy-slot',
            class: [
              typeof this.tbodyTrClass === 'function'
                ? this.tbodyTrClass(null, 'table-busy')
                : this.tbodyTrClass
            ],
            attrs: trAttrs
          },
          [h('td', { attrs: tdAttrs }, [this.normalizeSlot('table-busy', {})])]
        )
      } else {
        // We return null here so that we can determine if we need to
        // render the table items rows or not.
        return null
      }
    }
  }
}
