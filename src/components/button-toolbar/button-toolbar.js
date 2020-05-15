import {
  CLASS_NAME_BUTTON,
  CLASS_NAME_BUTTON_TOOLBAR,
  CLASS_NAME_DISABLED,
  CLASS_NAME_DROPDOWN_ITEM,
  CLASS_NAME_FORM_CONTROL,
  CLASS_NAME_JUSTIFY_CONTENT_BETWEEN
} from '../../constants/class-names'
import { NAME_BUTTON_TOOLBAR } from '../../constants/components'
import { EVENT_NAME_FOCUSIN, EVENT_NAME_KEYDOWN } from '../../constants/events'
import { DOWN, LEFT, RIGHT, UP } from '../../constants/key-codes'
import { ROLE_TOOLBAR } from '../../constants/roles'
import { SLOT_NAME_DEFAULT } from '../../constants/slot-names'
import Vue from '../../utils/vue'
import { attemptFocus, isVisible, selectAll } from '../../utils/dom'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// --- Constants ---
const ITEM_SELECTOR = [
  `.${CLASS_NAME_BUTTON}:not(.${CLASS_NAME_DISABLED}):not([disabled]):not(.${CLASS_NAME_DROPDOWN_ITEM})`,
  `.${CLASS_NAME_FORM_CONTROL}:not(.${CLASS_NAME_DISABLED}):not([disabled])`,
  `select:not(.${CLASS_NAME_DISABLED}):not([disabled])`,
  `input[type="checkbox"]:not(.${CLASS_NAME_DISABLED})`,
  `input[type="radio"]:not(.${CLASS_NAME_DISABLED})`
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
    if (this.keyNav) {
      // Pre-set the tabindexes if the markup does not include tabindex="-1" on the toolbar items
      this.getItems()
    }
  },
  methods: {
    onFocusin(evt) {
      if (evt.target === this.$el) {
        evt.preventDefault()
        evt.stopPropagation()
        this.focusFirst(evt)
      }
    },
    stop(evt) {
      evt.preventDefault()
      evt.stopPropagation()
    },
    onKeydown(evt) {
      if (!this.keyNav) {
        /* istanbul ignore next: should never happen */
        return
      }
      const key = evt.keyCode
      const shift = evt.shiftKey
      if (key === UP || key === LEFT) {
        this.stop(evt)
        shift ? this.focusFirst(evt) : this.focusPrev(evt)
      } else if (key === DOWN || key === RIGHT) {
        this.stop(evt)
        shift ? this.focusLast(evt) : this.focusNext(evt)
      }
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
    getItems() {
      const items = selectAll(ITEM_SELECTOR, this.$el)
      items.forEach(item => {
        // Ensure tabfocus is -1 on any new elements
        item.tabIndex = -1
      })
      return items.filter(el => isVisible(el))
    }
  },
  render(h) {
    return h(
      'div',
      {
        staticClass: CLASS_NAME_BUTTON_TOOLBAR,
        class: { [CLASS_NAME_JUSTIFY_CONTENT_BETWEEN]: this.justify },
        attrs: {
          role: ROLE_TOOLBAR,
          tabindex: this.keyNav ? '0' : null
        },
        on: this.keyNav
          ? {
              [EVENT_NAME_FOCUSIN]: this.onFocusin,
              [EVENT_NAME_KEYDOWN]: this.onKeydown
            }
          : {}
      },
      [this.normalizeSlot(SLOT_NAME_DEFAULT)]
    )
  }
})
