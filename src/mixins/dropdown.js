import Popper from 'popper.js'
import { NAME_DROPDOWN } from '../constants/components'
import { CODE_DOWN, CODE_ENTER, CODE_ESC, CODE_SPACE, CODE_UP } from '../constants/key-codes'
import {
  PLACEMENT_TOP_START,
  PLACEMENT_TOP_END,
  PLACEMENT_BOTTOM_START,
  PLACEMENT_BOTTOM_END,
  PLACEMENT_RIGHT_START,
  PLACEMENT_LEFT_START
} from '../constants/popper'
import { BvEvent } from '../utils/bv-event.class'
import { attemptFocus, closest, contains, isVisible, requestAF, selectAll } from '../utils/dom'
import { stopEvent } from '../utils/events'
import { isNull } from '../utils/inspect'
import { mergeDeep } from '../utils/object'
import { HTMLElement } from '../utils/safe-types'
import { warn } from '../utils/warn'
import clickOutMixin from './click-out'
import focusInMixin from './focus-in'
import idMixin from './id'

// --- Constants ---

// Root dropdown event names
const ROOT_EVENT_PREFIX = 'bv::dropdown::'
const ROOT_EVENT_SHOWN = `${ROOT_EVENT_PREFIX}shown`
const ROOT_EVENT_HIDDEN = `${ROOT_EVENT_PREFIX}hidden`

// CSS selectors
const SELECTOR_FORM_CHILD = '.dropdown form'
const SELECTOR_ITEM = ['.dropdown-item', '.b-dropdown-form']
  .map(selector => `${selector}:not(.disabled):not([disabled])`)
  .join(', ')

// --- Utility methods ---

// Return an array of visible items
const filterVisibles = els => (els || []).filter(isVisible)

// --- Props ---

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
    // Number of pixels to offset menu, or a CSS unit value (i.e. `1px`, `1rem`, etc.)
    type: [Number, String],
    default: 0
  },
  noFlip: {
    // Disable auto-flipping of menu from bottom <=> top
    type: Boolean,
    default: false
  },
  popperOpts: {
    type: Object,
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
    ...commonProps,
    disabled: {
      type: Boolean,
      default: false
    }
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
    },
    boundaryClass() {
      // Position `static` is needed to allow menu to "breakout" of the `scrollParent`
      // boundaries when boundary is anything other than `scrollParent`
      // See: https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
      return this.boundary !== 'scrollParent' && !this.inNavbar ? 'position-static' : ''
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
    // Create private non-reactive props
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
      this.$root.$emit(`${ROOT_EVENT_PREFIX}${type}`, bvEvt)
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
          warn('Popper.js not found. Falling back to CSS positioning', NAME_DROPDOWN)
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
      this.$root.$emit(ROOT_EVENT_SHOWN, this)

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
      this.$root.$emit(ROOT_EVENT_HIDDEN, this)
      this.$emit('hidden')
      this.destroyPopper()
    },
    createPopper(element) {
      this.destroyPopper()
      this.$_popper = new Popper(element, this.$refs.menu, this.getPopperConfig())
    },
    // Ensure popper event listeners are removed cleanly
    destroyPopper() {
      this.$_popper && this.$_popper.destroy()
      this.$_popper = null
    },
    // Instructs popper to re-computes the dropdown position
    // useful if the content changes size
    updatePopper() /* istanbul ignore next: not easy to test */ {
      try {
        this.$_popper.scheduleUpdate()
      } catch {}
    },
    getPopperConfig() {
      let placement = PLACEMENT_BOTTOM_START
      if (this.dropup) {
        placement = this.right ? PLACEMENT_TOP_END : PLACEMENT_TOP_START
      } else if (this.dropright) {
        placement = PLACEMENT_RIGHT_START
      } else if (this.dropleft) {
        placement = PLACEMENT_LEFT_START
      } else if (this.right) {
        placement = PLACEMENT_BOTTOM_END
      }
      const popperConfig = {
        placement,
        modifiers: {
          offset: { offset: this.offset || 0 },
          flip: { enabled: !this.noFlip }
        }
      }
      const boundariesElement = this.boundary
      if (boundariesElement) {
        popperConfig.modifiers.preventOverflow = { boundariesElement }
      }
      return mergeDeep(popperConfig, this.popperOpts || {})
    },
    // Turn listeners on/off while open
    whileOpenListen(isOpen) {
      // Hide the dropdown when clicked outside
      this.listenForClickOut = isOpen
      // Hide the dropdown when it loses focus
      this.listenForFocusIn = isOpen
      // Hide the dropdown when another dropdown is opened
      const method = isOpen ? '$on' : '$off'
      this.$root[method](ROOT_EVENT_SHOWN, this.rootCloseListener)
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
        !(type === 'keydown' && [CODE_ENTER, CODE_SPACE, CODE_DOWN].indexOf(keyCode) !== -1)
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
      stopEvent(evt)
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
      stopEvent(evt, { propagation: false })
    },
    // Called from dropdown menu context
    onKeydown(evt) {
      const { keyCode } = evt
      if (keyCode === CODE_ESC) {
        // Close on ESC
        this.onEsc(evt)
      } else if (keyCode === CODE_DOWN) {
        // Down Arrow
        this.focusNext(evt, false)
      } else if (keyCode === CODE_UP) {
        // Up Arrow
        this.focusNext(evt, true)
      }
    },
    // If user presses ESC, close the menu
    onEsc(evt) {
      if (this.visible) {
        this.visible = false
        stopEvent(evt)
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
      if (!this.visible || (evt && closest(SELECTOR_FORM_CHILD, target))) {
        /* istanbul ignore next: should never happen */
        return
      }
      stopEvent(evt)
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
    focusItem(index, items) {
      const el = items.find((el, i) => i === index)
      attemptFocus(el)
    },
    getItems() {
      // Get all items
      return filterVisibles(selectAll(SELECTOR_ITEM, this.$refs.menu))
    },
    focusMenu() {
      attemptFocus(this.$refs.menu)
    },
    focusToggler() {
      this.$nextTick(() => {
        attemptFocus(this.toggler)
      })
    }
  }
}
