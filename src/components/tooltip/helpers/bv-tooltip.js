// Tooltip "Class" (Built as a renderless Vue instance)
//
// Handles trigger events, etc.
// Instantiates template on demand

import Vue from '../../../utils/vue'
import getScopId from '../../../utils/get-scope-id'
import looseEqual from '../../../utils/loose-equal'
import noop from '../../../utils/noop'
import { arrayIncludes, concat, from as arrayFrom } from '../../../utils/array'
import {
  closest,
  contains,
  getAttr,
  getById,
  hasAttr,
  hasClass,
  isDisabled,
  isElement,
  isVisible,
  removeAttr,
  select,
  setAttr
} from '../../../utils/dom'
import { EVENT_OPTIONS_NO_CAPTURE, eventOn, eventOff, eventOnOff } from '../../../utils/events'
import {
  isFunction,
  isNumber,
  isPlainObject,
  isString,
  isUndefined,
  isUndefinedOrNull
} from '../../../utils/inspect'
import { keys } from '../../../utils/object'
import { warn } from '../../../utils/warn'
import { BvEvent } from '../../../utils/bv-event.class'
import { BVTooltipTemplate } from './bv-tooltip-template'

const NAME = 'BVTooltip'

// Modal container selector for appending tooltip/popover
const MODAL_SELECTOR = '.modal-content'
// Modal `$root` hidden event
const MODAL_CLOSE_EVENT = 'bv::modal::hidden'

// For dropdown sniffing
const DROPDOWN_CLASS = 'dropdown'
const DROPDOWN_OPEN_SELECTOR = '.dropdown-menu.show'

// Data specific to popper and template
// We don't use props, as we need reactivity (we can't pass reactive props)
const templateData = {
  // Text string or Scoped slot function
  title: '',
  // Text string or Scoped slot function
  content: '',
  // String
  variant: null,
  // String, Array, Object
  customClass: null,
  // String or array of Strings (overwritten by BVPopper)
  triggers: '',
  // String (overwritten by BVPopper)
  placement: 'auto',
  // String or array of strings
  fallbackPlacement: 'flip',
  // Element or Component reference (or function that returns element) of
  // the element that will have the trigger events bound, and is also
  // default element for positioning
  target: null,
  // HTML ID, Element or Component reference
  container: null, // 'body'
  // Boolean
  noFade: false,
  // 'scrollParent', 'viewport', 'window', Element, or Component reference
  boundary: 'scrollParent',
  // Tooltip/popover will try and stay away from
  // boundary edge by this many pixels (Number)
  boundaryPadding: 5,
  // Arrow offset (Number)
  offset: 0,
  // Hover/focus delay (Number or Object)
  delay: 0,
  // Arrow of Tooltip/popover will try and stay away from
  // the edge of tooltip/popover edge by this many pixels
  arrowPadding: 6,
  // Interactive state (Boolean)
  interactive: true,
  // Disabled state (Boolean)
  disabled: false,
  // ID to use for tooltip/popover
  id: null,
  // Flag used by directives only, for HTML content
  html: false
}

