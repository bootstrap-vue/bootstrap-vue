import Popper from 'popper.js'
import { BvEvent } from '../utils/bv-event.class'
import KeyCodes from '../utils/key-codes'
import warn from '../utils/warn'
import { closest, contains, isVisible, requestAF, selectAll } from '../utils/dom'
import { isNull } from '../utils/inspect'
import clickOutMixin from './click-out'
import focusInMixin from './focus-in'

// Return an array of visible items
const filterVisibles = els => (els || []).filter(isVisible)

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

// @vue/component
export default {
  mixins: [clickOutMixin, focusInMixin],
  provide() {
    return {
      bvDropdown: this
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      // Button label
      type: String,
      default: ''
    },
    html: {
      // Button label
      type: String
    },
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
    lazy: {
      // If true, only render menu contents when open
      type: Boolean,
      default: false
    },
    popperOpts: {
      // type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      inNavbar: null,
      visibleChangePrevented: false
    }
  },
  computed: {
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
          relatedTarget: null
        })
        this.emitEvent(bvEvt)
        if (bvEvt.defaultPrevented) {
          // Reset value and exit if canceled
          this.visibleChangePrevented = true
          this.visible = oldValue
          // Just in case a child element triggered this.hide(true)
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
    this._popper = null
  },
  deactivated() /* istanbul ignore next: not easy to test */ {
    // In case we are inside a `<keep-alive>`
    this.visible = false
    this.whileOpenListen(false)
    this.removePopper()
  },
  beforeDestroy() {
    this.visible = false
    this.whileOpenListen(false)
    this.removePopper()
  },
  methods: {
    // Event emitter
    emitEvent(bvEvt) {
      const type = bvEvt.type
      this.$emit(type, bvEvt)
      this.$root.$emit(`bv::dropdown::${type}`, bvEvt)
    },
    showMenu() {
      if (this.disabled) {
        /* istanbul ignore next */
        return
      }
      // Ensure other menus are closed
      this.$root.$emit('bv::dropdown::shown', this)

      // Are we in a navbar ?
      if (isNull(this.inNavbar) && this.isNav) {
        // We should use an injection for this
        /* istanbul ignore next */
        this.inNavbar = Boolean(closest('.navbar', this.$el))
      }

      // Disable totally Popper.js for Dropdown in Navbar
      if (!this.inNavbar) {
        if (typeof Popper === 'undefined') {
          /* istanbul ignore next */
          warn('b-dropdown: Popper.js not found. Falling back to CSS positioning.')
        } else {
          // for dropup with alignment we use the parent element as popper container
          let element = (this.dropup && this.right) || this.split ? this.$el : this.$refs.toggle
          // Make sure we have a reference to an element, not a component!
          element = element.$el || element
          // Instantiate popper.js
          this.createPopper(element)
        }
      }

      this.whileOpenListen(true)

      // Wrap in nextTick to ensure menu is fully rendered/shown
      this.$nextTick(() => {
        // Focus on the menu container on show
        this.focusMenu()
        // Emit the shown event
        this.$emit('shown')
      })
    },
    hideMenu() {
      this.whileOpenListen(false)
      this.$root.$emit('bv::dropdown::hidden', this)
      this.$emit('hidden')
      this.removePopper()
    },
    createPopper(element) {
      this.removePopper()
      this._popper = new Popper(element, this.$refs.menu, this.getPopperConfig())
    },
    removePopper() {
      if (this._popper) {
        // Ensure popper event listeners are removed cleanly
        this._popper.destroy()
      }
      this._popper = null
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
    whileOpenListen(open) {
      // turn listeners on/off while open
      if (open) {
        // If another dropdown is opened
        this.$root.$on('bv::dropdown::shown', this.rootCloseListener)
        // Hide the dropdown when clicked outside
        this.listenForClickOut = true
        // Hide the dropdown when it loses focus
        this.listenForFocusIn = true
      } else {
        this.$root.$off('bv::dropdown::shown', this.rootCloseListener)
        this.listenForClickOut = false
        this.listenForFocusIn = false
      }
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
      // Wrap in a requestAnimationFrame to allow any previous
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
      const type = evt.type
      const key = evt.keyCode
      if (
        type !== 'click' &&
        !(
          type === 'keydown' &&
          (key === KeyCodes.ENTER || key === KeyCodes.SPACE || key === KeyCodes.DOWN)
        )
      ) {
        // We only toggle on Click, Enter, Space, and Arrow Down
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
    // Called only in split button mode, for the split button
    click(evt) {
      /* istanbul ignore next */
      if (this.disabled) {
        this.visible = false
        return
      }
      this.$emit('click', evt)
    },
    // Called from dropdown menu context
    onKeydown(evt) {
      const key = evt.keyCode
      if (key === KeyCodes.ESC) {
        // Close on ESC
        this.onEsc(evt)
      } else if (key === KeyCodes.DOWN) {
        // Down Arrow
        this.focusNext(evt, false)
      } else if (key === KeyCodes.UP) {
        // Up Arrow
        this.focusNext(evt, true)
      }
    },
    onEsc(evt) {
      if (this.visible) {
        this.visible = false
        evt.preventDefault()
        evt.stopPropagation()
        // Return focus to original trigger button
        this.$once('hidden', this.focusToggler)
      }
    },
    // Document click out listener
    clickOutHandler() {
      if (this.visible) {
        this.visible = false
      }
    },
    // Document focusin listener
    focusInHandler(evt) {
      const target = evt.target
      // If focus leaves dropdown, hide it
      if (this.visible && !contains(this.$refs.menu, target) && !contains(this.toggler, target)) {
        this.visible = false
      }
    },
    // Keyboard nav
    focusNext(evt, up) {
      // Ignore key up/down on form elements
      if (!this.visible || (evt && closest(Selector.FORM_CHILD, evt.target))) {
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
        let index = items.indexOf(evt.target)
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
      this.$refs.menu.focus && this.$refs.menu.focus()
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
