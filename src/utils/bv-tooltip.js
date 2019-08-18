// Tooltip "Class" (Built as a renderless Vue instance)
//
// Handles trigger events, etc.
// Instantiates template on demand

import Vue from './vue'
import { arrayIncludes, concat, from as arrayFrom } from './array'
import { isNumber, isPlainObject, isString } from './inspect'
import {
  isElement,
  isDisabled,
  isVisible,
  closest,
  select,
  hasClass,
  getAttr,
  setAttr,
  removeAttr,
  eventOn,
  eventOff
} from './dom'
import { HTMLElement } from './safe-types'

import { BvEvent } from './bv-event'
import { BVTooltipTemplate } from './bv-tooltip-template'

const NAME = 'BVTtooltip'

// Modal container selector for appending tooltip/popover
const MODAL_SELECTOR = '.modal-content'
// Modal `$root` hidden event
const MODAL_CLOSE_EVENT = 'bv::modal::hidden'

// For dropdown sniffing
const DROPDOWN_CLASS = 'dropdown'
const DROPDOWN_OPEN_SELECTOR = '.dropdown-menu.show'

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
    offset: {
      type: Number,
      default: 0
    },
    delay: {
      type: [Number, Object],
      default: 0
    }
  },
  data() {
    return {
      localPlacementTarget: null,
      localContainer: null,
      activeTrigger: {
        hover: false,
        click: false,
        focus: false,
        manual: false
      },
      hoverState: '',
      enabled: true,
      localShow: false
    }
  },
  computed: {
    Template() {
      // Overwritten by BVPopover
      return BVTooltipTemplate
    },
    templateType() {
      // Overwritten by BVPopover
      // return this.Template.templateType
      return 'tooltip'
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
        // Trickery to ensure these are somewhat reactive
        // TODO:
        //   Maybe make these data values (localContainer, localPlacementTarget)
        //   and update them before show
        container: this.container ? this.getContainer() : this.getContainer(),
        target:
          this.target || this.targetSelector ? this.getPlacementTarget() : this.getPlacementTarget()
        // container: this.localContainer,
        // target: this.localPlacementTarget
      }
    },
    templateAttrs() {
      return {
        id: this.computedId,
        tabindex: '-1'
      }
    },
    computedId() {
      return `__bv_${this.templateType}_${this._uid}__`
    },
    computedBoundary() {
      // Handle case where boundary might be a component reference
      // TODO:
      //   Should this be a getBoundary() method instead?
      return this.boundary ? this.boundary.$el || this.boundary : 'scrollParent'
    },
    computedDelay() {
      // Normalizes delay into object form
      const delay = { show: 0, hide: 0 }
      if (isNumber(this.delay)) {
        delay.show = delay.hide = this.delay
      } else if (isPlainObject(this.delay)) {
        delay.show = isNumber(this.delay.show) ? this.delay.show : delay.show
        delay.hide = isNumber(this.delay.hide) ? this.delay.hide : delay.hide
      }
      return delay
    },
    computedTriggers() {
      // Returns the triggers in array form
      return concat(this.triggers)
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .split(/\s+/)
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
      this.$netTick(() => {
        // TODO:
        //   Should we also clear any active triggers that
        //   are no longer in the list of triggers?
        this.unListen()
        this.listen()
      })
    }
  },
  created() {
    // Create non-reactive properties
    this.$_tip = null
    this.$_fadeTimeout = null
    this.$_hoverTimeout = null
    this.$_visibleInterval = null
    this.$_noop = () => {}

    // Set up all trigger handlers and listeners
    this.listen()

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
    forceHide() {
      // Forcefully hides/destroys the template, regardless of any active triggers
    },
    enable() {
      // Create a non-cancelable BvEvent
      const enabledEvt = this.buildEvent('enabled', {})
      this.enabled = true
      this.emitEvent(enabledEvt)
    },
    disable() {
      // Create a non-cancelable BvEvent
      const disabledEvt = this.buildEvent('disabled', {})
      this.enabled = false
      this.emitEvent(disabledEvt)
    },
    //
    // Utility methods
    //
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
    getTargetId() {
      // Returns the ID of the trigger element
      const target = this.getTarget()
      return target && target.id ? target.id : null
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
    getTipElement() {
      return this.$_tip ? this.$_tip.$el : null
    },
    destroyTip() {
      this.$_tip && this.$_tip.$destroy()
      this.$_tip = null
    },
    isInModal() {
      const target = this.getTarget()
      return target && closest(MODAL_SELECTOR, target)
    },
    isDropdown() {
      // Returns true if trigger is a dropdown
      const target = this.getTarget()
      return target && hasClass(target, DROPDOWN_CLASS)
    },
    dropdownOpen() {
      // Returns true if trigger is a dropdown and the dropdown menu is open
      const target = this.getTarget()
      return this.isDropdown() && target && select(DROPDOWN_OPEN_SELECTOR, target)
    },
    // This should be part of the doShow method
    makeTip() {
      // As soon as the template is instantiated, it
      // will automatically be added to the DOM and shown
      // Note, will be mounted in a `nextTick` delay
      this.destroyTip()
      // eslint-disable-next-line new-cap
      this.$_tip = new this.Template({
        // Move this object into a computed prop or method
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
          mouseenter: () => {},
          mouseleave: () => {}
        }
      })
    },
    hideTemplate() {
      // Trigger the template to start hiding
      // The template will emit the `hide` event after this and
      // then emit the `hidden` event once it is fully hidden
      this.$_tip && this.$_tip.hide()
    },
    clearActiveTriggers() {
      for (const trigger in this.activeTrigger) {
        this.activeTrigger[trigger] = false
      }
    },
    addAriaDescribedby() {
      // Add aria-describedby on trigger element, without removing any other IDs
      const target = this.getTarget()
      let desc = getAttr(target, 'aria-describedby') || ''
      desc = desc
        .split(/\s+/)
        .concat(this.computedId)
        .join(' ')
        .trim()
      // Update/add aria-described by
      setAttr(target, 'aria-describedby', desc)
    },
    removeAriaDescribedby() {
      // Remove aria-describedby on trigger element, without removing any other IDs
      const target = this.getTarget()
      let desc = getAttr(target, 'aria-describedby') || ''
      desc = desc
        .split(/\s+/)
        .filter(d => d !== this.computedId)
        .join(' ')
        .trim()
      // Update or remove aria-describedby
      if (desc) {
        /* istanbul ignore next */
        setAttr(target, 'aria-describedby', desc)
      } else {
        removeAttr(target, 'aria-describedby')
      }
    },
    //
    // BvEvent helpers
    //
    buildEvent(type, opts = {}) {
      // Defaults to a non-cancellable event
      return new BvEvent(type, {
        cancelable: false,
        target: this.getTarget(),
        relatedTarget: this.getTipElement(),
        componentId: this.computedId,
        vueTarget: this,
        // Add in option overrides
        ...opts
      })
    },
    emitEvent(bvEvt) {
      // Emits a BvEvent on $root and this instance
      const evtName = bvEvt.type
      const $root = this.$root
      if ($root && $root.$emit) {
        // Emit an event on $root
        $root.$emit(`bv::${this.templateType}::${evtName}`, bvEvt)
      }
      this.$emit(evtName, bvEvt)
    },
    //
    // Event handler setup methods
    //
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
      const target = this.getTarget()

      // Using `this` as the handler will get automatically directed to this.handleEvent
      events.forEach(evt => {
        target && eventOff(target, evt, this, EvtOpts)
      }, this)

      // Stop listening for global show/hide/enable/disable events
      this.setRootListener(false)
    },
    setRootListener(on) {
      // Listen for global `bv::{hide|show}::{tooltip|popover}` hide request event
      const $root = this.$root
      if ($root) {
        const method = on ? '$on' : '$off'
        const type = this.templateType
        $root[method](`bv::hide::${type}`, this.doHide)
        $root[method](`bv::show::${type}`, this.doShow)
        $root[method](`bv::disable::${type}`, this.doDisable)
        $root[method](`bv::enable::${type}`, this.doEnable)
      }
    },
    setWhileOpenListeners(on) {
      // TODO:
      //   Use the template show/hide events to run this method
      //
      // Events that are only registered when the template is showing
      // Modal close events
      this.setModalListener(on)
      // Dropdown open events (if we are attached to a dropdown)
      this.setDropdownListener(on)
      // Periodic $element visibility check
      // For handling when tip is in <keepalive>, tabs, carousel, etc
      this.visibleCheck(on)
      // On-touch start listeners
      this.setOnTouchStartListener(on)
      // Template listeners
      // TODO:
      //   Move this to the template `focus*` event handlers
      const triggers = this.computedTriggers
      const tip = this.getTipElement()
      if (on && (arrayIncludes(triggers, 'focus') || arrayIncludes(triggers, 'blur'))) {
        // If focus moves between trigger element and tip container, don't close
        eventOn(tip, 'focusout', this, EvtOpts)
        eventOn(tip, 'focusin', this, EvtOpts)
      } else {
        eventOff(tip, 'focusout', this, EvtOpts)
        eventOff(tip, 'focusin', this, EvtOpts)
      }
      // TODO:
      //   Move this to the template event `mouse*` handlers
      if (on && arrayIncludes(triggers, 'hover')) {
        // If hover moves between trigger element and tip container, don't close
        eventOn(tip, 'mouseleave', this, EvtOpts)
        eventOn(tip, 'mouseenter', this, EvtOpts)
      } else {
        eventOff(tip, 'mouseleave', this, EvtOpts)
        eventOff(tip, 'mouseenter', this, EvtOpts)
      }
    },
    visibleCheck(on) {
      // Handler for periodic visibility check
      // TODO:
      //   Could make this a MutationObserver or IntersectionObserver
      clearInterval(this.visibleInterval)
      this.visibleInterval = null
      if (on) {
        this.visibleInterval = setInterval(() => {
          const tip = this.getTipElement()
          // TODO:
          //   Change the hasClass check to check localShow status instead
          if (tip && !isVisible(this.getTarget) && hasClass(tip, 'show')) {
            // Element is no longer visible, so force-hide the tooltip
            this.forceHide()
          }
        }, 100)
      }
    },
    setModalListener(on) {
      // Handle case where tooltip/target is in a modal
      if (!this.isInModal()) {
        return
      }
      // We can listen for modal hidden events on `$root`
      this.$root[on ? '$on' : '$off'](MODAL_CLOSE_EVENT, this.forceHide)
    },
    setOnTouchStartListener(on) {
      // If this is a touch-enabled device we add extra empty
      // `mouseover` listeners to the body's immediate children
      // Only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        /* istanbul ignore next: JSDOM does not support `ontouchstart` event */
        arrayFrom(document.body.children).forEach(el => {
          if (on) {
            eventOn(el, 'mouseover', this.$_noop)
          } else {
            eventOff(el, 'mouseover', this.$_noop)
          }
        })
      }
    },
    setDropdownListener(on) {
      const target = this.getTarget()
      if (!target || !this.$root) {
        return
      }
      // If we are not on a dropdown menu, don't worry
      if (!this.isDropdown) {
        return
      }
      // We can listen for dropdown shown events on it's instance
      // TODO:
      //   We could grab the ID from the dropdown, and listen for
      //   $root events for that particular dropdown id
      //   Although dropdown doesn't emit $root events
      if (target.__vue__) {
        target.__vue__[on ? '$on' : '$off']('shown', this.forceHide)
      }
    },
    //
    // Event handlers
    //
    handleEvent(evt) {
      // General trigger event handler
      // Will handle any native event when the event handler is just `this`
      // target is the trigger element
      const target = this.getTarget()
      // tip is the template (will be null if not open)
      const tip = this.getTipElement()
      if (!target || isDisabled(target) || !this.enabled || this.dropdownOpen()) {
        // If disabled or not enabled, or if a dropdown that is open, don't do anything
        // If tip is shown before element gets disabled, then tip will not
        // close until no longer disabled or forcefully closed
        return
      }
      const type = evt.type
      const evtTarget = evt.target
      const relatedTarget = evt.relatedTarget

      if (type === 'click') {
        this.toggle(evt)
      } else if (type === 'focusin' || type === 'mouseenter') {
        this.enter(evt)
      } else if (type === 'focusout') {
        // `evtTarget` is the element which is loosing focus and
        // `relatedTarget` is the element gaining focus
        // TODO:
        //   With the new event listners on template, we
        //   may not need to do the folowing checks
        
        // If focus moves from `target` to `tip`, don't trigger a leave
        if (tip && target.contains(evtTarget) && tip.contains(relatedTarget)) {
          /* istanbul ignore next */
          return
        }
        // If focus moves from `tip` to `target`, don't trigger a leave
        if (tip && target && tip.contains(evtTarget) && target.contains(relatedTarget)) {
          /* istanbul ignore next */
          return
        }
        // If focus moves within `tip`, don't trigger a leave
        if (tip && tip.contains(evtTarget) && tip.contains(relatedTarget)) {
          /* istanbul ignore next */
          return
        }
        // If focus moves within `target`, don't trigger a leave
        if (target.contains(evtTarget) && target.contains(relatedTarget)) {
          /* istanbul ignore next */
          return
        }
        // Otherwise trigger a leave
        this.leave(evt)
      } else if (type === 'mouseleave') {
        // TODO:
        //   shoud check for mouse events on tip element here
        this.leave(evt)
      }

    },
    doHide(id) {
      // Programmatically hide tooltip or popover
      if (!id) {
        // Close all tooltips or popovers
        this.forceHide()
      } else if (this.getTargetId() === id || this.computedId === id) {
        // Close this specific tooltip or popover
        this.hide()
      }
    },
    doShow(id) {
      // Programmatically show tooltip or popover
      if (!id) {
        // Open all tooltips or popovers
        this.show()
      } else if (this.getTargetId() === id || this.computedId === id) {
        // Show this specific tooltip or popover
        this.show()
      }
    },
    doDisable(id) {
      // Programmatically disable tooltip or popover
      if (!id) {
        // Disable all tooltips or popovers
        this.disable()
      } else if (this.getTargetId() === id || this.computedId === id) {
        // Disable this specific tooltip or popover
        this.disable()
      }
    },
    doEnable(id) {
      // Programmatically enable tooltip or popover
      if (!id) {
        // Enable all tooltips or popovers
        this.enable()
      } else if (this.getTargetId() === id || this.computedId === id) {
        // Enable this specific tooltip or popover
        this.enable()
      }
    },
    toggle(evt) {
      // Click event handler
      // TODO:
      //   Separate out click handler from manual toggle handler
      if (!this.enabled || this.dropdownOpen()) {
        /* istanbul ignore next */
        return
      }
      /* istanbul ignore else */
      if (evt) {
        this.activeTrigger.click = !this.activeTrigger.click

        if (this.isWithActiveTrigger) {
          this.enter(null)
        } else {
          this.leave(null)
        }
      } else {
        // Manual calling of toggle() method
        // TODO:
        //   Change this to check the localShow state
        if (hasClass(this.getTipElement(), 'show')) {
          this.leave(null)
        } else {
          this.enter(null)
        }
      }
    },
    enter(evt = null) {
      // Opening trigger handler
      // Note: Click events are sent with evt === null
      if (evt) {
        this.activeTrigger[evt.type === 'focusin' ? 'focus' : 'hover'] = true
      }
      if (hasClass(this.getTipElement(), 'show') || this.hoverState === 'in') {
        this.hoverState = 'in'
        return
      }
      clearTimeout(this.hoverTimeout)
      this.hoverState = 'in'
      if (!this.computedDelay.show) {
        this.show()
        return
      } else {
        this.hoverTimeout = setTimeout(() => {
          if (this.hoverState === 'in') {
            this.show()
          }
        }, this.computedDelay.show)
      }
    },
    leave(evt = null) {
      // Closing trigger handler
      // Note: Click events are sent with evt === null
      if (evt) {
        this.activeTrigger[evt.type === 'focusout' ? 'focus' : 'hover'] = false
        if (evt.type === 'focusout' && arrayIncludes(this.computedTriggers, 'blur')) {
          // Special case for `blur`: we clear out the other triggers
          this.activeTrigger.click = false
          this.activeTrigger.hover = false
        }
      }
      if (this.isWithActiveTrigger) {
        return
      }
      clearTimeout(this.hoverTimeout)
      this.hoverState = 'out'
      if (!this.computedDelay.hide) {
        this.hide()
        return
      } else {
        this.$hoverTimeout = setTimeout(() => {
          if (this.hoverState === 'out') {
            this.hide()
          }
        }, this.computedDelay.hide)
      }
    }
  }
})
