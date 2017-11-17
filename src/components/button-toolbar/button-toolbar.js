import { isVisible, selectAll } from '../../utils/dom'
import { KeyCodes } from '../../utils'

const ITEM_SELECTOR = [
  '.btn:not(.disabled):not([disabled]):not(.dropdown-item)',
  '.form-control:not(.disabled):not([disabled])',
  'select:not(.disabled):not([disabled])',
  'input[type="checkbox"]:not(.disabled)',
  'input[type="radio"]:not(.disabled)'
].join(',')

export default {
  render (h) {
    const t = this
    return h(
      'div',
      {
        class: t.classObject,
        attrs: {
          role: 'toolbar',
          tabindex: t.keyNav ? '0' : null
        },
        on: {
          focusin: t.onFocusin,
          keydown: t.onKeydown
        }
      },
      [ t.$slots.default ]
    )
  },
  computed: {
    classObject () {
      return [
        'btn-toolbar',
        (this.justify && !this.vertical) ? 'justify-content-between' : ''
      ]
    }
  },
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
  methods: {
    onFocusin (evt) {
      if (evt.target === this.$el) {
        evt.preventDefault()
        evt.stopPropagation()
        this.focusFirst(evt)
      }
    },
    onKeydown (evt) {
      if (!this.keyNav) {
        return
      }
      const key = evt.keyCode
      const shift = evt.shiftKey
      if (key === KeyCodes.UP || key === KeyCodes.LEFT) {
        evt.preventDefault()
        evt.stopPropagation()
        if (shift) {
          this.focusFirst(evt)
        } else {
          this.focusNext(evt, true)
        }
      } else if (key === KeyCodes.DOWN || key === KeyCodes.RIGHT) {
        evt.preventDefault()
        evt.stopPropagation()
        if (shift) {
          this.focusLast(evt)
        } else {
          this.focusNext(evt, false)
        }
      }
    },
    setItemFocus (item) {
      this.$nextTick(() => {
        item.focus()
      })
    },
    focusNext (evt, prev) {
      const items = this.getItems()
      if (items.length < 1) {
        return
      }
      let index = items.indexOf(evt.target)
      if (prev && index > 0) {
        index--
      } else if (!prev && index < items.length - 1) {
        index++
      }
      if (index < 0) {
        index = 0
      }
      this.setItemFocus(items[index])
    },
    focusFirst (evt) {
      const items = this.getItems()
      if (items.length > 0) {
        this.setItemFocus(items[0])
      }
    },
    focusLast (evt) {
      const items = this.getItems()
      if (items.length > 0) {
        this.setItemFocus([items.length - 1])
      }
    },
    getItems () {
      let items = selectAll(ITEM_SELECTOR, this.$el)
      items.forEach(item => {
        // Ensure tabfocus is -1 on any new elements
        item.tabIndex = -1
      })
      return items.filter(el => isVisible(el))
    }
  },
  mounted () {
    if (this.keyNav) {
      // Pre-set the tabindexes if the markup does not include tabindex="-1" on the toolbar items
      this.getItems()
    }
  }
}
