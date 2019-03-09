import toString from '../../../utils/to-string'
import get from '../../../utils/get'
import KeyCodes from '../../../utils/key-codes'

export default {
  methods: {
    renderTbodyRowCell(h, field, colIndex, item, rowIndex) {
      // Renders a TD or TH for a row's field
      const $scoped = this.$scopedSlots
      const detailsSlot = $scoped['row-details']
      const rowSelected = this.selectedRows[rowIndex]
      const formatted = this.getFormattedValue(item, field)
      const data = {
        // For the Vue key, we concatinate the column index and field key (as field keys can be duplicated)
        key: `row-${rowIndex}-cell-${colIndex}-${field.key}`,
        class: this.tdClasses(field, item),
        attrs: this.tdAttrs(field, item, colIndex)
      }
      const toggleDetailsFn = () => {
        if (detailsSlot) {
          this.$set(item, '_showDetails', !item._showDetails)
        }
      }
      let $childNodes

      if ($scoped[field.key]) {
        // Has scoped field slot
        $childNodes = [
          $scoped[field.key]({
            item: item,
            index: rowIndex,
            field: field,
            unformatted: get(item, field.key, ''),
            value: formatted,
            toggleDetails: toggleDetailsFn,
            detailsShowing: Boolean(item._showDetails),
            rowSelected: Boolean(rowSelected)
          })
        ]
        if (this.isStacked) {
          // We wrap in a DIV to ensure rendered as a single cell when visually stacked!
          $childNodes = [h('div', {}, [$childNodes])]
        }
      } else {
        // No scoped field slot
        if (this.isStacked) {
          // We wrap in a DIV to ensure rendered as a single cell when visually stacked!
          $childNodes = [h('div', toString(formatted))]
        } else {
          // Non stacked
          $childNodes = toString(formatted)
        }
      }

      // Render either a td or th cell
      return h(field.isRowHeader ? 'th' : 'td', data, $childNodes)
    },
    renderTbodyRow(h, item, rowIndex) {
      // Renders an item's row (or rows if details supported)
      const $scoped = this.$scopedSlots
      const fields = this.computedFields
      const tableStriped = this.striped
      const hasRowClickHandler = this.$listeners['row-clicked'] || this.selectable
      const $detailsSlot = $scoped['row-details']
      const rowShowDetails = Boolean(item._showDetails && $detailsSlot)
      const rowSelected = this.selectedRows[rowIndex]
      // We can return more than one TR if rowDetails enabled
      const $rows = []

      // Details ID needed for aria-describedby when details showing
      const detailsId = rowShowDetails ? this.safeId(`_details_${rowIndex}_`) : null
      const toggleDetailsFn = () => {
        if ($detailsSlot) {
          this.$set(item, '_showDetails', !item._showDetails)
        }
      }

      // For each item data field in row
      const $tds = fields.map((field, colIndex) => {
        return this.renderTbodyRowCell(h, field, colIndex, item, rowIndex)
      })

      // Calculate the row number in the dataset (indexed from 1)
      let ariaRowIndex = null
      if (this.currentPage && this.perPage && this.perPage > 0) {
        ariaRowIndex = String((this.currentPage - 1) * this.perPage + rowIndex + 1)
      }

      // Create a unique :key to help ensure that sub components are re-rendered rather than
      // re-used, which can cause issues. If a primary key is not provided we use the rendered
      // rows index within the tbody.
      // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/2410
      const primaryKey = this.primaryKey
      const rowKey =
        primaryKey && item[primaryKey] !== undefined && item[primaryKey] !== null
          ? toString(item[primaryKey])
          : String(rowIndex)

      // If primary key is provided, use it to generate a unique ID on each tbody > tr
      // In the format of '{tableId}__row_{primaryKeyValue}'
      const rowId =
        primaryKey && item[primaryKey] !== undefined && item[primaryKey] !== null
          ? this.safeId(`_row_${item[primaryKey]}`)
          : null

      // Add the item row
      $rows.push(
        h(
          'tr',
          {
            key: `__b-table-row-${rowKey}__`,
            class: [
              this.rowClasses(item),
              {
                'b-table-has-details': rowShowDetails,
                'b-row-selected': rowSelected,
                [`${this.dark ? 'bg' : 'table'}-${this.selectedVariant}`]:
                  rowSelected && this.selectedVariant
              }
            ],
            attrs: {
              id: rowId,
              tabindex: hasRowClickHandler ? '0' : null,
              'data-pk': rowId ? String(item[primaryKey]) : null,
              'aria-describedby': detailsId,
              'aria-owns': detailsId,
              'aria-rowindex': ariaRowIndex,
              'aria-selected': this.selectable ? (rowSelected ? 'true' : 'false') : null,
              role: this.isStacked ? 'row' : null
            },
            on: {
              // TODO: only instatiate handlers if we have registered listeners
              auxclick: evt => {
                if (evt.which === 2) {
                  this.middleMouseRowClicked(evt, item, rowIndex)
                }
              },
              click: evt => {
                this.rowClicked(evt, item, rowIndex)
              },
              keydown: evt => {
                const keyCode = evt.keyCode
                if (keyCode === KeyCodes.ENTER || keyCode === KeyCodes.SPACE) {
                  if (
                    evt.target &&
                    evt.target.tagName === 'TR' &&
                    evt.target === document.activeElement
                  ) {
                    this.rowClicked(evt, item, rowIndex)
                  }
                }
              },
              contextmenu: evt => {
                this.rowContextmenu(evt, item, rowIndex)
              },
              // Note: these events are not accessibility friendly!
              dblclick: evt => {
                this.rowDblClicked(evt, item, rowIndex)
              },
              mouseenter: evt => {
                this.rowHovered(evt, item, rowIndex)
              },
              mouseleave: evt => {
                this.rowUnhovered(evt, item, rowIndex)
              }
            }
          },
          $tds
        )
      )

      // Row Details slot
      if (rowShowDetails) {
        const tdAttrs = { colspan: String(fields.length) }
        const trAttrs = { id: detailsId }
        if (this.isStacked) {
          tdAttrs['role'] = 'cell'
          trAttrs['role'] = 'row'
        }
        // Render the details slot
        const $details = h('td', { attrs: tdAttrs }, [
          $detailsSlot({
            item: item,
            index: rowIndex,
            fields: fields,
            toggleDetails: toggleDetailsFn
          })
        ])

        // Add a hidden row to keep table row striping consistent when details showing
        if (tableStriped) {
          $rows.push(
            h('tr', {
              key: `__b-table-details-${rowIndex}-stripe__`,
              staticClass: 'd-none',
              attrs: { 'aria-hidden': 'true' }
            })
          )
        }

        // Add the actual details row
        $rows.push(
          h(
            'tr',
            {
              key: `__b-table-details-${rowIndex}__`,
              staticClass: 'b-table-details',
              class: [
                typeof this.tbodyTrClass === 'function'
                  ? this.tbodyTrClass(item, 'row-details')
                  : this.tbodyTrClass
              ],
              attrs: trAttrs
            },
            [$details]
          )
        )
      } else if ($detailsSlot) {
        // Only add the placeholder if a the table has a row-details slot defined (but not shown)
        $rows.push(h(false))
        if (tableStriped) {
          // add extra placeholder if table is striped
          $rows.push(h(false))
        }
      }

      // Return the row(s)
      return $rows
    }
  }
}
