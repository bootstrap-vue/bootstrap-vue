import Vue from '../../vue'
import { NAME_BUTTON_TOOLBAR } from '../../constants/components'
import { CODE_DOWN, CODE_LEFT, CODE_RIGHT, CODE_UP } from '../../constants/key-codes'
import { attemptFocus, contains, isVisible, selectAll } from '../../utils/dom'
import { stopEvent } from '../../utils/events'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// --- Constants ---

const ITEM_SELECTOR = [
  '.btn:not(.disabled):not([disabled]):not(.dropdown-item)',
  '.form-control:not(.disabled):not([disabled])',
  'select:not(.disabled):not([disabled])',
  'input[type="checkbox"]:not(.disabled)',
  'input[type="radio"]:not(.disabled)'
].join(',')

// --- Main component ---

// @vue/component
export const BButtonToolbar = /*#__PURE__*/ Vue.extend({
  name: NAME_BUTTON_TOOLBAR,
  mixins: [normalizeSlotMixin],
  props: {
    justify: {
      type: Boolean,
      default: false
    },
    keyNav: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // Pre-set the tabindexes if the markup does not include
    // `tabindex="-1"` on the toolbar items
    if (this.keyNav) {
      this.getItems()
    }
  },
  methods: {
    getItems() {
      const items = selectAll(ITEM_SELECTOR, this.$el)
      // Ensure `tabindex="-1"` is set on every item
      items.forEach(item => {
        item.tabIndex = -1
      })
      return items.filter(el => isVisible(el))
    },
    focusFirst() {
      const items = this.getItems()
      attemptFocus(items[0])
    },
    focusPrev(evt) {
      let items = this.getItems()
      const index = items.indexOf(evt.target)
      if (index > -1) {
        items = items.slice(0, index).reverse()
        attemptFocus(items[0])
      }
    },
    focusNext(evt) {
      let items = this.getItems()
      const index = items.indexOf(evt.target)
      if (index > -1) {
        items = items.slice(index + 1)
        attemptFocus(items[0])
      }
    },
    focusLast() {
      const items = this.getItems().reverse()
      attemptFocus(items[0])
    },
    onFocusin(evt) {
      const { $el } = this
      if (evt.target === $el && !contains($el, evt.relatedTarget)) {
        stopEvent(evt)
        this.focusFirst(evt)
      }
    },
    onKeydown(evt) {
      const { keyCode, shiftKey } = evt
      if (keyCode === CODE_UP || keyCode === CODE_LEFT) {
        stopEvent(evt)
        shiftKey ? this.focusFirst(evt) : this.focusPrev(evt)
      } else if (keyCode === CODE_DOWN || keyCode === CODE_RIGHT) {
        stopEvent(evt)
        shiftKey ? this.focusLast(evt) : this.focusNext(evt)
      }
    }
  },
  render(h) {
    return h(
      'div',
      {
        staticClass: 'btn-toolbar',
        class: { 'justify-content-between': this.justify },
        attrs: {
          role: 'toolbar',
          tabindex: this.keyNav ? '0' : null
        },
        on: this.keyNav
          ? {
              focusin: this.onFocusin,
              keydown: this.onKeydown
            }
          : {}
      },
      [this.normalizeSlot()]
    )
  }
})
