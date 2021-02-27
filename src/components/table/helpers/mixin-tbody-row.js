import { Vue } from '../../../vue'
import {
  EVENT_NAME_ROW_CLICKED,
  EVENT_NAME_ROW_HOVERED,
  EVENT_NAME_ROW_UNHOVERED
} from '../../../constants/events'
import {
  PROP_TYPE_ARRAY_OBJECT_STRING,
  PROP_TYPE_FUNCTION,
  PROP_TYPE_OBJECT_FUNCTION
} from '../../../constants/props'
import { SLOT_NAME_ROW_DETAILS } from '../../../constants/slots'
import { get } from '../../../utils/get'
import { isFunction, isString, isUndefinedOrNull } from '../../../utils/inspect'
import { makeProp } from '../../../utils/props'
import { toString } from '../../../utils/string'
import { BTr } from '../tr'
import { BTd } from '../td'
import { BTh } from '../th'
import { FIELD_KEY_CELL_VARIANT, FIELD_KEY_ROW_VARIANT, FIELD_KEY_SHOW_DETAILS } from './constants'

// --- Props ---

export const props = {
  detailsTdClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
  tbodyTrAttr: makeProp(PROP_TYPE_OBJECT_FUNCTION),
  tbodyTrClass: makeProp([...PROP_TYPE_ARRAY_OBJECT_STRING, PROP_TYPE_FUNCTION])
}

// --- Mixin ---

