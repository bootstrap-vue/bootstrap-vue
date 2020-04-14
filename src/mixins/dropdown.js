import Popper from 'popper.js'
import KeyCodes from '../utils/key-codes'
import { BvEvent } from '../utils/bv-event.class'
import { closest, contains, isVisible, requestAF, selectAll } from '../utils/dom'
import { isNull } from '../utils/inspect'
import { HTMLElement } from '../utils/safe-types'
import { warn } from '../utils/warn'
import clickOutMixin from './click-out'
import focusInMixin from './focus-in'
import idMixin from './id'

// Return an array of visible items
const filterVisibles = els => (els || []).filter(isVisible)

// Root dropdown event names
const ROOT_DROPDOWN_PREFIX = 'bv::dropdown::'
const ROOT_DROPDOWN_SHOWN = `${ROOT_DROPDOWN_PREFIX}shown`
const ROOT_DROPDOWN_HIDDEN = `${ROOT_DROPDOWN_PREFIX}hidden`

// Dropdown item CSS selectors
const Selector = {
  FORM_CHILD: '.dropdown form',
  ITEM_SELECTOR: ['.dropdown-item', '.b-dropdown-form']
    .map(selector => `${selector}:not(.disabled):not([disabled])`)
    .join(', ')
}

// Popper attachment positions
const AttachmentMap = {
  // Dropup left align
  TOP: 'top-start',
  // Dropup right align
  TOPEND: 'top-end',
  // Dropdown left align
  BOTTOM: 'bottom-start',
  // Dropdown right align
  BOTTOMEND: 'bottom-end',
  // Dropright left align
  RIGHT: 'right-start',
  // Dropright right align
  RIGHTEND: 'right-end',
  // Dropleft left align
  LEFT: 'left-start',
  // Dropleft right align
  LEFTEND: 'left-end'
}

export const commonProps = {
  dropup: {
    // place on top if possible
    type: Boolean,
    default: false
  },
  dropright: {
    // place right if possible
    type: Boolean,
    default: false
  },
  dropleft: {
    // place left if possible
    type: Boolean,
    default: false
  },
  right: {
    // Right align menu (default is left align)
    type: Boolean,
    default: false
  },
  offset: {
    // Number of pixels to offset menu, or a CSS unit value (i.e. 1px, 1rem, etc)
    type: [Number, String],
    default: 0
  },
  noFlip: {
    // Disable auto-flipping of menu from bottom<=>top
    type: Boolean,
    default: false
  },
  popperOpts: {
    // type: Object,
    default: () => {}
  },
  boundary: {
    // String: `scrollParent`, `window` or `viewport`
    // HTMLElement: HTML Element reference
    type: [String, HTMLElement],
    default: 'scrollParent'
  }
}

