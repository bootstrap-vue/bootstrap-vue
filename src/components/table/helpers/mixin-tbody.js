import { Vue } from '../../../vue'
import {
  EVENT_NAME_ROW_CLICKED,
  EVENT_NAME_ROW_CONTEXTMENU,
  EVENT_NAME_ROW_DBLCLICKED,
  EVENT_NAME_ROW_MIDDLE_CLICKED
} from '../../../constants/events'
import {
  CODE_DOWN,
  CODE_END,
  CODE_ENTER,
  CODE_HOME,
  CODE_SPACE,
  CODE_UP
} from '../../../constants/key-codes'
import { PROP_TYPE_ARRAY_OBJECT_STRING } from '../../../constants/props'
import { arrayIncludes, from as arrayFrom } from '../../../utils/array'
import { attemptFocus, closest, isActiveElement, isElement } from '../../../utils/dom'
import { stopEvent } from '../../../utils/events'
import { sortKeys } from '../../../utils/object'
import { makeProp, pluckProps } from '../../../utils/props'
import { BTbody, props as BTbodyProps } from '../tbody'
import { filterEvent } from './filter-event'
import { textSelectionActive } from './text-selection-active'
import { tbodyRowMixin, props as tbodyRowProps } from './mixin-tbody-row'

// --- Helper methods ---

const getCellSlotName = value => `cell(${value || ''})`

// --- Props ---

export const props = sortKeys({
  ...BTbodyProps,
  ...tbodyRowProps,
  tbodyClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING)
})

// --- Mixin ---

