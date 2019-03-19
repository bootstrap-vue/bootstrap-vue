import { isVisible, selectAll } from '../../utils/dom'
import KeyCodes from '../../utils/key-codes'

const ITEM_SELECTOR = [
  '.btn:not(.disabled):not([disabled]):not(.dropdown-item)',
  '.form-control:not(.disabled):not([disabled])',
  'select:not(.disabled):not([disabled])',
  'input[type="checkbox"]:not(.disabled)',
  'input[type="radio"]:not(.disabled)'
].join(',')

// @vue/component
export default {
  name: 'BButtonToolbar',
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
    onKeydown(evt) {
      if (!this.keyNav) {
        return
      }
      const key = evt.keyCode
      const shift = evt.shiftKey
      if (key === KeyCodes.UP || key === KeyCodes.LEFT) {
        evt.preventDefault()
        evt.stopPropagation()
        shift ? this.focusFirst(evt) : this.focusPrev(evt)
      } else if (key === KeyCodes.DOWN || key === KeyCodes.RIGHT) {
        evt.preventDefault()
        evt.stopPropagation()
        shift ? this.focusLast(evt) : this.focusNext(evt)
      }
    },
    setItemFocus(item) {
      this.$nextTick(() => {
        item && item.focus && item.focus()
      })
    },
    focusPrev(evt) {
      let items = this.getItems()
      const index = items.indexOf(evt.target)
      items = items.slice(0, index)
      this.setItemFocus(items[0])
    },
    focusNext(evt) {
      const items = this.getItems()
      const index = items.indexOf(evt.target)
      items = items.slice(index + 1).reverse()
      this.setItemFocus(items[0])
    },
    focusFirst(evt) {
      const items = this.getItems()
      this.setItemFocus(items[0])
    },
    focusLast(evt) {
      const items = this.getItems()
      this.setItemFocus([items.length - 1])
    },
    getItems() {
      let items = selectAll(ITEM_SELECTOR, this.$el)
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
      [this.$slots.default]
    )
  }
}
