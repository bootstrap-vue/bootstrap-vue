import identity from '../../../utils/identity'
import looseEqual from '../../../utils/loose-equal'
import range from '../../../utils/range'
import { isArray, arrayIncludes } from '../../../utils/array'
import { getComponentConfig } from '../../../utils/config'
import { isNumber } from '../../../utils/inspect'
import sanitizeRow from './sanitize-row'

export default {
  props: {
    selectable: {
      type: Boolean,
      default: false
    },
    selectMode: {
      type: String,
      default: 'multi',
      validator: val => arrayIncludes(['range', 'multi', 'single'], val)
    },
    selectedVariant: {
      type: String,
      default: () => getComponentConfig('BTable', 'selectedVariant')
    },
    noSelectOnClick: {
      // Disable use of click handlers for row selection
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedRows: [],
      selectedLastRow: -1
    }
  },
  computed: {
    isSelectable() {
      return this.selectable && this.selectMode
    },
    hasSelectableRowClick() {
      return this.isSelectable && !this.noSelectOnClick
    },
    supportsSelectableRows() {
      return true
    },
    selectableHasSelection() {
      return (
        this.isSelectable &&
        this.selectedRows &&
        this.selectedRows.length > 0 &&
        this.selectedRows.some(identity)
      )
    },
    selectableIsMultiSelect() {
      return this.isSelectable && arrayIncludes(['range', 'multi'], this.selectMode)
    },
    selectableTableClasses() {
      return {
        'b-table-selectable': this.isSelectable,
        [`b-table-select-${this.selectMode}`]: this.isSelectable,
        'b-table-selecting': this.selectableHasSelection,
        'b-table-selectable-no-click': this.isSelectable && !this.hasSelectableRowClick
      }
    },
    selectableTableAttrs() {
      return {
        // TODO:
        //   Should this attribute not be included when no-select-on-click is set
        //   since this attribute implies keyboard navigation?
        'aria-multiselectable': !this.isSelectable
          ? null
          : this.selectableIsMultiSelect
            ? 'true'
            : 'false'
      }
    }
  },
  watch: {
    computedItems(newVal, oldVal) {
      // Reset for selectable
      let equal = false
      if (this.isSelectable && this.selectedRows.length > 0) {
        // Quick check against array length
        equal = isArray(newVal) && isArray(oldVal) && newVal.length === oldVal.length
        for (let i = 0; equal && i < newVal.length; i++) {
          // Look for the first non-loosely equal row, after ignoring reserved fields
          equal = looseEqual(sanitizeRow(newVal[i]), sanitizeRow(oldVal[i]))
        }
      }
      if (!equal) {
        this.clearSelected()
      }
    },
    selectable(newVal, oldVal) {
      this.clearSelected()
      this.setSelectionHandlers(newVal)
    },
    selectMode(newVal, oldVal) {
      this.clearSelected()
    },
    hasSelectableRowClick(newVal, oldVal) {
      this.clearSelected()
      this.setSelectionHandlers(!newVal)
    },
    selectedRows(selectedRows, oldVal) {
      if (this.isSelectable && !looseEqual(selectedRows, oldVal)) {
        const items = []
        // `.forEach()` skips over non-existent indices (on sparse arrays)
        selectedRows.forEach((v, idx) => {
          if (v) {
            items.push(this.computedItems[idx])
          }
        })
        this.$emit('row-selected', items)
      }
    }
  },
  beforeMount() {
    // Set up handlers if needed
    if (this.isSelectable) {
      this.setSelectionHandlers(true)
    }
  },
  methods: {
    // Public methods
    selectRow(index) {
      // Select a particular row (indexed based on computedItems)
      if (
        this.isSelectable &&
        isNumber(index) &&
        index >= 0 &&
        index < this.computedItems.length &&
        !this.isRowSelected(index)
      ) {
        const selectedRows = this.selectableIsMultiSelect ? this.selectedRows.slice() : []
        selectedRows[index] = true
        this.selectedLastClicked = -1
        this.selectedRows = selectedRows
      }
    },
    unselectRow(index) {
      // Un-select a particular row (indexed based on `computedItems`)
      if (this.isSelectable && isNumber(index) && this.isRowSelected(index)) {
        const selectedRows = this.selectedRows.slice()
        selectedRows[index] = false
        this.selectedLastClicked = -1
        this.selectedRows = selectedRows
      }
    },
    selectAllRows() {
      const length = this.computedItems.length
      if (this.isSelectable && length > 0) {
        this.selectedLastClicked = -1
        this.selectedRows = this.selectableIsMultiSelect ? range(length).map(i => true) : [true]
      }
    },
    isRowSelected(index) {
      // Determine if a row is selected (indexed based on `computedItems`)
      return !!(isNumber(index) && this.selectedRows[index])
    },
    clearSelected() {
      // Clear any active selected row(s)
      this.selectedLastClicked = -1
      this.selectedRows = []
    },
    // Internal private methods
    selectableRowClasses(index) {
      if (this.isSelectable && this.isRowSelected(index)) {
        const variant = this.selectedVariant
        return {
          'b-table-row-selected': true,
          [`${this.dark ? 'bg' : 'table'}-${variant}`]: variant
        }
      } else {
        return {}
      }
    },
    selectableRowAttrs(index) {
      return {
        'aria-selected': !this.isSelectable ? null : this.isRowSelected(index) ? 'true' : 'false'
      }
    },
    setSelectionHandlers(on) {
      const method = on && !this.noSelectOnClick ? '$on' : '$off'
      // Handle row-clicked event
      this[method]('row-clicked', this.selectionHandler)
      // Clear selection on filter, pagination, and sort changes
      this[method]('filtered', this.clearSelected)
      this[method]('context-changed', this.clearSelected)
    },
    selectionHandler(item, index, evt) {
      /* istanbul ignore if: should never happen */
      if (!this.isSelectable || this.noSelectOnClick) {
        // Don't do anything if table is not in selectable mode
        this.clearSelected()
        return
      }
      const selectMode = this.selectMode
      let selectedRows = this.selectedRows.slice()
      let selected = !selectedRows[index]
      // Note 'multi' mode needs no special event handling
      if (selectMode === 'single') {
        selectedRows = []
      } else if (selectMode === 'range') {
        if (this.selectedLastRow > -1 && evt.shiftKey) {
          // range
          for (
            let idx = Math.min(this.selectedLastRow, index);
            idx <= Math.max(this.selectedLastRow, index);
            idx++
          ) {
            selectedRows[idx] = true
          }
          selected = true
        } else {
          if (!(evt.ctrlKey || evt.metaKey)) {
            // Clear range selection if any
            selectedRows = []
            selected = true
          }
          this.selectedLastRow = selected ? index : -1
        }
      }
      selectedRows[index] = selected
      this.selectedRows = selectedRows
    }
  }
}
