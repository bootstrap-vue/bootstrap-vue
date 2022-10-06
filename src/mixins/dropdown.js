import Popper from 'popper.js'
import { extend } from '../vue'
import { NAME_DROPDOWN } from '../constants/components'
import { HAS_TOUCH_SUPPORT } from '../constants/env'
import {
  EVENT_NAME_CLICK,
  EVENT_NAME_HIDDEN,
  EVENT_NAME_HIDE,
  EVENT_NAME_SHOW,
  EVENT_NAME_SHOWN,
  EVENT_NAME_TOGGLE
} from '../constants/events'
import { CODE_DOWN, CODE_ENTER, CODE_ESC, CODE_SPACE, CODE_UP } from '../constants/key-codes'
import {
  PLACEMENT_TOP_START,
  PLACEMENT_TOP_END,
  PLACEMENT_BOTTOM_START,
  PLACEMENT_BOTTOM_END,
  PLACEMENT_RIGHT_START,
  PLACEMENT_LEFT_START
} from '../constants/popper'
import {
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_OBJECT,
  PROP_TYPE_STRING
} from '../constants/props'
import { HTMLElement } from '../constants/safe-types'
import { BvEvent } from '../utils/bv-event.class'
import { attemptFocus, closest, contains, isVisible, requestAF, selectAll } from '../utils/dom'
import { getRootEventName, stopEvent } from '../utils/events'
import { isNull } from '../utils/inspect'
import { mergeDeep, sortKeys } from '../utils/object'
import { makeProp, makePropsConfigurable } from '../utils/props'
import { warn } from '../utils/warn'
import { clickOutMixin } from './click-out'
import { focusInMixin } from './focus-in'
import { idMixin, props as idProps } from './id'
import { listenOnRootMixin } from './listen-on-root'
import {
  registerElementToInstance,
  removeElementToInstance
} from '../utils/element-to-vue-instance-registry'

// --- Constants ---

const ROOT_EVENT_NAME_SHOWN = getRootEventName(NAME_DROPDOWN, EVENT_NAME_SHOWN)
const ROOT_EVENT_NAME_HIDDEN = getRootEventName(NAME_DROPDOWN, EVENT_NAME_HIDDEN)

// CSS selectors
const SELECTOR_FORM_CHILD = '.dropdown form'
const SELECTOR_ITEM = ['.dropdown-item', '.b-dropdown-form']
  .map(selector => `${selector}:not(.disabled):not([disabled])`)
  .join(', ')

// --- Helper methods ---

// Return an array of visible items
const filterVisibles = els => (els || []).filter(isVisible)

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    // String: `scrollParent`, `window` or `viewport`
    // HTMLElement: HTML Element reference
    boundary: makeProp([HTMLElement, PROP_TYPE_STRING], 'scrollParent'),
    disabled: makeProp(PROP_TYPE_BOOLEAN, false),
    // Place left if possible
    dropleft: makeProp(PROP_TYPE_BOOLEAN, false),
    // Place right if possible
    dropright: makeProp(PROP_TYPE_BOOLEAN, false),
    // Place on top if possible
    dropup: makeProp(PROP_TYPE_BOOLEAN, false),
    // Disable auto-flipping of menu from bottom <=> top
    noFlip: makeProp(PROP_TYPE_BOOLEAN, false),
    // Number of pixels or a CSS unit value to offset menu
    // (i.e. `1px`, `1rem`, etc.)
    offset: makeProp(PROP_TYPE_NUMBER_STRING, 0),
    popperOpts: makeProp(PROP_TYPE_OBJECT, {}),
    // Right align menu (default is left align)
    right: makeProp(PROP_TYPE_BOOLEAN, false)
  }),
  NAME_DROPDOWN
)

// --- Mixin ---

