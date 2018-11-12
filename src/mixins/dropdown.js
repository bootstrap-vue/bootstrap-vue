import Popper from 'popper.js'
import { from as arrayFrom } from '../utils/array'
import { assign } from '../utils/object'
import KeyCodes from '../utils/key-codes'
import BvEvent from '../utils/bv-event.class'
import warn from '../utils/warn'
import { isVisible, closest, selectAll, getAttr, eventOn, eventOff } from '../utils/dom'

// Return an Array of visible items
function filterVisible (els) {
  return (els || []).filter(isVisible)
}

// Dropdown item CSS selectors
// TODO: .dropdown-form handling
const Selector = {
  FORM_CHILD: '.dropdown form',
  MENU: '.dropdown-menu',
  NAVBAR_NAV: '.navbar-nav',
  VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)',
  // Since we can target the dropdown menu via refs, we use hte following instead of the previous
  ITEM_SELECTOR: '.dropdown-item:not(.disabled):not([disabled])'
}

// Popper attachment positions
const AttachmentMap = {
  // DropUp Left Align
  TOP: 'top-start',
  // DropUp Right Align
  TOPEND: 'top-end',
  // Dropdown left Align
  BOTTOM: 'bottom-start',
  // Dropdown Right Align
  BOTTOMEND: 'bottom-end'
}

