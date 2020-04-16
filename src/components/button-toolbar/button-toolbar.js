import {
  CLASS_NAME_BUTTON,
  CLASS_NAME_BUTTON_TOOLBAR,
  CLASS_NAME_DISABLED,
  CLASS_NAME_DROPDOWN_ITEM,
  CLASS_NAME_FORM_CONTROL
} from '../../constants/class-names'
import { NAME_BUTTON_TOOLBAR } from '../../constants/components'
import { DOWN, LEFT, RIGHT, UP } from '../../constants/key-codes'
import Vue from '../../utils/vue'
import { isVisible, selectAll } from '../../utils/dom'
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
    setItemFocus(item) {
      item && item.focus && item.focus()
    },
    focusFirst() {
      const items = this.getItems()
      this.setItemFocus(items[0])
    },
    focusPrev(evt) {
      let items = this.getItems()
      const index = items.indexOf(evt.target)
      if (index > -1) {
        items = items.slice(0, index).reverse()
        this.setItemFocus(items[0])
      }
    },
    focusNext(evt) {
      let items = this.getItems()
      const index = items.indexOf(evt.target)
      if (index > -1) {
        items = items.slice(index + 1)
        this.setItemFocus(items[0])
      }
    },
    focusLast() {
      const items = this.getItems().reverse()
      this.setItemFocus(items[0])
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
      [this.normalizeSlot('default')]
    )
  }
})