// @vue/component
export const dropdownMixin = extend({
  mixins: [idMixin, listenOnRootMixin, clickOutMixin, focusInMixin],
  provide() {
    return { getBvDropdown: () => this }
  },
  inject: {
    getBvNavbar: { default: () => () => null }
  },
  props,
  data() {
    return {
      visible: false,
      visibleChangePrevented: false
    }
  },
  computed: {
    bvNavbar() {
      return this.getBvNavbar()
    },
    inNavbar() {
      return !isNull(this.bvNavbar)
    },
    toggler() {
      const { toggle } = this.$refs
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
    },
    hideDelay() {
      return this.inNavbar ? (HAS_TOUCH_SUPPORT ? 300 : 50) : 0
    }
  },
  watch: {
    visible(newValue, oldValue) {
      if (this.visibleChangePrevented) {
        this.visibleChangePrevented = false
        return
      }

      if (newValue !== oldValue) {
        const eventName = newValue ? EVENT_NAME_SHOW : EVENT_NAME_HIDE
        const bvEvent = new BvEvent(eventName, {
          cancelable: true,
          vueTarget: this,
          target: this.$refs.menu,
          relatedTarget: null,
          componentId: this.safeId ? this.safeId() : this.id || null
        })
        this.emitEvent(bvEvent)
        if (bvEvent.defaultPrevented) {
          // Reset value and exit if canceled
          this.visibleChangePrevented = true
          this.visible = oldValue
          // Just in case a child element triggered `this.hide(true)`
          this.$off(EVENT_NAME_HIDDEN, this.focusToggler)
          return
        }
        if (newValue) {
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
    this.$_hideTimeout = null
  },
  /* istanbul ignore next */
  deactivated() {
    // In case we are inside a `<keep-alive>`
    this.visible = false
    this.whileOpenListen(false)
    this.destroyPopper()
  },
  mounted() {
    registerElementToInstance(this.$el, this)
  },
  beforeDestroy() {
    this.visible = false
    this.whileOpenListen(false)
    this.destroyPopper()
    this.clearHideTimeout()
    removeElementToInstance(this.$el)
  },
  methods: {
    // Event emitter
    emitEvent(bvEvent) {
      const { type } = bvEvent
      this.emitOnRoot(getRootEventName(NAME_DROPDOWN, type), bvEvent)
      this.$emit(type, bvEvent)
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
      this.emitOnRoot(ROOT_EVENT_NAME_SHOWN, this)

      // Enable listeners
      this.whileOpenListen(true)

      // Wrap in `$nextTick()` to ensure menu is fully rendered/shown
      this.$nextTick(() => {
        // Focus on the menu container on show
        this.focusMenu()
        // Emit the shown event
        this.$emit(EVENT_NAME_SHOWN)
      })
    },
    hideMenu() {
      this.whileOpenListen(false)
      this.emitOnRoot(ROOT_EVENT_NAME_HIDDEN, this)
      this.$emit(EVENT_NAME_HIDDEN)
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
    updatePopper() {
      try {
        this.$_popper.scheduleUpdate()
      } catch {}
    },
    clearHideTimeout() {
      clearTimeout(this.$_hideTimeout)
      this.$_hideTimeout = null
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
      const method = isOpen ? 'listenOnRoot' : 'listenOffRoot'
      this[method](ROOT_EVENT_NAME_SHOWN, this.rootCloseListener)
    },
    rootCloseListener(vm) {
      if (vm !== this) {
        this.visible = false
      }
    },
    // Public method to show dropdown
    show() {
      if (this.disabled) {
        return
      }
      // Wrap in a `requestAF()` to allow any previous
      // click handling to occur first
      requestAF(() => {
        this.visible = true
      })
    },
    // Public method to hide dropdown
    hide(refocus = false) {
      /* istanbul ignore next */
      if (this.disabled) {
        return
      }
      this.visible = false
      if (refocus) {
        // Child element is closing the dropdown on click
        this.$once(EVENT_NAME_HIDDEN, this.focusToggler)
      }
    },
    // Called only by a button that toggles the menu
    toggle(event) {
      event = event || {}
      // Early exit when not a click event or ENTER, SPACE or DOWN were pressed
      const { type, keyCode } = event
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
      this.$emit(EVENT_NAME_TOGGLE, event)
      stopEvent(event)
      // Toggle visibility
      if (this.visible) {
        this.hide(true)
      } else {
        this.show()
      }
    },
    // Mousedown handler for the toggle
    /* istanbul ignore next */
    onMousedown(event) {
      // We prevent the 'mousedown' event for the toggle to stop the
      // 'focusin' event from being fired
      // The event would otherwise be picked up by the global 'focusin'
      // listener and there is no cross-browser solution to detect it
      // relates to the toggle click
      // The 'click' event will still be fired and we handle closing
      // other dropdowns there too
      // See https://github.com/bootstrap-vue/bootstrap-vue/issues/4328
      stopEvent(event, { propagation: false })
    },
    // Called from dropdown menu context
    onKeydown(event) {
      const { keyCode } = event
      if (keyCode === CODE_ESC) {
        // Close on ESC
        this.onEsc(event)
      } else if (keyCode === CODE_DOWN) {
        // Down Arrow
        this.focusNext(event, false)
      } else if (keyCode === CODE_UP) {
        // Up Arrow
        this.focusNext(event, true)
      }
    },
    // If user presses ESC, close the menu
    onEsc(event) {
      if (this.visible) {
        this.visible = false
        stopEvent(event)
        // Return focus to original trigger button
        this.$once(EVENT_NAME_HIDDEN, this.focusToggler)
      }
    },
    // Called only in split button mode, for the split button
    onSplitClick(event) {
      /* istanbul ignore next */
      if (this.disabled) {
        this.visible = false
        return
      }
      this.$emit(EVENT_NAME_CLICK, event)
    },
    // Shared hide handler between click-out and focus-in events
    hideHandler(event) {
      const { target } = event
      if (this.visible && !contains(this.$refs.menu, target) && !contains(this.toggler, target)) {
        this.clearHideTimeout()
        this.$_hideTimeout = setTimeout(() => this.hide(), this.hideDelay)
      }
    },
    // Document click-out listener
    clickOutHandler(event) {
      this.hideHandler(event)
    },
    // Document focus-in listener
    focusInHandler(event) {
      this.hideHandler(event)
    },
    // Keyboard nav
    focusNext(event, up) {
      // Ignore key up/down on form elements
      const { target } = event
      if (!this.visible || (event && closest(SELECTOR_FORM_CHILD, target))) {
        /* istanbul ignore next: should never happen */
        return
      }
      stopEvent(event)
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
})
