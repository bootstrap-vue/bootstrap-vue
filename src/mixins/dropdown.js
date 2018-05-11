import Popper from 'popper.js'
import clickoutMixin from './clickout'
import listenOnRootMixin from './listen-on-root'
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
const ITEM_SELECTOR = '.dropdown-item:not(.disabled):not([disabled])'

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
  mixins: [clickoutMixin, listenOnRootMixin],
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
  mounted () {
    // To keep one dropdown opened on page
    this.listenOnRoot('bv::dropdown::shown', this.rootCloseListener)
    // Hide when clicked on links
    this.listenOnRoot('clicked::link', this.rootCloseListener)
    // Use new namespaced events
    this.listenOnRoot('bv::link::clicked', this.rootCloseListener)
  },
  /* istanbul ignore next: not easy to test */
  deactivated () {
    // In case we are inside a `<keep-alive>`
    this.visible = false
    this.setTouchStart(false)
    this.removePopper()
  },
  /* istanbul ignore next: not easy to test */
  beforeDestroy () {
    this.visible = false
    this.setTouchStart(false)
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
      this.emitOnRoot(`bv::dropdown::${type}`, bvEvt)
    },
    showMenu () {
      if (this.disabled) {
        return
      }
      // Ensure other menus are closed
      this.emitOnRoot('bv::dropdown::shown', this)

      // Are we in a navbar ?
      if (this.inNavbar === null && this.isNav) {
        this.inNavbar = Boolean(closest('.navbar', this.$el))
      }

      // Disable totally Popper.js for Dropdown in Navbar
      /* istnbul ignore next: can't test popper in JSDOM */
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

      this.setTouchStart(true)
      this.$emit('shown')

      // Focus on the first item on show
      this.$nextTick(this.focusFirstItem)
    },
    hideMenu () {
      this.setTouchStart(false)
      this.emitOnRoot('bv::dropdown::hidden', this)
      this.$emit('hidden')
      this.removePopper()
    },
    createPopper (element) {
      this.removePopper()
      this._popper = new Popper(element, this.$refs.menu, this.getPopperConfig())
    },
    removePopper () {
      if (this._popper) {
        // Ensure popper event listeners are removed cleanly
        this._popper.destroy()
      }
      this._popper = null
    },
    getPopperConfig /* istanbul ignore next: can't test popper in JSDOM */ () {
      let placement = AttachmentMap.BOTTOM
      if (this.dropup && this.right) {
        // dropup + right
        placement = AttachmentMap.TOPEND
      } else if (this.dropup) {
        // dropup + left
        placement = AttachmentMap.TOP
      } else if (this.right) {
        // dropdown + right
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
    setTouchStart (on) {
      /*
       * If this is a touch-enabled device we add extra
       * empty mouseover listeners to the body's immediate children;
       * only needed because of broken event delegation on iOS
       * https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
       */
      if ('ontouchstart' in document.documentElement) {
        const children = arrayFrom(document.body.children)
        children.forEach(el => {
          if (on) {
            eventOn('mouseover', this._noop)
          } else {
            eventOff('mouseover', this._noop)
          }
        })
      }
    },
    /* istanbul ignore next: not easy to test */
    _noop () {
      // Do nothing event handler (used in touchstart event handler)
    },
    rootCloseListener (vm) {
      if (vm !== this) {
        this.visible = false
      }
    },
    clickOutListener () {
      this.visible = false
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
    /* istanbul ignore next: not easy to test */
    onKeydown (evt) {
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
    /* istanbul ignore next: not easy to test */
    onEsc (evt) {
      if (this.visible) {
        this.visible = false
        evt.preventDefault()
        evt.stopPropagation()
        // Return focus to original trigger button
        this.$nextTick(this.focusToggler)
      }
    },
    /* istanbul ignore next: not easy to test */
    onTab (evt) {
      if (this.visible) {
        // TODO: Need special handler for dealing with form inputs
        // Tab, if in a text-like input, we should just focus next item in the dropdown
        // Note: Inputs are in a special .dropdown-form container
        this.visible = false
      }
    },
    onFocusOut (evt) {
      if (this.$refs.menu.contains(evt.relatedTarget)) {
        return
      }
      this.visible = false
    },
    /* istanbul ignore next: not easy to test */
    onMouseOver (evt) {
      // Focus the item on hover
      // TODO: Special handling for inputs? Inputs are in a special .dropdown-form container
      const item = evt.target
      if (
        item.classList.contains('dropdown-item') &&
                !item.disabled &&
                !item.classList.contains('disabled') &&
                item.focus
      ) {
        item.focus()
      }
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
      return filterVisible(selectAll(ITEM_SELECTOR, this.$refs.menu))
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
