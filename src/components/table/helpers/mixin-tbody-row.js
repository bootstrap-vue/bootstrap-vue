import get from '../../../utils/get'
import toString from '../../../utils/to-string'
import { isFunction, isString, isUndefinedOrNull } from '../../../utils/inspect'
import { BTr } from '../tr'
import { BTd } from '../td'
import { BTh } from '../th'

const detailsSlotName = 'row-details'

export default {
  props: {
    tbodyTrClass: {
      type: [String, Array, Function],
      default: null
    }
  },
  methods: {
    // Methods for computing classes, attributes and styles for table cells
    getTdValues(item, key, tdValue, defValue) {
      const parent = this.$parent
      if (tdValue) {
        const value = get(item, key, '')
        if (isFunction(tdValue)) {
          return tdValue(value, key, item)
        } else if (isString(tdValue) && isFunction(parent[tdValue])) {
          return parent[tdValue](value, key, item)
        }
        return tdValue
      }
      return defValue
    },
    getThValues(item, key, thValue, type, defValue) {
      const parent = this.$parent
      if (thValue) {
        const value = get(item, key, '')
        if (isFunction(thValue)) {
          return thValue(value, key, item, type)
        } else if (isString(thValue) && isFunction(parent[thValue])) {
          return parent[thValue](value, key, item, type)
        }
        return thValue
      }
      return defValue
    },
    // Method to get the value for a field
    getFormattedValue(item, field) {
      const key = field.key
      const formatter = this.getFieldFormatter(key)
      let value = get(item, key, null)
      if (isFunction(formatter)) {
        value = formatter(value, key, item)
      }
      return isUndefinedOrNull(value) ? '' : value
    },
    // Factory function methods
    toggleDetailsFactory(hasDetailsSlot, item) {
      // Returns a function to toggle a row's details slot
      return () => {
        if (hasDetailsSlot) {
          this.$set(item, '_showDetails', !item._showDetails)
        }
      }
    },
    // Row event handlers
    rowHovered(evt) {
      // `mouseenter` handler (non-bubbling)
      // `this.tbodyRowEvtStopped` from tbody mixin
      if (!this.tbodyRowEvtStopped(evt)) {
        // `this.emitTbodyRowEvent` from tbody mixin
        this.emitTbodyRowEvent('row-hovered', evt)
      }
    },
    rowUnhovered(evt) {
      // `mouseleave` handler (non-bubbling)
      // `this.tbodyRowEvtStopped` from tbody mixin
      if (!this.tbodyRowEvtStopped(evt)) {
        // `this.emitTbodyRowEvent` from tbody mixin
        this.emitTbodyRowEvent('row-unhovered', evt)
      }
    },
    // Render helpers
    renderTbodyRowCell(field, colIndex, item, rowIndex) {
      // Renders a TD or TH for a row's field
      const h = this.$createElement
      const hasDetailsSlot = this.hasNormalizedSlot(detailsSlotName)
      const formatted = this.getFormattedValue(item, field)
      const key = field.key
      // We only uses the helper components for sticky columns to
      // improve performance of BTable/BTableLite by reducing the
      // total number of vue instances created during render
      const cellTag = field.stickyColumn
        ? field.isRowHeader
          ? BTh
          : BTd
        : field.isRowHeader
          ? 'th'
          : 'td'
      const cellVariant =
        item._cellVariants && item._cellVariants[key]
          ? item._cellVariants[key]
          : field.variant || null
      const data = {
        // For the Vue key, we concatenate the column index and
        // field key (as field keys could be duplicated)
        // TODO: Although we do prevent duplicate field keys...
        //   So we could change this to: `row-${rowIndex}-cell-${key}`
        key: `row-${rowIndex}-cell-${colIndex}-${key}`,
        class: [field.class ? field.class : '', this.getTdValues(item, key, field.tdClass, '')],
        props: {},
        attrs: {
          'aria-colindex': String(colIndex + 1),
          ...(field.isRowHeader
            ? this.getThValues(item, key, field.thAttr, 'row', {})
            : this.getTdValues(item, key, field.tdAttr, {}))
        }
      }
      if (field.stickyColumn) {
        // We are using the helper BTd or BTh
        data.props = {
          stackedHeading: this.isStacked ? field.label : null,
          stickyColumn: field.stickyColumn,
          variant: cellVariant
        }
      } else {
        // Using native TD or TH element, so we need to
        // add in the attributes and variant class
        data.attrs['data-label'] =
          this.isStacked && !isUndefinedOrNull(field.label) ? toString(field.label) : null
        data.attrs.role = field.isRowHeader ? 'rowheader' : 'cell'
        data.attrs.scope = field.isRowHeader ? 'row' : null
        // Add in the variant class
        if (cellVariant) {
          data.class.push(`${this.dark ? 'bg' : 'table'}-${cellVariant}`)
        }
      }
      const slotScope = {
        item: item,
        index: rowIndex,
        field: field,
        unformatted: get(item, key, ''),
        value: formatted,
        toggleDetails: this.toggleDetailsFactory(hasDetailsSlot, item),
        detailsShowing: Boolean(item._showDetails)
      }
      if (this.selectedRows) {
        // Add in rowSelected scope property if selectable rows supported
        slotScope.rowSelected = this.isRowSelected(rowIndex)
      }
      // The new `v-slot` syntax doesn't like a slot name starting with
      // a square bracket and if using in-document HTML templates, the
      // v-slot attributes are lower-cased by the browser.
      // Switched to round bracket syntax to prevent confusion with
      // dynamic slot name syntax.
      // We look for slots in this order: `cell(${key})`, `cell(${key.toLowerCase()})`, 'cell()'
      // Slot names are now cached by mixin tbody in `this.$_bodyFieldSlotNameCache`
      // Will be `null` if no slot (or fallback slot) exists
      const slotName = this.$_bodyFieldSlotNameCache[key]
      let $childNodes = slotName ? this.normalizeSlot(slotName, slotScope) : toString(formatted)
      if (this.isStacked) {
        // We wrap in a DIV to ensure rendered as a single cell when visually stacked!
        $childNodes = [h('div', {}, [$childNodes])]
      }
      // Render either a td or th cell
      return h(cellTag, data, [$childNodes])
    },
    renderTbodyRow(item, rowIndex) {
      // Renders an item's row (or rows if details supported)
      const h = this.$createElement
      const fields = this.computedFields
      const tableStriped = this.striped
      const hasDetailsSlot = this.hasNormalizedSlot(detailsSlotName)
      const rowShowDetails = Boolean(item._showDetails && hasDetailsSlot)
      const hasRowClickHandler = this.$listeners['row-clicked'] || this.isSelectable

      // We can return more than one TR if rowDetails enabled
      const $rows = []

      // Details ID needed for `aria-details` when details showing
      // We set it to `null` when not showing so that attribute
      // does not appear on the element
      const detailsId = rowShowDetails ? this.safeId(`_details_${rowIndex}_`) : null

      // For each item data field in row
      const $tds = fields.map((field, colIndex) => {
        return this.renderTbodyRowCell(field, colIndex, item, rowIndex)
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
      const hasPkValue = primaryKey && !isUndefinedOrNull(item[primaryKey])
      const rowKey = hasPkValue ? toString(item[primaryKey]) : String(rowIndex)

      // If primary key is provided, use it to generate a unique ID on each tbody > tr
      // In the format of '{tableId}__row_{primaryKeyValue}'
      const rowId = hasPkValue ? this.safeId(`_row_${item[primaryKey]}`) : null

      // Selectable classes and attributes
      const selectableClasses = this.selectableRowClasses ? this.selectableRowClasses(rowIndex) : {}
      const selectableAttrs = this.selectableRowAttrs ? this.selectableRowAttrs(rowIndex) : {}

      // Add the item row
      $rows.push(
        h(
          BTr,
          {
            key: `__b-table-row-${rowKey}__`,
            ref: 'itemRows',
            refInFor: true,
            class: [
              isFunction(this.tbodyTrClass) ? this.tbodyTrClass(item, 'row') : this.tbodyTrClass,
              selectableClasses,
              rowShowDetails ? 'b-table-has-details' : ''
            ],
            props: { variant: item._rowVariant || null },
            attrs: {
              id: rowId,
              tabindex: hasRowClickHandler ? '0' : null,
              'data-pk': rowId ? String(item[primaryKey]) : null,
              // Should this be `aria-details` instead?
              'aria-details': detailsId,
              'aria-owns': detailsId,
              'aria-rowindex': ariaRowIndex,
              ...selectableAttrs
            },
            on: {
              // Note: These events are not A11Y friendly!
              mouseenter: this.rowHovered,
              mouseleave: this.rowUnhovered
            }
          },
          $tds
        )
      )

      // Row Details slot
      if (rowShowDetails) {
        const detailsScope = {
          item: item,
          index: rowIndex,
          fields: fields,
          toggleDetails: this.toggleDetailsFactory(hasDetailsSlot, item)
        }

        // Render the details slot in a TD
        const $details = h(BTd, { props: { colspan: fields.length } }, [
          this.normalizeSlot(detailsSlotName, detailsScope)
        ])

        // Add a hidden row to keep table row striping consistent when details showing
        if (tableStriped) {
          $rows.push(
            // We don't use `BTr` here as we dont need the extra functionality
            h('tr', {
              key: `__b-table-details-stripe__${rowKey}`,
              staticClass: 'd-none',
              attrs: { 'aria-hidden': 'true', role: 'presentation' }
            })
          )
        }

        // Add the actual details row
        $rows.push(
          h(
            BTr,
            {
              key: `__b-table-details__${rowKey}`,
              staticClass: 'b-table-details',
              class: [
                isFunction(this.tbodyTrClass)
                  ? this.tbodyTrClass(item, detailsSlotName)
                  : this.tbodyTrClass
              ],
              props: { variant: item._rowVariant || null },
              attrs: { id: detailsId, tabindex: '-1' }
            },
            [$details]
          )
        )
      } else if (hasDetailsSlot) {
        // Only add the placeholder if a the table has a row-details slot defined (but not shown)
        $rows.push(h())
        if (tableStriped) {
          // Add extra placeholder if table is striped
          $rows.push(h())
        }
      }

      // Return the row(s)
      return $rows
    }
  }
}
