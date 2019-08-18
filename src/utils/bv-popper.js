// Base on-demand component for tooltip / popover templates
//
// Currently:
//   Responsible for mounting, positioning and transitioning the tooltips/popovers
//   Tooltips/Popovers are only instantiated when shown, and destroyed when hidden
//

import Vue from './vue'
import Popper from 'popper.js'
import { closest, getCS, select } from './dom'
import { hasDocumentSupport } from './env'
import { isString } from './inspect'
import { HTMLElement } from './safe-types'
import { BVTooltipTemplate } from './bv-tooltip-template'

const NAME = 'BVPopper'

const AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOPLEFT: 'top',
  TOPRIGHT: 'top',
  RIGHTTOP: 'right',
  RIGHTBOTTOM: 'right',
  BOTTOMLEFT: 'bottom',
  BOTTOMRIGHT: 'bottom',
  LEFTTOP: 'left',
  LEFTBOTTOM: 'left'
}

const OffsetMap = {
  AUTO: 0,
  TOPLEFT: -1,
  TOP: 0,
  TOPRIGHT: +1,
  RIGHTTOP: -1,
  RIGHT: 0,
  RIGHTBOTTOM: +1,
  BOTTOMLEFT: -1,
  BOTTOM: 0,
  BOTTOMRIGHT: +1,
  LEFTTOP: -1,
  LEFT: 0,
  LEFTBOTTOM: +1
}

// Modal container selector for appending tooltip/popover
const MODAL_SELECTOR = '.modal-content'

// These will be in the tooltip/popover handler mixin

// Modal `$root` hidden event
// const MODAL_CLOSE_EVENT = 'bv::modal::hidden'

// For dropdown sniffing
// const DROPDOWN_CLASS = 'dropdown'
// const DROPDOWN_OPEN_SELECTOR = '.dropdown-menu.show'