export default {
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
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      visible: false,
      inNavbar: null,
      visibleChangePrevented: false
    }
  },
  created () {
    // Create non-reactive property
    this._popper = null
  },
  deactivated () /* istanbul ignore next: not easy to test */ {
    // In case we are inside a `<keep-alive>`
    this.visible = false
    this.whileOpenListen(false)
    this.removePopper()
  },
  beforeDestroy () /* istanbul ignore next: not easy to test */ {
    this.visible = false
    this.whileOpenListen(false)
    this.removePopper()
  },
  watch: {
    visible (newValue, oldValue) {
      if (this.visibleChangePrevented) {
        this.visibleChangePrevented = false
        return
      }

      if (newValue !== oldValue) {
        const evtName = newValue ? 'show' : 'hide'
        let bvEvt = new BvEvent(evtName, {
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
          return
        }
        if (evtName === 'show') {
          this.showMenu()
        } else {
          this.hideMenu()
        }
      }
    },
    disabled (newValue, oldValue) {
      if (newValue !== oldValue && newValue && this.visible) {
        // Hide dropdown if disabled changes to true
        this.visible = false
      }
    }
  },
  computed: {
    toggler () {
      return this.$refs.toggle.$el || this.$refs.toggle
    }
  },
  methods: {
    // Event emitter
    emitEvent (bvEvt) {
      const type = bvEvt.type
      this.$emit(type, bvEvt)
      this.$root.$emit(`bv::dropdown::${type}`, bvEvt)
    },
    showMenu () {
      if (this.disabled) {
        return
      }
      // Ensure other menus are closed
      this.$root.$emit('bv::dropdown::shown', this)

      // Are we in a navbar ?
      if (this.inNavbar === null && this.isNav) {
        this.inNavbar = Boolean(closest('.navbar', this.$el))
      }

      // Disable totally Popper.js for Dropdown in Navbar
      /* istanbul ignore next: cant test popper in JSDOM */
      if (!this.inNavbar) {
        if (typeof Popper === 'undefined') {
          warn('b-dropdown: Popper.js not found. Falling back to CSS positioning.')
        } else {
          // for dropup with alignment we use the parent element as popper container
          let element = ((this.dropup && this.right) || this.split) ? this.$el : this.$refs.toggle
          // Make sure we have a reference to an element, not a component!
          element = element.$el || element
          // Instantiate popper.js
          this.createPopper(element)
        }
      }

      this.whileOpenListen(true)
      this.$emit('shown')

      // Focus on the first item on show
      this.$nextTick(this.focusFirstItem)
    },
    hideMenu () {
      this.whileOpenListen(false)
      this.$root.$emit('bv::dropdown::hidden', this)
      this.$emit('hidden')
      this.removePopper()
    },
    createPopper (element) /* istanbul ignore next: cant test popper in JSDOM */ {
      this.removePopper()
      this._popper = new Popper(element, this.$refs.menu, this.getPopperConfig())
    },
    removePopper () /* istanbul ignore next: cant test popper in JSDOM */ {
      if (this._popper) {
        // Ensure popper event listeners are removed cleanly
        this._popper.destroy()
      }
      this._popper = null
    },
    getPopperConfig () /* istanbul ignore next: can't test popper in JSDOM */ {
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
          offset: {
            offset: this.offset || 0
          },
          flip: {
            enabled: !this.noFlip
          }
        }
      }
      if (this.boundary) {
        popperConfig.modifiers.preventOverflow = {
          boundariesElement: this.boundary
        }
      }
      return assign(popperConfig, this.popperOpts || {})
    },
    whileOpenListen (open) {
      // turn listeners on/off while open
      if (open) {
        // If another dropdown is opened
        this.$root.$on('bv::dropdown::shown', this.rootCloseListener)
        // Hide when links clicked (needed when items in menu are clicked)
        this.$root.$on('clicked::link', this.rootCloseListener)
        // Use new namespaced events for clicked
        this.$root.$on('bv::link::clicked', this.rootCloseListener)
      } else {
        this.$root.$off('bv::dropdown::shown', this.rootCloseListener)
        this.$root.$off('clicked::link', this.rootCloseListener)
        this.$root.$off('bv::link::clicked', this.rootCloseListener)
      }
      // touchstart handling fix
      /* istanbul ignore next: not easy to test */
      if ('ontouchstart' in document.documentElement) {
        // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        // Only enabled if we are *not* in an .navbar-nav.
        const children = arrayFrom(document.body.children)
        const isNavBarNav = closest(this.$el, Selector.NAVBAR_NAV)
        children.forEach(el => {
          if (open && !isNavBarNav) {
            eventOn(el, 'mouseover', this._noop)
          } else {
            eventOff(el, 'mouseover', this._noop)
          }
        })
      }
    },
    _noop () /* istanbul ignore next: no need to test */ {
      // Do nothing event handler (used in touchstart event handler)
    },
    rootCloseListener (vm) {
      if (vm !== this) {
        this.visible = false
      }
    },
    show () {
      // Public method to show dropdown
      if (this.disabled) {
        return
      }
      this.visible = true
    },
    hide () {
      // Public method to hide dropdown
      if (this.disabled) {
        return
      }
      this.visible = false
    },
    toggle (evt) {
      // Called only by a button that toggles the menu
      evt = evt || {}
      const type = evt.type
      const key = evt.keyCode
      if (type !== 'click' && !(type === 'keydown' && (key === KeyCodes.ENTER || key === KeyCodes.SPACE || key === KeyCodes.DOWN))) {
        // We only toggle on Click, Enter, Space, and Arrow Down
        return
      }
      if (this.disabled) {
        this.visible = false
        return
      }
      this.$emit('toggle', evt)
      if (evt.defaultPrevented) {
        // Exit if canceled
        return
      }
      evt.preventDefault()
      evt.stopPropagation()
      // Toggle visibility
      this.visible = !this.visible
    },
    click (evt) {
      // Calle only in split button mode, for the split button
      if (this.disabled) {
        this.visible = false
        return
      }
      this.$emit('click', evt)
    },
    onKeydown (evt) /* istanbul ignore next: not easy to test */ {
      // Called from dropdown menu context
      const key = evt.keyCode
      if (key === KeyCodes.ESC) {
        // Close on ESC
        this.onEsc(evt)
      } else if (key === KeyCodes.TAB) {
        // Close on tab out
        this.onTab(evt)
      } else if (key === KeyCodes.DOWN) {
        // Down Arrow
        this.focusNext(evt, false)
      } else if (key === KeyCodes.UP) {
        // Up Arrow
        this.focusNext(evt, true)
      }
    },
    onEsc (evt) /* istanbul ignore next: not easy to test */ {
      if (this.visible) {
        this.visible = false
        evt.preventDefault()
        evt.stopPropagation()
        // Return focus to original trigger button
        this.$nextTick(this.focusToggler)
      }
    },
    onTab (evt) /* istanbul ignore next: not easy to test */ {
      // TODO: Need special handler for dealing with form inputs
      // Tab, if in a text-like input, we should just focus next item in the dropdown
      // Note: Inputs are in a special .dropdown-form container
    },
    onFocusOut (evt) {
      if (this.$el.contains(evt.relatedTarget)) {
        return
      }
      this.visible = false
    },
    onMouseOver (evt) /* istanbul ignore next: not easy to test */ {
      // Removed mouseover focus handler
    },
    focusNext (evt, up) {
      if (!this.visible) {
        return
      }
      evt.preventDefault()
      evt.stopPropagation()
      this.$nextTick(() => {
        const items = this.getItems()
        if (items.length < 1) {
          return
        }
        let index = items.indexOf(evt.target)
        if (up && index > 0) {
          index--
        } else if (!up && index < items.length - 1) {
          index++
        }
        if (index < 0) {
          index = 0
        }
        this.focusItem(index, items)
      })
    },
    focusItem (idx, items) {
      let el = items.find((el, i) => i === idx)
      if (el && getAttr(el, 'tabindex') !== '-1') {
        el.focus()
      }
    },
    getItems () {
      // Get all items
      return filterVisible(selectAll(Selector.ITEM_SELECTOR, this.$refs.menu))
    },
    getFirstItem () {
      // Get the first non-disabled item
      let item = this.getItems()[0]
      return item || null
    },
    focusFirstItem () {
      const item = this.getFirstItem()
      if (item) {
        this.focusItem(0, [item])
      }
    },
    focusToggler () {
      let toggler = this.toggler
      if (toggler && toggler.focus) {
        toggler.focus()
      }
    }
  }
}
