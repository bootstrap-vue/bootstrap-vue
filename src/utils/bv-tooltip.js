// Tooltip "Class"
//
// Handles trigger events, etc. instantiates template on demand

import Vue from './vue'
import { concat } from './array'
import { isNumber, isPlainObject, isString } from './inspect'
import { closest, select, eventOn, eventOff } from './dom'
import { BVEvent } from './bv-event'

import { BVTooltipTemplate } from './bv-tooltip-template'

const NAME = 'BVTtooltip'

// Modal container selector for appending tooltip/popover
const MODAL_SELECTOR = '.modal-content'

// Modal `$root` hidden event
// const MODAL_CLOSE_EVENT = 'bv::modal::hidden'

// For dropdown sniffing
// const DROPDOWN_CLASS = 'dropdown'
// const DROPDOWN_OPEN_SELECTOR = '.dropdown-menu.show'

// Options for Native Event Listeners (since we never call preventDefault)
const EvtOpts = { passive: true, capture: false }

// @vue/component
export const BVTooltip = /*#__PURE__*/ Vue.extend({
  name: NAME,
  props: {
    trigger: {
      // Overwritten by BVPopover
      type: [String, Array],
      default: 'click hover'
    },
    placement: {
      // Overwritten by BVPopover
      type: String,
      default: 'top'
    },
    title: {
      // Text string, Array<vNode>, vNode
      type: [String, Array, Object],
      default: ''
    },
    content: {
      // Text string, Array<vNode>, vNode
      // Alias/Alternate for title for tolltip
      type: [String, Array, Object],
      default: ''
    },
    variant: {
      type: String,
      default: null
    },
    customClass: {
      type: [String, Array, Object],
      default: null
    },
    target: {
      // Element or Component reference to the element that will have
      // the trigger events bound, and is default element for positioning
      type: [HTMLElement, Object],
      default: null
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
      // Arrow of Tooltip/popover will try and stay away from
      // the edge of tooltip/popover edge by this many pixels
      type: Number,
      default: 6
    },
    delay: {
      type: [Number, Object],
      default: 0
    }
  },
  data() {
    return {
      activeTrigger: {
        hover: false,
        click: false,
        focus: false,
        manual: false
      },
      enabled: true,
      localShow: false
    }
  },
  computed: {
    template() {
      // Overwritten by BVPopover
      return BTooltipTemplate
    },
    computedId() {
      return `__bv_${this.templateType}_${this._uid}__`
    },
    computedBoundary() {
      // Handle case where boundary might be a component reference
      return this.boundary ? this.boundary.$el || this.boundary : 'scrollParent'
    },
    computedDelay() {
      const delay = { show: 0, hide: 0}
      if (isNumber(this.delay)) {
        delay.show = delay.hide = this.delay
      } else if (isPlainObject(this.delay)) {
        delay.show = isNumber(this.delay.show) ? this.delay.show : 0
        delay.hide = isNumber(this.delay.hide) ? this.delay.hide : 0
      }
      return delay
    },
    computedTriggers() {
      // returns the triggers in array form
      return concat(this.triggers)
        .filter(Boolean)
        .join(' ')
        .split(/\s+/)
    },
    templateProps() {
      // We create as an observed object, so that
      // the template will react to changes
      return {
        title: this.title,
        content: this.content,
        variant: this.variant,
        customClass: this.customClass,
        placement: this.placement,
        fallbackPlacement: this.fallbackPlacement,
        boundary: this.computedBoundary,
        boundaryPadding: this.boundaryPadding,
        offset: this.offset,
        noFade: this.noFade,
        arrowPadding: this.arrowPadding,
        // Trickery to ensure these are reactive
        container: this.container ? this.getContainer() : this.getContainer(),
        target:
          (this.target || this.targetSelector)
            ? this.getPlacementTarget()
            : this.getPlacementTarget()
      }
    },
    templateAttrs() {
      return {
        id: this.computedId
      }
    },
    templateType() {
      // This may not work... needs testing
      // may have to devise another way to get the type.
      // Possibly store it into the template $options
      // Or make this a static value overridden by BVPopover
      return this.template.templateType
      // return this.template.$options.bvTemplateType || 'unknown'
    },
    isWithActiveTrigger() {
      for (const trigger in this.activeTrigger) {
        if (this.activeTrigger[trigger]) {
          return true
        }
      }
      return false
    }
  },
  watch: {
    computedtriggers(newVal, oldVal) {
      // Triggers have changed, so re-register them
      this.unListen()
      this.listen()
    }
  },
  created() {
    // Non-reactive properties
    this.$_tip = null
    this.$_fadeTimeout = null
    this.$_hoverTimeout = null
    this.$_visibleInterval = null
    this.$_noop = () => {}

    // Set up all trigger handlers and listeners

    // Destroy ourselves when the parent is destroyed
    if (this.$parent) {
      this.$parent.$once('hook:beforeDestroy', this.$destroy)
    }
  },
  beforDestroy() {
    // Remove all handler/listeners
    this.unListen()
    this.setWhileOpenListeners(false)

    // Clear any timeouts/Timers
    clearTimeout(this.$_visibleInterval)
    this.$_visibleInterval = null
    clearTimeout(this.$_hoverTimeout)
    this.$_hoverTimeout = null
    clearTimeout(this.$_fadeTimeout)
    this.$_fadeTimeout = null

    this.destroyTip()
  },
  methods: {
    show() {
      // Force show
    },
    hide() {
      // Force hide
    },
    enable() {
      // Create a non-cancelable BvEvent
      const enabledEvt = new BvEvent('enabled', {
        cancelable: false,
        target: this.getTarget(),
        relatedTarget: null
      })
      this.enabled = true
      this.emitEvent(enabledEvt)
    },
    disable() {
      // Create a non-cancelable BvEvent
      const disabledEvt = new BvEvent('disabled', {
        cancelable: false,
        target: this.getTarget(),
        relatedTarget: null
      })
      this.enabled = false
      this.emitEvent(disabledEvt)
    },
    getTarget() {
      // Handle case where target may be a component ref
      const target = this.target ? this.target.$el || this.target : null
      return isElement(target) ? target : null
    },
    getPlacementTarget() {
      // This is the target that the tooltip will be placed on, which may not
      // necessarily be the same element that has the trigger event listeners
      // For now, this is the same as target
      // TODO:
      //   Add in child selector support
      return this.getTarget()
    },
    getContainer() {
      // Handle case where container may be a component ref
      const container = this.container ? this.container.$el || this.container : false
      const body = document.body
      const target = this.getTarget()
      // If we are in a modal, we append to the modal instead
      // of body, unless a container is specified
      return container === false
        ? closest(MODAL_SELECTOR, target) || body
        : isString(container)
          ? select(container, body) || body
          : body
    },
    destroyTip() {
      this.$_tip && this.$_tip.$destroy()
      this.$_tip = null
    },
    // This should be part of the doShow method
    makeTip() {
      // As soon as the template is instantiated, it
      // will automatically be added to the DOM and shown
      // Note, will be mounted in a `nextTick`
      this.destroyTip()
      this.$_tip = new this.template({
        parent: this,
        props: this.templateProps,
        attrs: this.templateAttrs,
        on: {
          // When the template has mounted, but not visibly shown yet
          show: () => {},
          // When the template has completed showing
          shown: () => {},
          // When the template has started to hide
          hide: () => {},
          // When the template has completed hiding
          hidden: () => {},
          // This will occur when the template fails to mount
          selfdestruct: () => {},
          // Convenience mouse events from template
          // To save us from manually adding DOM listeners to tip element
          focusin: () => {},
          focusout: () => {},
          mouseenter: () => (),
          mouseleave: () => {}
        }
      })
    },
    hideTip() {
      // Trigger the template to start hiding
      // The template will emit the `hide` event after this and
      // then emit the `hidden` event once it is fully hidden
      this.$_tip && this.$_tip.hide()
    },
    getTipElement() {
      return this.$_tip ? this.$_tip.$el : null
    },
    clearActiveTriggers() {
      for (const trigger in this.activeTrigger) {
        this.activeTrigger[trigger] = false
      }
    },
    addAriaDescribedby() {
      // Add aria-describedby on trigger element, without removing any other IDs
    },
    removeAriaDescribedby() {
      // Remove aria-describedby on trigger element, without removing any other IDs
    },
    // Event handlers and related stuff,
    emitEvent(bvEvt) {
      const evtName = bvEvt.type
      const $root = this.$root
      if ($root && $root.$emit) {
        // Emit an event on $root
        $root.$emit(`bv::${this.templateType}::${evtName}`, bvEvt)
      }
      this.$emit(evtName, bvEvt)
    },
    listen() {
      // Enable trigger event handlers
      const el = this.getTarget()
      if (!el) {
        return
      }

      // Listen for global show/hide events
      this.setRootListener(true)

      // Using `this` as the handler will get automatically directed to
      // this.handleEvent and maintain our binding to `this`
      this.computedTriggers.forEach(trigger => {
        if (trigger === 'click') {
          eventOn(el, 'click', this, EvtOpts)
        } else if (trigger === 'focus') {
          eventOn(el, 'focusin', this, EvtOpts)
          eventOn(el, 'focusout', this, EvtOpts)
        } else if (trigger === 'blur') {
          // Used to close $tip when element looses focus
          eventOn(el, 'focusout', this, EvtOpts)
        } else if (trigger === 'hover') {
          eventOn(el, 'mouseenter', this, EvtOpts)
          eventOn(el, 'mouseleave', this, EvtOpts)
        }
      }, this)
    },
    unListen() {
      // Remove trigger event handlers

      const events = ['click', 'focusin', 'focusout', 'mouseenter', 'mouseleave']
      const el = this.getTarget()

      // Using `this` as the handler will get automatically directed to this.handleEvent
      events.forEach(evt => {
        eventOff(el, evt, this, EvtOpts)
      }, this)

      // Stop listening for global show/hide/enable/disable events
      this.setRootListener(false)
    },
    setRootListener(on) {
      // Root event listeners
    },
    setWhileOpenListeners(on) {
      // Events that are only registered when the template is showing
    },
    // Placed on the trigger element, and template element
    handleEvent(evt) {
      // general event handler
      // will handle any native event when the event handler is just `this`
    },
    toggle(evt) {
      // Click event handler
      if (!this.$isEnabled) {
        /* istanbul ignore next */
        return
      }
    },
    enter(evt) {
      // Hover in / focus in handler
    },
    leave(evt) {
      // Hover out / focus out handler
    }
  }
})
