import { Vue } from '../../../vue'
import {
  EVENT_NAME_CONTEXT_CHANGED,
  EVENT_NAME_FILTERED,
  EVENT_NAME_ROW_CLICKED,
  EVENT_NAME_ROW_SELECTED
} from '../../../constants/events'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../../constants/props'
import { arrayIncludes, createArray } from '../../../utils/array'
import { identity } from '../../../utils/identity'
import { isArray, isNumber } from '../../../utils/inspect'
import { looseEqual } from '../../../utils/loose-equal'
import { mathMax, mathMin } from '../../../utils/math'
import { makeProp } from '../../../utils/props'
import { toString } from '../../../utils/string'
import { sanitizeRow } from './sanitize-row'

// --- Constants ---

const SELECT_MODES = ['range', 'multi', 'single']

const ROLE_GRID = 'grid'

// --- Props ---

export const props = {
  // Disable use of click handlers for row selection
  noSelectOnClick: makeProp(PROP_TYPE_BOOLEAN, false),
  selectMode: makeProp(PROP_TYPE_STRING, 'multi', value => {
    return arrayIncludes(SELECT_MODES, value)
  }),
  selectable: makeProp(PROP_TYPE_BOOLEAN, false),
  selectedVariant: makeProp(PROP_TYPE_STRING, 'active')
}

// --- Mixin ---

// @vue/component
export const selectableMixin = Vue.extend({
  props,
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
      const { selectedRows } = this
      return (
        this.isSelectable && selectedRows && selectedRows.length > 0 && selectedRows.some(identity)
      )
    },
    selectableIsMultiSelect() {
      return this.isSelectable && arrayIncludes(['range', 'multi'], this.selectMode)
    },
    selectableTableClasses() {
      const { isSelectable } = this
      return {
        'b-table-selectable': isSelectable,
        [`b-table-select-${this.selectMode}`]: isSelectable,
        'b-table-selecting': this.selectableHasSelection,
        'b-table-selectable-no-click': isSelectable && !this.hasSelectableRowClick
      }
    },
    selectableTableAttrs() {
      if (!this.isSelectable) {
        return {}
      }

      const role = this.bvAttrs.role || ROLE_GRID

      return {
        role,
        // TODO:
        //   Should this attribute not be included when `no-select-on-click` is set
        //   since this attribute implies keyboard navigation?
        'aria-multiselectable': role === ROLE_GRID ? toString(this.selectableIsMultiSelect) : null
      }
    }
  },
  watch: {
    computedItems(newValue, oldValue) {
      // Reset for selectable
      let equal = false
      if (this.isSelectable && this.selectedRows.length > 0) {
        // Quick check against array length
        equal = isArray(newValue) && isArray(oldValue) && newValue.length === oldValue.length
        for (let i = 0; equal && i < newValue.length; i++) {
          // Look for the first non-loosely equal row, after ignoring reserved fields
          equal = looseEqual(sanitizeRow(newValue[i]), sanitizeRow(oldValue[i]))
        }
      }
      if (!equal) {
        this.clearSelected()
      }
    },
    selectable(newValue) {
      this.clearSelected()
      this.setSelectionHandlers(newValue)
    },
    selectMode() {
      this.clearSelected()
    },
    hasSelectableRowClick(newValue) {
      this.clearSelected()
      this.setSelectionHandlers(!newValue)
    },
    selectedRows(selectedRows, oldValue) {
      if (this.isSelectable && !looseEqual(selectedRows, oldValue)) {
        const items = []
        // `.forEach()` skips over non-existent indices (on sparse arrays)
        selectedRows.forEach((v, idx) => {
          if (v) {
            items.push(this.computedItems[idx])
          }
        })
        this.$emit(EVENT_NAME_ROW_SELECTED, items)
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
        this.selectedRows = this.selectableIsMultiSelect ? createArray(length, true) : [true]
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
      }

      return {}
    },
    selectableRowAttrs(index) {
      return {
        'aria-selected': !this.isSelectable ? null : this.isRowSelected(index) ? 'true' : 'false'
      }
    },
    setSelectionHandlers(on) {
      const method = on && !this.noSelectOnClick ? '$on' : '$off'
      // Handle row-clicked event
      this[method](EVENT_NAME_ROW_CLICKED, this.selectionHandler)
      // Clear selection on filter, pagination, and sort changes
      this[method](EVENT_NAME_FILTERED, this.clearSelected)
      this[method](EVENT_NAME_CONTEXT_CHANGED, this.clearSelected)
    },
    selectionHandler(item, index, event) {
      /* istanbul ignore if: should never happen */
      if (!this.isSelectable || this.noSelectOnClick) {
        // Don't do anything if table is not in selectable mode
        this.clearSelected()
        return
      }
      const { selectMode, selectedLastRow } = this
      let selectedRows = this.selectedRows.slice()
      let selected = !selectedRows[index]
      // Note 'multi' mode needs no special event handling
      if (selectMode === 'single') {
        selectedRows = []
      } else if (selectMode === 'range') {
        if (selectedLastRow > -1 && event.shiftKey) {
          // range
          for (
            let idx = mathMin(selectedLastRow, index);
            idx <= mathMax(selectedLastRow, index);
            idx++
          ) {
            selectedRows[idx] = true
          }
          selected = true
        } else {
          if (!(event.ctrlKey || event.metaKey)) {
            // Clear range selection if any
            selectedRows = []
            selected = true
          }
          if (selected) this.selectedLastRow = index
        }
      }
      selectedRows[index] = selected
      this.selectedRows = selectedRows
    }
  }
})
