import KeyCodes from '../../../utils/key-codes'
import { arrayIncludes, from as arrayFrom } from '../../../utils/array'
import { closest, getAttr, isElement, isVisible } from '../../../utils/dom'
import { props as tbodyProps, BTbody } from '../tbody'
import filterEvent from './filter-event'
import textSelectionActive from './text-selection-active'
import tbodyRowMixin from './mixin-tbody-row'

const props = {
  ...tbodyProps,
  tbodyClass: {
    type: [String, Array, Object]
    // default: undefined
  }
}

export default {
  mixins: [tbodyRowMixin],
  props,
  created() {
    // Non-reactive props for setting the row or cell tabindex during render
    // These will be updated by the keyboard navigation focus control
    this.$_rowIndex = 0
    this.$_cellIndex = 0
  },
  methods: {
    // Helper methods
    getTbodyTrs() {
      // Returns all the item TR elements (excludes detail and spacer rows)
      // `this.$refs.itemRows` is an array of item TR components/elements
      // Rows should all be B-TR components, but we map to TR elements
      return (this.$refs.itemRows || []).map(tr => tr.$el || tr)
    },
    getTbodyTrIndex(el) {
      // Returns index of a particular TBODY item TR
      /* istanbul ignore next: should not normally happen */
      if (!isElement(el)) {
        return -1
      }
      // We set `true` on closest to include self in result
      const tr = el.tagName === 'TR' ? el : closest('tr', el, true)
      return tr ? this.getTbodyTrs().indexOf(tr) : -1
    },
    getCellIndex(el) {
      // Returns the index of a given TD/TH in an array of TDs/THs
      /* istanbul ignore next: should not normally happen */
      if (!isElement(el)) {
        return -1
      }
      // We set `true` on closest to include self in result
      const cell = el.tagName === 'TD' || el.tagName === 'TH' ? el : closest('td, th', el, true)
      const colIndex = parseInt(getAttr(cell, 'aria-colindex'), 10)
      // `aria-colindex` is indexed from 1 upwards
      return isNaN(colIndex) ? -1 : colIndex - 1
    },
    emitTbodyRowEvent(type, evt) {
      // Emits a row event, with the item object, row index and original event
      if (type && evt && evt.target) {
        const target = evt.target
        const rowIndex = this.getTbodyTrIndex(target)
        if (rowIndex > -1) {
          // The array of TRs correlate to the `computedItems` array
          const item = this.computedItems[rowIndex]
          if (type === 'row-clicked' && this.$listeners['cell-clicked']) {
            // Special handling for `cell-clicked` event
            // Emitted before `row-clicked` event is emitted
            const cellIndex = this.getCellIndex(target)
            const field = this.computedFields[cellIndex]
            if (field && field.key) {
              this.$emit('cell-clicked', item, field.key, cellIndex, rowIndex, evt)
            }
          }
          this.$emit(type, item, rowIndex, evt)
        }
      }
    },
    tbodyRowEvtStopped(evt) {
      return this.stopIfBusy && this.stopIfBusy(evt)
    },
    // Delegated row event handlers
    onTbodyRowKeydown(evt) {
      // Keyboard navigation and row/cell click emulation
      if (!evt || !evt.target) {
        /* istanbul ignore next */
        return
      }
      const target = evt.target
      const tagName = (target.tagName || '').toUpperCase()
      const keyCode = evt.keyCode
      const shift = evt.shiftKey
      const ctrl = evt.ctrlKey
      const shiftOrCtrl = shift || ctrl
      const hasRowClickHandler = this.$listeners['row-clicked'] || this.isSelectable
      const hasCellClickHandler = this.$listeners['cell-clicked']
      if (
        this.tbodyRowEvtStopped(evt) ||
        (tagName !== 'TR' && tagName !== 'TD' && tagName !== 'TH' && tagName !== 'TBODY') ||
        target !== document.activeElement ||
        (target.tabIndex !== 0 && target.tabIndex !== -1)
      ) {
        // Early exit if not an item row TR or TD/TH cell or TBODY, or not focusable
        return
      }
      if (arrayIncludes([KeyCodes.ENTER, KeyCodes.SPACE], keyCode)) {
        // Emulated click for keyboard users, transfer to click handler
        evt.stopPropagation()
        evt.preventDefault()
        this.onTBodyRowClicked(evt)
      } else if (
        hasRowClickHandler &&
        !hasCellClickHandler &&
        tagName === 'TR' &&
        arrayIncludes([KeyCodes.UP, KeyCodes.DOWN, KeyCodes.HOME, KeyCodes.END], keyCode)
      ) {
        // Keyboard navigation of body rows (only if no cell click handler)
        const trs = this.getTbodyTrs()
        if (trs.length > -1) {
          evt.stopPropagation()
          evt.preventDefault()
          // Row inde with initial focus (might be -1)
          let rowIndex = this.getTbodyTrIndex(target)
          if (keyCode === KeyCodes.HOME || (shiftOrCtrl && keyCode === KeyCodes.UP)) {
            // Focus first row
            rowIndex = 0
          } else if (keyCode === KeyCodes.END || (shiftOrCtrl && keyCode === KeyCodes.DOWN)) {
            // Focus last row
            rowIndex = trs.length - 1
          } else if (keyCode === KeyCodes.UP && rowIndex > 0) {
            // Focus previous row
            rowIndex = rowIndex - 1
          } else if (keyCode === KeyCodes.DOWN && rowIndex < trs.length - 1) {
            // Focus next row
            rowIndex = rowIndex + 1
          }
          // Attempt to focus row
          try {
            // TODO:
            //   Set this rows's tabIndex to 0 and all others to -1
            //   Could set a dataObject with row/cell index after the focus
            //   But this would cause a re-render of the full table
            //   Would also need to reset the row/cell index to 0 on any
            //   sort/filter/paginate change
            //   Might be able to use non-reactive props for this
            //   and manually clear previous row tabindex and set new row tabindex
            //   Could listen to focusout events on cells to clear the previous row's
            //   tab index
            const tr = trs[rowIndex]
            tr.focus()
            // The above line will throw an error if tr is undefined
            // and the following will not run, but if it is defined
            // then we update the tab indexes
            // trs.forEach(r => {
            //   r.tabIndex = r === tr ? 0 : -1
            // })
            // Update the non-reactive props
            this.$_rowIndex = rowIndex
            this.$_cellIndex = 0
          } catch {
            // Ignore any focus errors
          }
        }
      } else if (
        hasCellClickHandler &&
        (tagName === 'TD' || tagName === 'TH') &&
        arrayIncludes(
          [KeyCodes.LEFT, KeyCodes.RIGHT, KeyCodes.UP, KeyCodes.DOWN, KeyCodes.HOME, KeyCodes.END],
          keyCode
        )
      ) {
        // Keyboard navigation of cells
        // Get the array of data item TRs
        const trs = this.getTbodyTrs()
        if (trs.length > -1) {
          evt.stopPropagation()
          evt.preventDefault()
          // Method to get the visible cells in the row (in case of hidden columns)
          const getVisibleRowCells = tr => {
            return tr ? arrayFrom(tr.children).filter(isVisible) : []
          }
          // Curent row index of focused cell (-1 for no cell focused)
          let rowIndex = this.getTbodyTrIndex(target)
          // Current focused cell index (target is always a TD or TH)
          let cellIndex = getVisibleRowCells(trs[rowIndex]).indexOf(target)
          if (shiftOrCtrl && keyCode === KeyCodes.HOME) {
            // Focus first cell in first row
            cellIndex = 0
            rowIndex = 0
          } else if (shiftOrCtrl && keyCode === KeyCodes.END) {
            // Focus last cell in last row
            rowIndex = trs.length - 1
            cellIndex = getVisibleRowCells(trs[rowIndex]).length - 1
          } else if (
            (!shiftOrCtrl && keyCode === KeyCodes.HOME) ||
            (shiftOrCtrl && keyCode === KeyCodes.LEFT)
          ) {
            // Focus first cell in current row
            cellIndex = 0
          } else if (
            (!shiftOrCtrl && keyCode === KeyCodes.END) ||
            (shiftOrCtrl && keyCode === KeyCodes.RIGHT)
          ) {
            // Focus last cell in current row
            cellIndex = getVisibleRowCells(trs[rowIndex]).length - 1
          } else if (keyCode === KeyCodes.LEFT) {
            // Focus previous cell in current row
            cellIndex = cellIndex - 1
          } else if (keyCode === KeyCodes.RIGHT) {
            // Focus next cell in current row
            cellIndex = cellIndex + 1
          } else if (keyCode === KeyCodes.UP) {
            // Focus same cellIndex in previous row or first row (shift)
            rowIndex = shiftOrCtrl ? 0 : rowIndex - 1
          } else if (keyCode === KeyCodes.DOWN) {
            // Focus same cellIndex in next row or last row (shift)
            rowIndex = shiftOrCtrl ? trs.length - 1 : rowIndex + 1
          }
          // Attempt to focus the cell
          try {
            // TODO:
            //   Set the focused cell tabIndex to 0 and all others to -1
            //   Could set a dataObject with row/cell index after the focus
            //   But this would cause a re-render of the full table
            //   Would also need to reset the row/cell index to 0 on any
            //   sort/filter/paginate change
            const cell = getVisibleRowCells(trs[rowIndex])[cellIndex]
            cell.focus()
            // The above line will throw an error if cell is undefined
            // and the following will not run, but if it is defined
            // then we update the tab indexes
            // trs.forEach(r => {
            //   getVisibleRowCells(r).forEach(c => {
            //     c.tabIndex = c === cell ? 0 : -1
            //   })
            // })
            // Update the non-reactive props
            this.$_rowIndex = rowIndex
            this.$_cellIndex = parseInt(getAttr(cell, 'aria-colindex') || 1), 10) - 1
          } catch {
            // Ignore any error from focus attempt
          }
        }
      }
    },
    onTBodyRowClicked(evt) {
      if (this.tbodyRowEvtStopped(evt)) {
        // If table is busy, then don't propagate
        return
      } else if (filterEvent(evt) || textSelectionActive(this.$el)) {
        // Clicked on a non-disabled control so ignore
        // Or user is selecting text, so ignore
        return
      }
      this.emitTbodyRowEvent('row-clicked', evt)
    },
    onTbodyRowMiddleMouseRowClicked(evt) {
      if (!this.tbodyRowEvtStopped(evt) && evt.which === 2) {
        this.emitTbodyRowEvent('row-middle-clicked', evt)
      }
    },
    onTbodyRowContextmenu(evt) {
      if (!this.tbodyRowEvtStopped(evt)) {
        this.emitTbodyRowEvent('row-contextmenu', evt)
      }
    },
    onTbodyRowDblClicked(evt) {
      if (!this.tbodyRowEvtStopped(evt) && !filterEvent(evt)) {
        this.emitTbodyRowEvent('row-dblclicked', evt)
      }
    },
    // Note: Row hover handlers are handled by the tbody-row mixin
    // As mouseenter/mouseleave events do not bubble
    //
    // Render Helper
    renderTbody() {
      // Render the tbody element and children
      const items = this.computedItems
      // Shortcut to `createElement` (could use `this._c()` instead)
      const h = this.$createElement
      const hasRowClickHandler = this.$listeners['row-clicked'] || this.isSelectable
      const hasCellClickHandler = this.$listeners['cell-clicked']
      // Prepare the tbody rows
      const $rows = []

      // Add the item data rows or the busy slot
      const $busy = this.renderBusy ? this.renderBusy() : null
      if ($busy) {
        // If table is busy and a busy slot, then return only the busy "row" indicator
        $rows.push($busy)
      } else {
        // Table isn't busy, or we don't have a busy slot

        // Create a slot cache for improved performance when looking up cell slot names
        // Values will be keyed by the field's `key` and will store the slot's name
        // Slots could be dynamic (i.e. `v-if`), so we must compute on each render
        // Used by tbody-row mixin render helper
        const cache = {}
        const defaultSlotName = this.hasNormalizedSlot('cell()') ? 'cell()' : null
        this.computedFields.forEach(field => {
          const key = field.key
          const fullName = `cell(${key})`
          const lowerName = `cell(${key.toLowerCase()})`
          cache[key] = this.hasNormalizedSlot(fullName)
            ? fullName
            : this.hasNormalizedSlot(lowerName)
              ? lowerName
              : defaultSlotName
        })
        // Created as a non-reactive property so to not trigger component updates
        // Must be a fresh object each render
        this.$_bodyFieldSlotNameCache = cache

        // Add static top row slot (hidden in visibly stacked mode
        // as we can't control `data-label` attr)
        $rows.push(this.renderTopRow ? this.renderTopRow() : h())

        // Render the rows
        items.forEach((item, rowIndex) => {
          // Render the individual item row (rows if details slot)
          $rows.push(this.renderTbodyRow(item, rowIndex))
        })

        // Empty items / empty filtered row slot (only shows if `items.length < 1`)
        $rows.push(this.renderEmpty ? this.renderEmpty() : h())

        // Static bottom row slot (hidden in visibly stacked mode
        // as we can't control `data-label` attr)
        $rows.push(this.renderBottomRow ? this.renderBottomRow() : h())
      }

      const handlers = {
        // TODO: We may want to to only instantiate these handlers
        //       if there is an event listener registered
        auxclick: this.onTbodyRowMiddleMouseRowClicked,
        // TODO: Perhaps we do want to automatically prevent the
        //       default context menu from showing if there is
        //       a `row-contextmenu` listener registered.
        contextmenu: this.onTbodyRowContextmenu,
        // The following event(s) is not considered A11Y friendly
        dblclick: this.onTbodyRowDblClicked
        // hover events (mouseenter/mouseleave) ad handled by tbody-row mixin
      }
      if (hasRowClickHandler || hasCellClickHandler) {
        handlers.click = this.onTBodyRowClicked
        handlers.keydown = this.onTbodyRowKeydown
      }
      // Assemble rows into the tbody
      const $tbody = h(
        BTbody,
        {
          ref: 'tbody',
          class: this.tbodyClass || null,
          props: {
            tbodyTransitionProps: this.tbodyTransitionProps,
            tbodyTransitionHandlers: this.tbodyTransitionHandlers
          },
          // BTbody transfers all native event listeners to the root element
          // TODO: Only set the handlers if the table is not busy
          on: handlers
        },
        $rows
      )

      // Return the assembled tbody
      return $tbody
    }
  }
}