// @vue/component
export const tbodyMixin = Vue.extend({
  mixins: [tbodyRowMixin],
  props,
  beforeDestroy() {
    this.$_bodyFieldSlotNameCache = null
  },
  methods: {
    // Returns all the item TR elements (excludes detail and spacer rows)
    // `this.$refs['item-rows']` is an array of item TR components/elements
    // Rows should all be `<b-tr>` components, but we map to TR elements
    // Also note that `this.$refs['item-rows']` may not always be in document order
    getTbodyTrs() {
      const { $refs } = this
      const tbody = $refs.tbody ? $refs.tbody.$el || $refs.tbody : null
      const trs = ($refs['item-rows'] || []).map(tr => tr.$el || tr)
      return tbody && tbody.children && tbody.children.length > 0 && trs && trs.length > 0
        ? arrayFrom(tbody.children).filter(tr => arrayIncludes(trs, tr))
        : /* istanbul ignore next */ []
    },
    // Returns index of a particular TBODY item TR
    // We set `true` on closest to include self in result
    getTbodyTrIndex(el) {
      /* istanbul ignore next: should not normally happen */
      if (!isElement(el)) {
        return -1
      }
      const tr = el.tagName === 'TR' ? el : closest('tr', el, true)
      return tr ? this.getTbodyTrs().indexOf(tr) : -1
    },
    // Emits a row event, with the item object, row index and original event
    emitTbodyRowEvent(type, event) {
      if (type && this.hasListener(type) && event && event.target) {
        const rowIndex = this.getTbodyTrIndex(event.target)
        if (rowIndex > -1) {
          // The array of TRs correlate to the `computedItems` array
          const item = this.computedItems[rowIndex]
          this.$emit(type, item, rowIndex, event)
        }
      }
    },
    tbodyRowEvtStopped(event) {
      return this.stopIfBusy && this.stopIfBusy(event)
    },
    // Delegated row event handlers
    onTbodyRowKeydown(event) {
      // Keyboard navigation and row click emulation
      const { target, keyCode } = event
      if (
        this.tbodyRowEvtStopped(event) ||
        target.tagName !== 'TR' ||
        !isActiveElement(target) ||
        target.tabIndex !== 0
      ) {
        // Early exit if not an item row TR
        return
      }

      if (arrayIncludes([CODE_ENTER, CODE_SPACE], keyCode)) {
        // Emulated click for keyboard users, transfer to click handler
        stopEvent(event)
        this.onTBodyRowClicked(event)
      } else if (arrayIncludes([CODE_UP, CODE_DOWN, CODE_HOME, CODE_END], keyCode)) {
        // Keyboard navigation
        const rowIndex = this.getTbodyTrIndex(target)
        if (rowIndex > -1) {
          stopEvent(event)
          const trs = this.getTbodyTrs()
          const shift = event.shiftKey
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
    onTBodyRowClicked(event) {
      // Don't emit event when the table is busy, the user clicked
      // on a non-disabled control or is selecting text
      if (this.tbodyRowEvtStopped(event) || filterEvent(event) || textSelectionActive(this.$el)) {
        return
      }
      this.emitTbodyRowEvent(EVENT_NAME_ROW_CLICKED, event)
    },
    onTbodyRowMiddleMouseRowClicked(event) {
      if (!this.tbodyRowEvtStopped(event) && event.which === 2) {
        this.emitTbodyRowEvent(EVENT_NAME_ROW_MIDDLE_CLICKED, event)
      }
    },
    onTbodyRowContextmenu(event) {
      if (!this.tbodyRowEvtStopped(event)) {
        this.emitTbodyRowEvent(EVENT_NAME_ROW_CONTEXTMENU, event)
      }
    },
    onTbodyRowDblClicked(event) {
      if (!this.tbodyRowEvtStopped(event) && !filterEvent(event)) {
        this.emitTbodyRowEvent(EVENT_NAME_ROW_DBLCLICKED, event)
      }
    },
    // Render the tbody element and children
    // Note:
    //   Row hover handlers are handled by the tbody-row mixin
    //   As mouseenter/mouseleave events do not bubble
    renderTbody() {
      const { computedItems: items, renderBusy, renderTopRow, renderEmpty, renderBottomRow } = this
      const h = this.$createElement
      const hasRowClickHandler =
        this.hasListener(EVENT_NAME_ROW_CLICKED) || this.hasSelectableRowClick

      // Prepare the tbody rows
      const $rows = []

      // Add the item data rows or the busy slot
      const $busy = renderBusy ? renderBusy() : null
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
        let defaultSlotName = getCellSlotName()
        defaultSlotName = this.hasNormalizedSlot(defaultSlotName) ? defaultSlotName : null
        this.computedFields.forEach(field => {
          const { key } = field
          const slotName = getCellSlotName(key)
          const lowercaseSlotName = getCellSlotName(key.toLowerCase())
          cache[key] = this.hasNormalizedSlot(slotName)
            ? slotName
            : this.hasNormalizedSlot(lowercaseSlotName)
              ? /* istanbul ignore next */ lowercaseSlotName
              : defaultSlotName
        })
        // Created as a non-reactive property so to not trigger component updates
        // Must be a fresh object each render
        this.$_bodyFieldSlotNameCache = cache

        // Add static top row slot (hidden in visibly stacked mode
        // as we can't control `data-label` attr)
        $rows.push(renderTopRow ? renderTopRow() : h())

        // Render the rows
        items.forEach((item, rowIndex) => {
          // Render the individual item row (rows if details slot)
          $rows.push(this.renderTbodyRow(item, rowIndex))
        })

        // Empty items / empty filtered row slot (only shows if `items.length < 1`)
        $rows.push(renderEmpty ? renderEmpty() : h())

        // Static bottom row slot (hidden in visibly stacked mode
        // as we can't control `data-label` attr)
        $rows.push(renderBottomRow ? renderBottomRow() : h())
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
          class: this.tbodyClass || null,
          props: pluckProps(BTbodyProps, this.$props),
          // BTbody transfers all native event listeners to the root element
          // TODO: Only set the handlers if the table is not busy
          on: handlers,
          ref: 'tbody'
        },
        $rows
      )

      // Return the assembled tbody
      return $tbody
    }
  }
})
