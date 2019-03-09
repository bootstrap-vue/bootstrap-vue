export default {
  props: {
    showEmpty: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: 'There are no records to show'
    },
    emptyHtml: {
      type: String
    },
    emptyFilteredText: {
      type: String,
      default: 'There are no records matching your request'
    },
    emptyFilteredHtml: {
      type: String
    }
  },
  methods: {
    renderEmptyRow(h) {
      const items = this.localItems
      let $empty = h(false)

      if (
        this.showEmpty &&
        (!items || items.length === 0) &&
        !(this.computedBusy && this.$slots['table-busy'])
      ) {
        $empty = this.normalizeSlot(this.isFiltered ? 'emptyfiltered' : 'empty', {
          emptyFilteredHtml: this.emptyFilteredHtml,
          emptyFilteredText: this.emptyFilteredText,
          emptyHtml: this.emptyHtml,
          emptyText: this.emptyText,
          fields: fields,
          items: items
        })
        if (!$empty) {
          $empty = h('div', {
            class: ['text-center', 'my-2'],
            domProps: this.isFiltered
              ? htmlOrText(this.emptyFilteredHtml, this.emptyFilteredText)
              : htmlOrText(this.emptyHtml, this.emptyText)
          })
        }
        $empty = h(
          'td',
          {
            attrs: {
              colspan: String(fields.length),
              role: this.isStacked ? 'cell' : null
            }
          },
          [h('div', { attrs: { role: 'alert', 'aria-live': 'polite' } }, [$empty])]
        )
        $empty = h(
          'tr',
          {
            key: '__b-table-empty-row__',
            staticClass: 'b-table-empty-row',
            class: [
              typeof this.tbodyTrClass === 'function'
                ? this.tbodyTrClass(null, 'row-empty')
                : this.tbodyTrClass
            ],
            attrs: this.isStacked ? { role: 'row' } : {}
          },
          [$empty]
        )
      }

      return $empty
    }
  }
}
