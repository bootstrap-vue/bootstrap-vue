import { Vue } from '../../vue'
import { NAME_BUTTON_TOOLBAR } from '../../constants/components'
import { PROP_TYPE_BOOLEAN } from '../../constants/props'
import { CODE_DOWN, CODE_LEFT, CODE_RIGHT, CODE_UP } from '../../constants/key-codes'
import { attemptFocus, contains, isVisible, selectAll } from '../../utils/dom'
import { stopEvent } from '../../utils/events'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Constants ---

const ITEM_SELECTOR = [
  '.btn:not(.disabled):not([disabled]):not(.dropdown-item)',
  '.form-control:not(.disabled):not([disabled])',
  'select:not(.disabled):not([disabled])',
  'input[type="checkbox"]:not(.disabled)',
  'input[type="radio"]:not(.disabled)'
].join(',')

// --- Props ---

export const props = makePropsConfigurable(
  {
    justify: makeProp(PROP_TYPE_BOOLEAN, false),
    keyNav: makeProp(PROP_TYPE_BOOLEAN, false)
  },
  NAME_BUTTON_TOOLBAR
)

// --- Main component ---

// @vue/component
export const BButtonToolbar = /*#__PURE__*/ Vue.extend({
  name: NAME_BUTTON_TOOLBAR,
  mixins: [normalizeSlotMixin],
  props,
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
    focusPrev(event) {
      let items = this.getItems()
      const index = items.indexOf(event.target)
      if (index > -1) {
        items = items.slice(0, index).reverse()
        attemptFocus(items[0])
      }
    },
    focusNext(event) {
      let items = this.getItems()
      const index = items.indexOf(event.target)
      if (index > -1) {
        items = items.slice(index + 1)
        attemptFocus(items[0])
      }
    },
    focusLast() {
      const items = this.getItems().reverse()
      attemptFocus(items[0])
    },
    onFocusin(event) {
      const { $el } = this
      if (event.target === $el && !contains($el, event.relatedTarget)) {
        stopEvent(event)
        this.focusFirst(event)
      }
    },
    onKeydown(event) {
      const { keyCode, shiftKey } = event
      if (keyCode === CODE_UP || keyCode === CODE_LEFT) {
        stopEvent(event)
        shiftKey ? this.focusFirst(event) : this.focusPrev(event)
      } else if (keyCode === CODE_DOWN || keyCode === CODE_RIGHT) {
        stopEvent(event)
        shiftKey ? this.focusLast(event) : this.focusNext(event)
      }
    }
  },
  render(h) {
    const { keyNav } = this

    return h(
      'div',
      {
        staticClass: 'btn-toolbar',
        class: { 'justify-content-between': this.justify },
        attrs: {
          role: 'toolbar',
          tabindex: keyNav ? '0' : null
        },
        on: keyNav
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
