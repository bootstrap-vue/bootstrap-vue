import {
  CODE_DOWN,
  CODE_END,
  CODE_ENTER,
  CODE_HOME,
  CODE_SPACE,
  CODE_UP
} from '../../../constants/key-codes'
import { arrayIncludes, from as arrayFrom } from '../../../utils/array'
import { attemptFocus, closest, isActiveElement, isElement } from '../../../utils/dom'
import { stopEvent } from '../../../utils/events'
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
  beforeDestroy() {
    this.$_bodyFieldSlotNameCache = null
  },
  methods: {
    // Helper methods
    getTbodyTrs() {
      // Returns all the item TR elements (excludes detail and spacer rows)
      // `this.$refs.itemRows` is an array of item TR components/elements
      // Rows should all be B-TR components, but we map to TR elements
      // Also note that `this.$refs.itemRows` may not always be in document order
      const refs = this.$refs || {}
      const tbody = refs.tbody ? refs.tbody.$el || refs.tbody : null
      const trs = (refs.itemRows || []).map(tr => tr.$el || tr)
      return tbody && tbody.children && tbody.children.length > 0 && trs && trs.length > 0
        ? arrayFrom(tbody.children).filter(tr => arrayIncludes(trs, tr))
        : /* istanbul ignore next */ []
    },
    getTbodyTrIndex(el) {
      // Returns index of a particular TBODY item TR
      // We set `true` on closest to include self in result
      /* istanbul ignore next: should not normally happen */
      if (!isElement(el)) {
        return -1
      }
      const tr = el.tagName === 'TR' ? el : closest('tr', el, true)
      return tr ? this.getTbodyTrs().indexOf(tr) : -1
    },
    emitTbodyRowEvent(type, evt) {
      // Emits a row event, with the item object, row index and original event
      if (type && this.hasListener(type) && evt && evt.target) {
        const rowIndex = this.getTbodyTrIndex(evt.target)
        if (rowIndex > -1) {
          // The array of TRs correlate to the `computedItems` array
          const item = this.computedItems[rowIndex]
          this.$emit(type, item, rowIndex, evt)
        }
      }
    },
    tbodyRowEvtStopped(evt) {
      return this.stopIfBusy && this.stopIfBusy(evt)
    },
    // Delegated row event handlers
    onTbodyRowKeydown(evt) {
      // Keyboard navigation and row click emulation
      const target = evt.target
      if (
        this.tbodyRowEvtStopped(evt) ||
        target.tagName !== 'TR' ||
        !isActiveElement(target) ||
        target.tabIndex !== 0
      ) {
        // Early exit if not an item row TR
        return
      }
      const keyCode = evt.keyCode
      if (arrayIncludes([CODE_ENTER, CODE_SPACE], keyCode)) {
        // Emulated click for keyboard users, transfer to click handler
        stopEvent(evt)
        this.onTBodyRowClicked(evt)
      } else if (arrayIncludes([CODE_UP, CODE_DOWN, CODE_HOME, CODE_END], keyCode)) {
        // Keyboard navigation
        const rowIndex = this.getTbodyTrIndex(target)
        if (rowIndex > -1) {
          stopEvent(evt)
          const trs = this.getTbodyTrs()
          const shift = evt.shiftKey
          if (keyCode === CODE_HOME || (shift && keyCode === CODE_UP)) {
            // Focus first row
            attemptFocus(trs[0])
          } else if (keyCode === CODE_END || (shift && keyCode === CODE_DOWN)) {
            // Focus last row
            attemptFocus(trs[trs.length - 1])
          } else if (keyCode === CODE_UP && rowIndex > 0) {
            // Focus previous row
            attemptFocus(trs[rowIndex - 1])
          } else if (keyCode === CODE_DOWN && rowIndex < trs.length - 1) {
            // Focus next row
            attemptFocus(trs[rowIndex + 1])
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
      const hasRowClickHandler = this.hasListener('row-clicked') || this.hasSelectableRowClick

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
              ? /* istanbul ignore next */ lowerName
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

      // Note: these events will only emit if a listener is registered
      const handlers = {
        auxclick: this.onTbodyRowMiddleMouseRowClicked,
        // TODO:
        //   Perhaps we do want to automatically prevent the
        //   default context menu from showing if there is a
        //   `row-contextmenu` listener registered
        contextmenu: this.onTbodyRowContextmenu,
        // The following event(s) is not considered A11Y friendly
        dblclick: this.onTbodyRowDblClicked
        // Hover events (`mouseenter`/`mouseleave`) are handled by `tbody-row` mixin
      }
      // Add in click/keydown listeners if needed
      if (hasRowClickHandler) {
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