// @vue/component
export const BVTooltip = /*#__PURE__*/ Vue.extend({
  name: NAME,
  props: {
    // None
  },
  data() {
    return {
      // BTooltip/BPopover/VBTooltip/VBPopover will update this data
      // Via the exposed updateData() method on this instance
      // BVPopover will override some of these defaults
      ...templateData,
      // State management data
      activeTrigger: {
        // manual: false,
        hover: false,
        click: false,
        focus: false
      },
      localShow: false
    }
  },
  computed: {
    templateType() {
      // Overwritten by BVPopover
      return 'tooltip'
    },
    computedId() {
      return this.id || `__bv_${this.templateType}_${this._uid}__`
    },
    computedDelay() {
      // Normalizes delay into object form
      const delay = { show: 0, hide: 0 }
      if (isPlainObject(this.delay)) {
        delay.show = Math.max(parseInt(this.delay.show, 10) || 0, 0)
        delay.hide = Math.max(parseInt(this.delay.hide, 10) || 0, 0)
      } else if (isNumber(this.delay) || isString(this.delay)) {
        delay.show = delay.hide = Math.max(parseInt(this.delay, 10) || 0, 0)
      }
      return delay
    },
    computedTriggers() {
      // Returns the triggers in sorted array form
      // TODO: Switch this to object form for easier lookup
      return concat(this.triggers)
        .filter(Boolean)
        .join(' ')
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .sort()
    },
    isWithActiveTrigger() {
      for (const trigger in this.activeTrigger) {
        if (this.activeTrigger[trigger]) {
          return true
        }
      }
      return false
    },
    computedTemplateData() {
      return {
        title: this.title,
        content: this.content,
        variant: this.variant,
        customClass: this.customClass,
        noFade: this.noFade,
        interactive: this.interactive
      }
    }
  },
  watch: {
    computedTriggers(newTriggers, oldTriggers) {
      // Triggers have changed, so re-register them
      /* istanbul ignore next */
      if (!looseEqual(newTriggers, oldTriggers)) {
        this.$nextTick(() => {
          // Disable trigger listeners
          this.unListen()
          // Clear any active triggers that are no longer in the list of triggers
          oldTriggers.forEach(trigger => {
            if (!arrayIncludes(newTriggers, trigger)) {
              if (this.activeTrigger[trigger]) {
                this.activeTrigger[trigger] = false
              }
            }
          })
          // Re-enable the trigger listeners
          this.listen()
        })
      }
    },
    computedTemplateData() {
      // If any of the while open reactive "props" change,
      // ensure that the template updates accordingly
      this.handleTemplateUpdate()
    },
    disabled(newVal) {
      newVal ? this.disable() : this.enable()
    }
  },
  created() {
    // Create non-reactive properties
    this.$_tip = null
    this.$_hoverTimeout = null
    this.$_hoverState = ''
    this.$_visibleInterval = null
    this.$_enabled = !this.disabled
    this.$_noop = noop.bind(this)

    // Destroy ourselves when the parent is destroyed
    if (this.$parent) {
      this.$parent.$once('hook:beforeDestroy', this.$destroy)
    }

    this.$nextTick(() => {
      const target = this.getTarget()
      if (target && contains(document.body, target)) {
        // Copy the parent's scoped style attribute
        this.scopeId = getScopId(this.$parent)
        // Set up all trigger handlers and listeners
        this.listen()
      } else {
        /* istanbul ignore next */
        warn('Unable to find target element in document.', this.templateType)
      }
    })
  },
  updated() /* istanbul ignore next */ {
    // Usually called when the slots/data changes
    this.$nextTick(this.handleTemplateUpdate)
  },
  deactivated() /* istanbul ignore next */ {
    // In a keepalive that has been deactivated, so hide
    // the tooltip/popover if it is showing
    this.forceHide()
  },
  beforeDestroy() /* istanbul ignore next */ {
    // Remove all handler/listeners
    this.unListen()
    this.setWhileOpenListeners(false)
    // Clear any timeouts/intervals
    this.clearHoverTimeout()
    this.clearVisibilityInterval()
    // Destroy the template
    this.destroyTemplate()
  },
  methods: {
    // --- Methods for creating and destroying the template ---
    getTemplate() {
      // Overridden by BVPopover
      return BVTooltipTemplate
    },
    updateData(data = {}) {
      // Method for updating popper/template data
      // We only update data if it exists, and has not changed
      let titleUpdated = false
      keys(templateData).forEach(prop => {
        if (!isUndefined(data[prop]) && this[prop] !== data[prop]) {
          this[prop] = data[prop]
          if (prop === 'title') {
            titleUpdated = true
          }
        }
      })
      if (titleUpdated && this.localShow) {
        // If the title has updated, we may need to handle the title
        // attribute on the trigger target. We only do this while the
        // template is open
        this.fixTitle()
      }
    },
    createTemplateAndShow() {
      // Creates the template instance and show it
      const container = this.getContainer()
      const Template = this.getTemplate()
      const $tip = (this.$_tip = new Template({
        parent: this,
        // The following is not reactive to changes in the props data
        propsData: {
          // These values cannot be changed while template is showing
          id: this.computedId,
          html: this.html,
          placement: this.placement,
          fallbackPlacement: this.fallbackPlacement,
          target: this.getPlacementTarget(),
          boundary: this.getBoundary(),
          // Ensure the following are integers
          offset: parseInt(this.offset, 10) || 0,
          arrowPadding: parseInt(this.arrowPadding, 10) || 0,
          boundaryPadding: parseInt(this.boundaryPadding, 10) || 0
        }
      }))
      // We set the initial reactive data (values that can be changed while open)
      this.handleTemplateUpdate()
      // Template transition phase events (handled once only)
      // When the template has mounted, but not visibly shown yet
      $tip.$once('show', this.onTemplateShow)
      // When the template has completed showing
      $tip.$once('shown', this.onTemplateShown)
      // When the template has started to hide
      $tip.$once('hide', this.onTemplateHide)
      // When the template has completed hiding
      $tip.$once('hidden', this.onTemplateHidden)
      // When the template gets destroyed for any reason
      $tip.$once('hook:destroyed', this.destroyTemplate)
      // Convenience events from template
      // To save us from manually adding/removing DOM
      // listeners to tip element when it is open
      $tip.$on('focusin', this.handleEvent)
      $tip.$on('focusout', this.handleEvent)
      $tip.$on('mouseenter', this.handleEvent)
      $tip.$on('mouseleave', this.handleEvent)
      // Mount (which triggers the `show`)
      $tip.$mount(container.appendChild(document.createElement('div')))
      // Template will automatically remove its markup from DOM when hidden
    },
    hideTemplate() {
      // Trigger the template to start hiding
      // The template will emit the `hide` event after this and
      // then emit the `hidden` event once it is fully hidden
      // The `hook:destroyed` will also be called (safety measure)
      this.$_tip && this.$_tip.hide()
      // Clear out any stragging active triggers
      this.clearActiveTriggers()
      // Reset the hover state
      this.$_hoverState = ''
    },
    // Destroy the template instance and reset state
    destroyTemplate() {
      this.setWhileOpenListeners(false)
      this.clearHoverTimeout()
      this.$_hoverState = ''
      this.clearActiveTriggers()
      this.localPlacementTarget = null
      try {
        this.$_tip && this.$_tip.$destroy()
      } catch {}
      this.$_tip = null
      this.removeAriaDescribedby()
      this.restoreTitle()
      this.localShow = false
    },
    getTemplateElement() {
      return this.$_tip ? this.$_tip.$el : null
    },
    handleTemplateUpdate() {
      // Update our template title/content "props"
      // So that the template updates accordingly
      const $tip = this.$_tip
      if ($tip) {
        const props = ['title', 'content', 'variant', 'customClass', 'noFade', 'interactive']
        // Only update the values if they have changed
        props.forEach(prop => {
          if ($tip[prop] !== this[prop]) {
            $tip[prop] = this[prop]
          }
        })
      }
    },
    // --- Show/Hide handlers ---
    // Show the tooltip
    show() {
      const target = this.getTarget()
      if (
        !target ||
        !contains(document.body, target) ||
        !isVisible(target) ||
        this.dropdownOpen() ||
        ((isUndefinedOrNull(this.title) || this.title === '') &&
          (isUndefinedOrNull(this.content) || this.content === ''))
      ) {
        // If trigger element isn't in the DOM or is not visible, or
        // is on an open dropdown toggle, or has no content, then
        // we exit without showing
        return
      }
      // If tip already exists, exit early
      if (this.$_tip || this.localShow) {
        /* istanbul ignore next */
        return
      }
      // In the process of showing
      this.localShow = true
      // Create a cancelable BvEvent
      const showEvt = this.buildEvent('show', { cancelable: true })
      this.emitEvent(showEvt)
      // Don't show if event cancelled
      /* istanbul ignore next: ignore for now */
      if (showEvt.defaultPrevented) {
        // Destroy the template (if for some reason it was created)
        /* istanbul ignore next */
        this.destroyTemplate()
        /* istanbul ignore next */
        return
      }
      // Fix the title attribute on target
      this.fixTitle()
      // Set aria-describedby on target
      this.addAriaDescribedby()
      // Create and show the tooltip
      this.createTemplateAndShow()
    },
    hide(force = false) {
      // Hide the tooltip
      const tip = this.getTemplateElement()
      if (!tip || !this.localShow) {
        /* istanbul ignore next */
        this.restoreTitle()
        /* istanbul ignore next */
        return
      }

      // Emit cancelable BvEvent 'hide'
      // We disable cancelling if `force` is true
      const hideEvt = this.buildEvent('hide', { cancelable: !force })
      this.emitEvent(hideEvt)
      /* istanbul ignore next: ignore for now */
      if (hideEvt.defaultPrevented) {
        // Don't hide if event cancelled
        /* istanbul ignore next */
        return
      }

      // Tell the template to hide
      this.hideTemplate()
    },
    forceHide() {
      // Forcefully hides/destroys the template, regardless of any active triggers
      const tip = this.getTemplateElement()
      if (!tip || !this.localShow) {
        /* istanbul ignore next */
        return
      }
      // Disable while open listeners/watchers
      // This is also done in the template `hide` evt handler
      this.setWhileOpenListeners(false)
      // Clear any hover enter/leave event
      this.clearHoverTimeout()
      this.$_hoverState = ''
      this.clearActiveTriggers()
      // Disable the fade animation on the template
      if (this.$_tip) {
        this.$_tip.noFade = true
      }
      // Hide the tip (with force = true)
      this.hide(true)
    },
    enable() {
      this.$_enabled = true
      // Create a non-cancelable BvEvent
      this.emitEvent(this.buildEvent('enabled'))
    },
    disable() {
      this.$_enabled = false
      // Create a non-cancelable BvEvent
      this.emitEvent(this.buildEvent('disabled'))
    },
    // --- Handlers for template events ---
    // When template is inserted into DOM, but not yet shown
    onTemplateShow() {
      // Enable while open listeners/watchers
      this.setWhileOpenListeners(true)
    },
    // When template show transition completes
    onTemplateShown() {
      const prevHoverState = this.$_hoverState
      this.$_hoverState = ''
      if (prevHoverState === 'out') {
        this.leave(null)
      }
      // Emit a non-cancelable BvEvent 'shown'
      this.emitEvent(this.buildEvent('shown'))
    },
    // When template is starting to hide
    onTemplateHide() {
      // Disable while open listeners/watchers
      this.setWhileOpenListeners(false)
    },
    // When template has completed closing (just before it self destructs)
    onTemplateHidden() {
      // Destroy the template
      this.destroyTemplate()
      // Emit a non-cancelable BvEvent 'shown'
      this.emitEvent(this.buildEvent('hidden'))
    },
    // --- Utility methods ---
    getTarget() {
      // Handle case where target may be a component ref
      let target = this.target ? this.target.$el || this.target : null
      // If an ID
      target = isString(target) ? getById(target.replace(/^#/, '')) : target
      // If a function
      target = isFunction(target) ? target() : target
      // If an element ref
      return isElement(target) ? target : null
    },
    getPlacementTarget() {
      // This is the target that the tooltip will be placed on, which may not
      // necessarily be the same element that has the trigger event listeners
      // For now, this is the same as target
      // TODO:
      //   Add in child selector support
      //   Add in visibility checks for this element
      //   Fallback to target if not found
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
      // TODO:
      //   Template should periodically check to see if it is in dom
      //   And if not, self destruct (if container got v-if'ed out of DOM)
      //   Or this could possibly be part of the visibility check
      return container === false
        ? closest(MODAL_SELECTOR, target) || body
        : isString(container)
          ? getById(container.replace(/^#/, '')) || body
          : body
    },
    getBoundary() {
      return this.boundary ? this.boundary.$el || this.boundary : 'scrollParent'
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
    clearHoverTimeout() {
      if (this.$_hoverTimeout) {
        clearTimeout(this.$_hoverTimeout)
        this.$_hoverTimeout = null
      }
    },
    clearVisibilityInterval() {
      if (this.$_visibleInterval) {
        clearInterval(this.$_visibleInterval)
        this.$_visibleInterval = null
      }
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
    fixTitle() {
      // If the target has a title attribute, null it out and
      // store on data-title
      const target = this.getTarget()
      if (target && getAttr(target, 'title')) {
        // We only update title attribute if it has a value
        setAttr(target, 'data-original-title', getAttr(target, 'title') || '')
        setAttr(target, 'title', '')
      }
    },
    restoreTitle() {
      // If target had a title, restore the title attribute
      // and remove the data-title attribute
      const target = this.getTarget()
      if (target && hasAttr(target, 'data-original-title')) {
        setAttr(target, 'title', getAttr(target, 'data-original-title') || '')
        removeAttr(target, 'data-original-title')
      }
    },
    // --- BvEvent helpers ---
    buildEvent(type, options = {}) {
      // Defaults to a non-cancellable event
      return new BvEvent(type, {
        cancelable: false,
        target: this.getTarget(),
        relatedTarget: this.getTemplateElement() || null,
        componentId: this.computedId,
        vueTarget: this,
        // Add in option overrides
        ...options
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
    // --- Event handler setup methods ---
    listen() {
      // Enable trigger event handlers
      const el = this.getTarget()
      if (!el) {
        /* istanbul ignore next */
        return
      }
      // Listen for global show/hide events
      this.setRootListener(true)
      // Set up our listeners on the target trigger element
      this.computedTriggers.forEach(trigger => {
        if (trigger === 'click') {
          eventOn(el, 'click', this.handleEvent, EVENT_OPTIONS_NO_CAPTURE)
        } else if (trigger === 'focus') {
          eventOn(el, 'focusin', this.handleEvent, EVENT_OPTIONS_NO_CAPTURE)
          eventOn(el, 'focusout', this.handleEvent, EVENT_OPTIONS_NO_CAPTURE)
        } else if (trigger === 'blur') {
          // Used to close $tip when element looses focus
          /* istanbul ignore next */
          eventOn(el, 'focusout', this.handleEvent, EVENT_OPTIONS_NO_CAPTURE)
        } else if (trigger === 'hover') {
          eventOn(el, 'mouseenter', this.handleEvent, EVENT_OPTIONS_NO_CAPTURE)
          eventOn(el, 'mouseleave', this.handleEvent, EVENT_OPTIONS_NO_CAPTURE)
        }
      }, this)
    },
    unListen() /* istanbul ignore next */ {
      // Remove trigger event handlers
      const events = ['click', 'focusin', 'focusout', 'mouseenter', 'mouseleave']
      const target = this.getTarget()

      // Stop listening for global show/hide/enable/disable events
      this.setRootListener(false)

      // Clear out any active target listeners
      events.forEach(evt => {
        target && eventOff(target, evt, this.handleEvent, EVENT_OPTIONS_NO_CAPTURE)
      }, this)
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
      // Events that are only registered when the template is showing
      // Modal close events
      this.setModalListener(on)
      // Dropdown open events (if we are attached to a dropdown)
      this.setDropdownListener(on)
      // Periodic $element visibility check
      // For handling when tip target is in <keepalive>, tabs, carousel, etc
      this.visibleCheck(on)
      // On-touch start listeners
      this.setOnTouchStartListener(on)
    },
    // Handler for periodic visibility check
    visibleCheck(on) {
      this.clearVisibilityInterval()
      const target = this.getTarget()
      const tip = this.getTemplateElement()
      if (on) {
        this.$_visibleInterval = setInterval(() => {
          if (tip && this.localShow && (!target.parentNode || !isVisible(target))) {
            // Target element is no longer visible or not in DOM, so force-hide the tooltip
            this.forceHide()
          }
        }, 100)
      }
    },
    setModalListener(on) {
      // Handle case where tooltip/target is in a modal
      if (this.isInModal()) {
        // We can listen for modal hidden events on `$root`
        this.$root[on ? '$on' : '$off'](MODAL_CLOSE_EVENT, this.forceHide)
      }
    },
    setOnTouchStartListener(on) /* istanbul ignore next: JSDOM doesn't support `ontouchstart` */ {
      // If this is a touch-enabled device we add extra empty
      // `mouseover` listeners to the body's immediate children
      // Only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        arrayFrom(document.body.children).forEach(el => {
          eventOnOff(on, el, 'mouseover', this.$_noop)
        })
      }
    },
    setDropdownListener(on) {
      const target = this.getTarget()
      if (!target || !this.$root || !this.isDropdown) {
        return
      }
      // We can listen for dropdown shown events on its instance
      // TODO:
      //   We could grab the ID from the dropdown, and listen for
      //   $root events for that particular dropdown id
      //   Dropdown shown and hidden events will need to emit
      //   Note: Dropdown auto-ID happens in a `$nextTick()` after mount
      //         So the ID lookup would need to be done in a `$nextTick()`
      if (target.__vue__) {
        target.__vue__[on ? '$on' : '$off']('shown', this.forceHide)
      }
    },
    // --- Event handlers ---
    handleEvent(evt) {
      // General trigger event handler
      // target is the trigger element
      const target = this.getTarget()
      if (!target || isDisabled(target) || !this.$_enabled || this.dropdownOpen()) {
        // If disabled or not enabled, or if a dropdown that is open, don't do anything
        // If tip is shown before element gets disabled, then tip will not
        // close until no longer disabled or forcefully closed
        return
      }
      const type = evt.type
      const triggers = this.computedTriggers

      if (type === 'click' && arrayIncludes(triggers, 'click')) {
        this.click(evt)
      } else if (type === 'mouseenter' && arrayIncludes(triggers, 'hover')) {
        // `mouseenter` is a non-bubbling event
        this.enter(evt)
      } else if (type === 'focusin' && arrayIncludes(triggers, 'focus')) {
        // `focusin` is a bubbling event
        // `evt` includes `relatedTarget` (element loosing focus)
        this.enter(evt)
      } else if (
        (type === 'focusout' &&
          (arrayIncludes(triggers, 'focus') || arrayIncludes(triggers, 'blur'))) ||
        (type === 'mouseleave' && arrayIncludes(triggers, 'hover'))
      ) {
        // `focusout` is a bubbling event
        // `mouseleave` is a non-bubbling event
        // `tip` is the template (will be null if not open)
        const tip = this.getTemplateElement()
        // `evtTarget` is the element which is loosing focus/hover and
        const evtTarget = evt.target
        // `relatedTarget` is the element gaining focus/hover
        const relatedTarget = evt.relatedTarget
        /* istanbul ignore next */
        if (
          // From tip to target
          (tip && contains(tip, evtTarget) && contains(target, relatedTarget)) ||
          // From target to tip
          (tip && contains(target, evtTarget) && contains(tip, relatedTarget)) ||
          // Within tip
          (tip && contains(tip, evtTarget) && contains(tip, relatedTarget)) ||
          // Within target
          (contains(target, evtTarget) && contains(target, relatedTarget))
        ) {
          // If focus/hover moves within `tip` and `target`, don't trigger a leave
          return
        }
        // Otherwise trigger a leave
        this.leave(evt)
      }
    },
    doHide(id) {
      // Programmatically hide tooltip or popover
      if (!id || (this.getTargetId() === id || this.computedId === id)) {
        // Close all tooltips or popovers, or this specific tip (with ID)
        this.forceHide()
      }
    },
    doShow(id) {
      // Programmatically show tooltip or popover
      if (!id || (this.getTargetId() === id || this.computedId === id)) {
        // Open all tooltips or popovers, or this specific tip (with ID)
        this.show()
      }
    },
    doDisable(id) /*istanbul ignore next: ignore for now */ {
      // Programmatically disable tooltip or popover
      if (!id || (this.getTargetId() === id || this.computedId === id)) {
        // Disable all tooltips or popovers (no ID), or this specific tip (with ID)
        this.disable()
      }
    },
    doEnable(id) /*istanbul ignore next: ignore for now */ {
      // Programmatically enable tooltip or popover
      if (!id || (this.getTargetId() === id || this.computedId === id)) {
        // Enable all tooltips or popovers (no ID), or this specific tip (with ID)
        this.enable()
      }
    },
    click() {
      if (!this.$_enabled || this.dropdownOpen()) {
        /* istanbul ignore next */
        return
      }
      this.activeTrigger.click = !this.activeTrigger.click
      if (this.isWithActiveTrigger) {
        this.enter(null)
      } else {
        /* istanbul ignore next */
        this.leave(null)
      }
    },
    toggle() /* istanbul ignore next */ {
      // Manual toggle handler
      if (!this.$_enabled || this.dropdownOpen()) {
        /* istanbul ignore next */
        return
      }
      // Should we register as an active trigger?
      // this.activeTrigger.manual = !this.activeTrigger.manual
      if (this.localShow) {
        this.leave(null)
      } else {
        this.enter(null)
      }
    },
    enter(evt = null) {
      // Opening trigger handler
      // Note: Click events are sent with evt === null
      if (evt) {
        this.activeTrigger[evt.type === 'focusin' ? 'focus' : 'hover'] = true
      }
      /* istanbul ignore next */
      if (this.localShow || this.$_hoverState === 'in') {
        this.$_hoverState = 'in'
        return
      }
      this.clearHoverTimeout()
      this.$_hoverState = 'in'
      if (!this.computedDelay.show) {
        this.show()
      } else {
        // Hide any title attribute while enter delay is active
        this.fixTitle()
        this.$_hoverTimeout = setTimeout(() => {
          /* istanbul ignore else */
          if (this.$_hoverState === 'in') {
            this.show()
          } else if (!this.localShow) {
            this.restoreTitle()
          }
        }, this.computedDelay.show)
      }
    },
    leave(evt = null) {
      // Closing trigger handler
      // Note: Click events are sent with evt === null
      if (evt) {
        this.activeTrigger[evt.type === 'focusout' ? 'focus' : 'hover'] = false
        /* istanbul ignore next */
        if (evt.type === 'focusout' && arrayIncludes(this.computedTriggers, 'blur')) {
          // Special case for `blur`: we clear out the other triggers
          this.activeTrigger.click = false
          this.activeTrigger.hover = false
        }
      }
      /* istanbul ignore next: ignore for now */
      if (this.isWithActiveTrigger) {
        return
      }
      this.clearHoverTimeout()
      this.$_hoverState = 'out'
      if (!this.computedDelay.hide) {
        this.hide()
      } else {
        this.$_hoverTimeout = setTimeout(() => {
          if (this.$_hoverState === 'out') {
            this.hide()
          }
        }, this.computedDelay.hide)
      }
    }
  }
})