// @vue/component
export default {
  mixins: [idMixin, clickOutMixin, focusInMixin],
  provide() {
    return { bvDropdown: this }
  },
  inject: {
    bvNavbar: { default: null }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    ...commonProps
  },
  data() {
    return {
      visible: false,
      visibleChangePrevented: false
    }
  },
  computed: {
    inNavbar() {
      return !isNull(this.bvNavbar)
    },
    toggler() {
      const toggle = this.$refs.toggle
      return toggle ? toggle.$el || toggle : null
    },
    directionClass() {
      if (this.dropup) {
        return 'dropup'
      } else if (this.dropright) {
        return 'dropright'
      } else if (this.dropleft) {
        return 'dropleft'
      }
      return ''
    }
  },
  watch: {
    visible(newValue, oldValue) {
      if (this.visibleChangePrevented) {
        this.visibleChangePrevented = false
        return
      }

      if (newValue !== oldValue) {
        const evtName = newValue ? 'show' : 'hide'
        const bvEvt = new BvEvent(evtName, {
          cancelable: true,
          vueTarget: this,
          target: this.$refs.menu,
          relatedTarget: null,
          componentId: this.safeId ? this.safeId() : this.id || null
        })
        this.emitEvent(bvEvt)
        if (bvEvt.defaultPrevented) {
          // Reset value and exit if canceled
          this.visibleChangePrevented = true
          this.visible = oldValue
          // Just in case a child element triggered `this.hide(true)`
          this.$off('hidden', this.focusToggler)
          return
        }
        if (evtName === 'show') {
          this.showMenu()
        } else {
          this.hideMenu()
        }
      }
    },
    disabled(newValue, oldValue) {
      if (newValue !== oldValue && newValue && this.visible) {
        // Hide dropdown if disabled changes to true
        this.visible = false
      }
    }
  },
  created() {
    // Create non-reactive property
    this.$_popper = null
  },
  /* istanbul ignore next */
  deactivated() /* istanbul ignore next: not easy to test */ {
    // In case we are inside a `<keep-alive>`
    this.visible = false
    this.whileOpenListen(false)
    this.destroyPopper()
  },
  beforeDestroy() {
    this.visible = false
    this.whileOpenListen(false)
    this.destroyPopper()
  },
  methods: {
    // Event emitter
    emitEvent(bvEvt) {
      const { type } = bvEvt
      this.$emit(type, bvEvt)
      this.$root.$emit(`${ROOT_DROPDOWN_PREFIX}${type}`, bvEvt)
    },
    showMenu() {
      if (this.disabled) {
        /* istanbul ignore next */
        return
      }

      // Only instantiate Popper.js when dropdown is not in `<b-navbar>`
      if (!this.inNavbar) {
        if (typeof Popper === 'undefined') {
          /* istanbul ignore next */
          warn('Popper.js not found. Falling back to CSS positioning', 'BDropdown')
        } else {
          // For dropup with alignment we use the parent element as popper container
          let el = (this.dropup && this.right) || this.split ? this.$el : this.$refs.toggle
          // Make sure we have a reference to an element, not a component!
          el = el.$el || el
          // Instantiate Popper.js
          this.createPopper(el)
        }
      }

      // Ensure other menus are closed
      this.$root.$emit(ROOT_DROPDOWN_SHOWN, this)

      // Enable listeners
      this.whileOpenListen(true)

      // Wrap in `$nextTick()` to ensure menu is fully rendered/shown
      this.$nextTick(() => {
        // Focus on the menu container on show
        this.focusMenu()
        // Emit the shown event
        this.$emit('shown')
      })
    },
    hideMenu() {
      this.whileOpenListen(false)
      this.$root.$emit(ROOT_DROPDOWN_HIDDEN, this)
      this.$emit('hidden')
      this.destroyPopper()
    },
    createPopper(element) {
      this.destroyPopper()
      this.$_popper = new Popper(element, this.$refs.menu, this.getPopperConfig())
    },
    destroyPopper() {
      // Ensure popper event listeners are removed cleanly
      if (this.$_popper) {
        this.$_popper.destroy()
      }
      this.$_popper = null
    },
    updatePopper() /* istanbul ignore next: not easy to test */ {
      // Instructs popper to re-computes the dropdown position
      // usefull if the content changes size
      try {
        this.$_popper.scheduleUpdate()
      } catch {}
    },
    getPopperConfig() {
      let placement = AttachmentMap.BOTTOM
      if (this.dropup) {
        placement = this.right ? AttachmentMap.TOPEND : AttachmentMap.TOP
      } else if (this.dropright) {
        placement = AttachmentMap.RIGHT
      } else if (this.dropleft) {
        placement = AttachmentMap.LEFT
      } else if (this.right) {
        placement = AttachmentMap.BOTTOMEND
      }
      const popperConfig = {
        placement,
        modifiers: {
          offset: { offset: this.offset || 0 },
          flip: { enabled: !this.noFlip }
        }
      }
      if (this.boundary) {
        popperConfig.modifiers.preventOverflow = { boundariesElement: this.boundary }
      }
      return { ...popperConfig, ...(this.popperOpts || {}) }
    },
    // Turn listeners on/off while open
    whileOpenListen(isOpen) {
      // Hide the dropdown when clicked outside
      this.listenForClickOut = isOpen
      // Hide the dropdown when it loses focus
      this.listenForFocusIn = isOpen
      // Hide the dropdown when another dropdown is opened
      const method = isOpen ? '$on' : '$off'
      this.$root[method](ROOT_DROPDOWN_SHOWN, this.rootCloseListener)
    },
    rootCloseListener(vm) {
      if (vm !== this) {
        this.visible = false
      }
    },
    show() {
      // Public method to show dropdown
      if (this.disabled) {
        return
      }
      // Wrap in a `requestAF()` to allow any previous
      // click handling to occur first
      requestAF(() => {
        this.visible = true
      })
    },
    hide(refocus = false) {
      // Public method to hide dropdown
      if (this.disabled) {
        /* istanbul ignore next */
        return
      }
      this.visible = false
      if (refocus) {
        // Child element is closing the dropdown on click
        this.$once('hidden', this.focusToggler)
      }
    },
    // Called only by a button that toggles the menu
    toggle(evt) {
      evt = evt || {}
      // Early exit when not a click event or ENTER, SPACE or DOWN were pressed
      const { type, keyCode } = evt
      if (
        type !== 'click' &&
        !(
          type === 'keydown' &&
          [KeyCodes.ENTER, KeyCodes.SPACE, KeyCodes.DOWN].indexOf(keyCode) !== -1
        )
      ) {
        /* istanbul ignore next */
        return
      }
      /* istanbul ignore next */
      if (this.disabled) {
        this.visible = false
        return
      }
      this.$emit('toggle', evt)
      evt.preventDefault()
      evt.stopPropagation()
      // Toggle visibility
      if (this.visible) {
        this.hide(true)
      } else {
        this.show()
      }
    },
    // Mousedown handler for the toggle
    /* istanbul ignore next */
    onMousedown(evt) /* istanbul ignore next */ {
      // We prevent the 'mousedown' event for the toggle to stop the
      // 'focusin' event from being fired
      // The event would otherwise be picked up by the global 'focusin'
      // listener and there is no cross-browser solution to detect it
      // relates to the toggle click
      // The 'click' event will still be fired and we handle closing
      // other dropdowns there too
      // See https://github.com/bootstrap-vue/bootstrap-vue/issues/4328
      evt.preventDefault()
    },
    // Called from dropdown menu context
    onKeydown(evt) {
      const { keyCode } = evt
      if (keyCode === KeyCodes.ESC) {
        // Close on ESC
        this.onEsc(evt)
      } else if (keyCode === KeyCodes.DOWN) {
        // Down Arrow
        this.focusNext(evt, false)
      } else if (keyCode === KeyCodes.UP) {
        // Up Arrow
        this.focusNext(evt, true)
      }
    },
    // If user presses ESC, close the menu
    onEsc(evt) {
      if (this.visible) {
        this.visible = false
        evt.preventDefault()
        evt.stopPropagation()
        // Return focus to original trigger button
        this.$once('hidden', this.focusToggler)
      }
    },
    // Called only in split button mode, for the split button
    onSplitClick(evt) {
      /* istanbul ignore next */
      if (this.disabled) {
        this.visible = false
        return
      }
      this.$emit('click', evt)
    },
    // Shared hide handler between click-out and focus-in events
    hideHandler(evt) {
      const { target } = evt
      if (this.visible && !contains(this.$refs.menu, target) && !contains(this.toggler, target)) {
        this.hide()
      }
    },
    // Document click-out listener
    clickOutHandler(evt) {
      this.hideHandler(evt)
    },
    // Document focus-in listener
    focusInHandler(evt) {
      this.hideHandler(evt)
    },
    // Keyboard nav
    focusNext(evt, up) {
      // Ignore key up/down on form elements
      const { target } = evt
      if (!this.visible || (evt && closest(Selector.FORM_CHILD, target))) {
        /* istanbul ignore next: should never happen */
        return
      }
      evt.preventDefault()
      evt.stopPropagation()
      this.$nextTick(() => {
        const items = this.getItems()
        if (items.length < 1) {
          /* istanbul ignore next: should never happen */
          return
        }
        let index = items.indexOf(target)
        if (up && index > 0) {
          index--
        } else if (!up && index < items.length - 1) {
          index++
        }
        if (index < 0) {
          /* istanbul ignore next: should never happen */
          index = 0
        }
        this.focusItem(index, items)
      })
    },
    focusItem(idx, items) {
      const el = items.find((el, i) => i === idx)
      if (el && el.focus) {
        el.focus()
      }
    },
    getItems() {
      // Get all items
      return filterVisibles(selectAll(Selector.ITEM_SELECTOR, this.$refs.menu))
    },
    focusMenu() {
      try {
        this.$refs.menu.focus()
      } catch {}
    },
    focusToggler() {
      this.$nextTick(() => {
        const toggler = this.toggler
        if (toggler && toggler.focus) {
          toggler.focus()
        }
      })
    }
  }
}