// @vue/component
export const tbodyRowMixin = Vue.extend({
  props,
  methods: {
    // Methods for computing classes, attributes and styles for table cells
    getTdValues(item, key, tdValue, defaultValue) {
      const { $parent } = this
      if (tdValue) {
        const value = get(item, key, '')
        if (isFunction(tdValue)) {
          return tdValue(value, key, item)
        } else if (isString(tdValue) && isFunction($parent[tdValue])) {
          return $parent[tdValue](value, key, item)
        }
        return tdValue
      }
      return defaultValue
    },
    getThValues(item, key, thValue, type, defaultValue) {
      const { $parent } = this
      if (thValue) {
        const value = get(item, key, '')
        if (isFunction(thValue)) {
          return thValue(value, key, item, type)
        } else if (isString(thValue) && isFunction($parent[thValue])) {
          return $parent[thValue](value, key, item, type)
        }
        return thValue
      }
      return defaultValue
    },
    // Method to get the value for a field
    getFormattedValue(item, field) {
      const { key } = field
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
          this.$set(item, FIELD_KEY_SHOW_DETAILS, !item[FIELD_KEY_SHOW_DETAILS])
        }
      }
    },
    // Row event handlers
    rowHovered(event) {
      // `mouseenter` handler (non-bubbling)
      // `this.tbodyRowEventStopped` from tbody mixin
      if (!this.tbodyRowEventStopped(event)) {
        // `this.emitTbodyRowEvent` from tbody mixin
        this.emitTbodyRowEvent(EVENT_NAME_ROW_HOVERED, event)
      }
    },
    rowUnhovered(event) {
      // `mouseleave` handler (non-bubbling)
      // `this.tbodyRowEventStopped` from tbody mixin
      if (!this.tbodyRowEventStopped(event)) {
        // `this.emitTbodyRowEvent` from tbody mixin
        this.emitTbodyRowEvent(EVENT_NAME_ROW_UNHOVERED, event)
      }
    },
    // Renders a TD or TH for a row's field
    renderTbodyRowCell(field, colIndex, item, rowIndex) {
      const { isStacked } = this
      const { key, label, isRowHeader } = field
      const h = this.$createElement
      const hasDetailsSlot = this.hasNormalizedSlot(SLOT_NAME_ROW_DETAILS)
      const formatted = this.getFormattedValue(item, field)
      const stickyColumn =
        !isStacked && (this.isResponsive || this.stickyHeader) && field.stickyColumn
      // We only uses the helper components for sticky columns to
      // improve performance of BTable/BTableLite by reducing the
      // total number of vue instances created during render
      const cellTag = stickyColumn ? (isRowHeader ? BTh : BTd) : isRowHeader ? 'th' : 'td'
      const cellVariant =
        item[FIELD_KEY_CELL_VARIANT] && item[FIELD_KEY_CELL_VARIANT][key]
          ? item[FIELD_KEY_CELL_VARIANT][key]
          : field.variant || null
      const data = {
        // For the Vue key, we concatenate the column index and
        // field key (as field keys could be duplicated)
        // TODO: Although we do prevent duplicate field keys...
        //   So we could change this to: `row-${rowIndex}-cell-${key}`
        class: [field.class ? field.class : '', this.getTdValues(item, key, field.tdClass, '')],
        props: {},
        attrs: {
          'aria-colindex': String(colIndex + 1),
          ...(isRowHeader
            ? this.getThValues(item, key, field.thAttr, 'row', {})
            : this.getTdValues(item, key, field.tdAttr, {}))
        },
        key: `row-${rowIndex}-cell-${colIndex}-${key}`
      }
      if (stickyColumn) {
        // We are using the helper BTd or BTh
        data.props = {
          stackedHeading: isStacked ? label : null,
          stickyColumn: true,
          variant: cellVariant
        }
      } else {
        // Using native TD or TH element, so we need to
        // add in the attributes and variant class
        data.attrs['data-label'] = isStacked && !isUndefinedOrNull(label) ? toString(label) : null
        data.attrs.role = isRowHeader ? 'rowheader' : 'cell'
        data.attrs.scope = isRowHeader ? 'row' : null
        // Add in the variant class
        if (cellVariant) {
          data.class.push(`${this.dark ? 'bg' : 'table'}-${cellVariant}`)
        }
      }

      const slotScope = {
        item,
        index: rowIndex,
        field,
        unformatted: get(item, key, ''),
        value: formatted,
        toggleDetails: this.toggleDetailsFactory(hasDetailsSlot, item),
        detailsShowing: Boolean(item[FIELD_KEY_SHOW_DETAILS])
      }
      // If table supports selectable mode, then add in the following scope
      // this.supportsSelectableRows will be undefined if mixin isn't loaded
      if (this.supportsSelectableRows) {
        slotScope.rowSelected = this.isRowSelected(rowIndex)
        slotScope.selectRow = () => this.selectRow(rowIndex)
        slotScope.unselectRow = () => this.unselectRow(rowIndex)
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
        $childNodes = [h('div', [$childNodes])]
      }

      // Render either a td or th cell
      return h(cellTag, data, [$childNodes])
    },
    // Renders an item's row (or rows if details supported)
    renderTbodyRow(item, rowIndex) {
      const {
        computedFields: fields,
        striped,
        primaryKey,
        currentPage,
        perPage,
        tbodyTrClass,
        tbodyTrAttr
      } = this
      const h = this.$createElement
      const hasDetailsSlot = this.hasNormalizedSlot(SLOT_NAME_ROW_DETAILS)
      const rowShowDetails = item[FIELD_KEY_SHOW_DETAILS] && hasDetailsSlot
      const hasRowClickHandler =
        this.$listeners[EVENT_NAME_ROW_CLICKED] || this.hasSelectableRowClick

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
      if (currentPage && perPage && perPage > 0) {
        ariaRowIndex = String((currentPage - 1) * perPage + rowIndex + 1)
      }

      // Create a unique :key to help ensure that sub components are re-rendered rather than
      // re-used, which can cause issues. If a primary key is not provided we use the rendered
      // rows index within the tbody.
      // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/2410
      const primaryKeyValue = toString(get(item, primaryKey)) || null
      const rowKey = primaryKeyValue || toString(rowIndex)

      // If primary key is provided, use it to generate a unique ID on each tbody > tr
      // In the format of '{tableId}__row_{primaryKeyValue}'
      const rowId = primaryKeyValue ? this.safeId(`_row_${primaryKeyValue}`) : null

      // Selectable classes and attributes
      const selectableClasses = this.selectableRowClasses ? this.selectableRowClasses(rowIndex) : {}
      const selectableAttrs = this.selectableRowAttrs ? this.selectableRowAttrs(rowIndex) : {}

      // Additional classes and attributes
      const userTrClasses = isFunction(tbodyTrClass) ? tbodyTrClass(item, 'row') : tbodyTrClass
      const userTrAttrs = isFunction(tbodyTrAttr)
        ? /* istanbul ignore next */ tbodyTrAttr(item, 'row')
        : tbodyTrAttr

      // Add the item row
      $rows.push(
        h(
          BTr,
          {
            class: [userTrClasses, selectableClasses, rowShowDetails ? 'b-table-has-details' : ''],
            props: { variant: item[FIELD_KEY_ROW_VARIANT] || null },
            attrs: {
              id: rowId,
              ...userTrAttrs,
              // Users cannot override the following attributes
              tabindex: hasRowClickHandler ? '0' : null,
              'data-pk': primaryKeyValue || null,
              'aria-details': detailsId,
              'aria-owns': detailsId,
              'aria-rowindex': ariaRowIndex,
              ...selectableAttrs
            },
            on: {
              // Note: These events are not A11Y friendly!
              mouseenter: this.rowHovered,
              mouseleave: this.rowUnhovered
            },
            key: `__b-table-row-${rowKey}__`,
            ref: 'item-rows',
            refInFor: true
          },
          $tds
        )
      )

      // Row Details slot
      if (rowShowDetails) {
        const detailsScope = {
          item,
          index: rowIndex,
          fields,
          toggleDetails: this.toggleDetailsFactory(hasDetailsSlot, item)
        }
        // If table supports selectable mode, then add in the following scope
        // this.supportsSelectableRows will be undefined if mixin isn't loaded
        if (this.supportsSelectableRows) {
          detailsScope.rowSelected = this.isRowSelected(rowIndex)
          detailsScope.selectRow = () => this.selectRow(rowIndex)
          detailsScope.unselectRow = () => this.unselectRow(rowIndex)
        }

        // Render the details slot in a TD
        const $details = h(
          BTd,
          {
            props: { colspan: fields.length },
            class: this.detailsTdClass
          },
          [this.normalizeSlot(SLOT_NAME_ROW_DETAILS, detailsScope)]
        )

        // Add a hidden row to keep table row striping consistent when details showing
        // Only added if the table is striped
        if (striped) {
          $rows.push(
            // We don't use `BTr` here as we don't need the extra functionality
            h('tr', {
              staticClass: 'd-none',
              attrs: {
                'aria-hidden': 'true',
                role: 'presentation'
              },
              key: `__b-table-details-stripe__${rowKey}`
            })
          )
        }

        // Add the actual details row
        const userDetailsTrClasses = isFunction(this.tbodyTrClass)
          ? /* istanbul ignore next */ this.tbodyTrClass(item, SLOT_NAME_ROW_DETAILS)
          : this.tbodyTrClass
        const userDetailsTrAttrs = isFunction(this.tbodyTrAttr)
          ? /* istanbul ignore next */ this.tbodyTrAttr(item, SLOT_NAME_ROW_DETAILS)
          : this.tbodyTrAttr
        $rows.push(
          h(
            BTr,
            {
              staticClass: 'b-table-details',
              class: [userDetailsTrClasses],
              props: { variant: item[FIELD_KEY_ROW_VARIANT] || null },
              attrs: {
                ...userDetailsTrAttrs,
                // Users cannot override the following attributes
                id: detailsId,
                tabindex: '-1'
              },
              key: `__b-table-details__${rowKey}`
            },
            [$details]
          )
        )
      } else if (hasDetailsSlot) {
        // Only add the placeholder if a the table has a row-details slot defined (but not shown)
        $rows.push(h())
        if (striped) {
          // Add extra placeholder if table is striped
          $rows.push(h())
        }
      }

      // Return the row(s)
      return $rows
    }
  }
})