// @vue/component
export const BVPopper = /*#__PURE__*/ Vue.extend({
  name: NAME,
  props: {
    target: {
      // Element or Component reference to the element that will have
      // the trigger events bound, and is default element for positioning
      type: [HTMLElement, Object],
      default: null
    },
    targetSelctor: {
      // Future:
      //   CSS selector to target to an element inside of
      //   the target for tooltip/popover positioning
      type: String,
      default: null
    },
    placement: {
      type: String,
      default: right
    },
    fallbackPlacement: {
      type: [String, Array],
      default: 'flip'
    },
    container: {
      // CSS Selector, Element or Component reference
      type: [String, HTMLElement, Object],
      default: null // 'body'
    },
    noFade: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 0
    },
    boundary: {
      // 'scrollParent', 'viewport', 'window', Element, or Component reference
      type: [String, HTMLElement, Object],
      default: 'scrollParent'
    },
    boundaryPadding: {
      // Tooltip/popover will try and stay away from
      // boundary edge by this many pixels
      type: Number,
      default: 5
    },
    arrowPadding: {
      // The minimum distance (in `px`) from the edge of the
      // tooltip/popover that the arrow can be positioned
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      localShow: true,
      attachment: this.getAttachment(this.placement)
    }
  },
  computed: {
    computedBoundary() {
      // Handle case where boundary might be a component reference
      return this.boundary ? this.boundary.$el || this.boundary : 'scrollParent'
    },
    popperConfig() {
      const placement = this.placement
      return {
        placement: this.getAttachment(placement),
        modifiers: {
          offset: { offset: this.getOffset(placement) },
          flip: { behavior: this.fallbackPlacement },
          // `arrow.element` can also be a refernce to an HTML Element
          // maybe we should make this a `$ref` in the templates?
          arrow: { element: '.arrow' },
          preventOverflow: {
            padding: this.boundaryPadding,
            boundariesElement: this.computedBoundary
          }
        },
        onCreate: data => {
          // Handle flipping arrow classes
          if (data.originalPlacement !== data.placement) {
            this.popperPlacementChange(data)
          }
        },
        onUpdate: data => {
          // Handle flipping arrow classes
          this.popperPlacementChange(data)
        }
      }
    }
  },
  created() {
    this.$_popper = null
    // Tooltips / Popovers can only be created client side
    if (hasDocumentSupport) {
      // Auto mount the tooltip / popover and show it
      // Done inside a nextTick to allow time for
      // target/container to appear in DOM
      this.$nextTick(() => {
        // Note: `container` and `target` cannot be changed while tooltip is open
        const container =  this.getContainer()
        const target = this.getTarget()
        // Only mount if we have a target and container
        if (target && container && container.appendChild) {
          // Create popper instance before shown
          this.$on('show', el => {
            this.popperCreate(el)
          })
          // Self destruct once hidden
          this.$on('hidden', () => {
            this.$emit('selfdestruct')
            this.$nextTick(this.$destroy)
          })
          this.$mount(container.appendChild(document.createElement('div')))
        } else {
          // Should we issue a warning here?
          this.$nextTick(this.$destroy)
        }
      })
    }
  },
  updated() {
    // Update popper if needed
    // Or should this be a watcher on this.popperConfig?
    this.popperUpdate()
  },
  beforeDestroy() {
    this.destroyPopper()
  },
  destroyed() {
    const el = this.$el
    el && el.parentNode && el.parentNode.removeChild(el)
  },
  methods: {
    // "Public" method to hide tooltip/popover
    hide() {
      this.localShow = false
    },
    // Private
    getAttachment(placement) {
      return AttachmentMap[String(placement).toUpperCase()] || 'auto'
    },
    getOffset(placement) {
      if (!this.offset) {
        // Could set a ref for the arrow element
        const arrow = select('.arrow', this.$el)
        const arrowOffset = (parseFloat(getCS(arrow).width) || 0) + (parseFloat(this.arrowPadding) || 0)
        switch (OffsetMap[String(placement).toUpperCase()] || 0) {
          case +1:
            return `+50%p - ${arrowOffset}px`
          case -1:
            return `-50%p + ${arrowOffset}px`
          default:
            return 0
        }
      }
      return this.offset
    },
    getTarget() {
      // Future: Handle optional `targetSelector` option
      return this.target ? this.target.$el || this.target : null
    },
    getContainer() {
      const container = this.container ? this.container.$el || this.container : false
      const body = document.body
      // If we are in a modal, we append to the modal instead of body,
      // unless a container is specified
      return container === false
        ? closest(MODAL_SELECTOR, this.getTarget) || body
        : isString(container)
          ? select(container, body) || body
          : body
    },
    popperCreate(el) {
      this.popperDestroy()
      // We use `el` rather than `this.$el` just in case the original
      // mountpoint root element type was changed by the template
      this.$_popper = new Popper(this.getTarget(), el, this.popperConfig)
    },
    popperDestroy() {
      this.$_popper && this.$_popper.destroy()
      this.$_popper = null
    },
    popperUpdate() {
      this.$_popper && this.$_popper.scheduleUpdate()
    },
    popperPlacementChange(data) {
      this.attachment = this.getAttachment(data.placement)
    },
    renderTemplate(h) /* istanbul ignore next */ {
      // Will be overridden by templates
      return h('div')
    }
  },
  render(h) {
    const fade = this.nofade ? '' : 'fade'
    const show = 'show';
    return h(
      'transition',
      {
        props: {
          name: '',
          css: true,
          // Transitions as soon as mounted
          appear: true,
          appearClass: '',
          appearActiveClass: fade,
          appearToClass: show,
          enterClass: '',
          enterActiveClass: fade,
          enterToClass: show,
          leaveClass: show,
          leaveActiveClass: fade,
          leaveToClass: ''
        },
        on: {
          // Events used by parent component/instance
          beforeEnter: el => this.$emit('show', el),
          afterEnter: el => this.$emit('shown', el),
          beforeLeave: el => this.$emit('hide', el),
          afterLeave: el => this.$emit('hidden', el)
        }
      },
      [this.localShow ? this.renderTemplate(h) : h()]
    )
  }
})
