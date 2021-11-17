// Tooltip "Class" (Built as a renderless Vue instance)
//
// Handles trigger events, etc.
// Instantiates template on demand

import { COMPONENT_UID_KEY, Vue } from '../../../vue'
import { NAME_MODAL, NAME_TOOLTIP_HELPER } from '../../../constants/components'
import {
  EVENT_NAME_DISABLE,
  EVENT_NAME_DISABLED,
  EVENT_NAME_ENABLE,
  EVENT_NAME_ENABLED,
  EVENT_NAME_FOCUSIN,
  EVENT_NAME_FOCUSOUT,
  EVENT_NAME_HIDDEN,
  EVENT_NAME_HIDE,
  EVENT_NAME_MOUSEENTER,
  EVENT_NAME_MOUSELEAVE,
  EVENT_NAME_SHOW,
  EVENT_NAME_SHOWN,
  EVENT_OPTIONS_NO_CAPTURE,
  HOOK_EVENT_NAME_BEFORE_DESTROY,
  HOOK_EVENT_NAME_DESTROYED
} from '../../../constants/events'
import { arrayIncludes, concat, from as arrayFrom } from '../../../utils/array'
import {
  attemptFocus,
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
  requestAF,
  select,
  setAttr
} from '../../../utils/dom'
import {
  eventOff,
  eventOn,
  eventOnOff,
  getRootActionEventName,
  getRootEventName
} from '../../../utils/events'
import { getScopeId } from '../../../utils/get-scope-id'
import { identity } from '../../../utils/identity'
import {
  isFunction,
  isNumber,
  isPlainObject,
  isString,
  isUndefined,
  isUndefinedOrNull
} from '../../../utils/inspect'
import { looseEqual } from '../../../utils/loose-equal'
import { mathMax } from '../../../utils/math'
import { noop } from '../../../utils/noop'
import { toInteger } from '../../../utils/number'
import { keys } from '../../../utils/object'
import { warn } from '../../../utils/warn'
import { BvEvent } from '../../../utils/bv-event.class'
import { listenOnRootMixin } from '../../../mixins/listen-on-root'
import { BVTooltipTemplate } from './bv-tooltip-template'

// --- Constants ---

// Modal container selector for appending tooltip/popover
const MODAL_SELECTOR = '.modal-content'

// Modal `$root` hidden event
const ROOT_EVENT_NAME_MODAL_HIDDEN = getRootEventName(NAME_MODAL, EVENT_NAME_HIDDEN)

// Sidebar container selector for appending tooltip/popover
const SIDEBAR_SELECTOR = '.b-sidebar'

// For finding the container to append to
const CONTAINER_SELECTOR = [MODAL_SELECTOR, SIDEBAR_SELECTOR].join(', ')

// For dropdown sniffing
const DROPDOWN_CLASS = 'dropdown'
const DROPDOWN_OPEN_SELECTOR = '.dropdown-menu.show'

// Data attribute to temporary store the `title` attribute's value
const DATA_TITLE_ATTR = 'data-original-title'

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

// --- Main component ---

// @vue/component
export const BVTooltip = /*#__PURE__*/ Vue.extend({
  name: NAME_TOOLTIP_HELPER,
  mixins: [listenOnRootMixin],
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
      return this.id || `__bv_${this.templateType}_${this[COMPONENT_UID_KEY]}__`
    },
    computedDelay() {
      // Normalizes delay into object form
      const delay = { show: 0, hide: 0 }
      if (isPlainObject(this.delay)) {
        delay.show = mathMax(toInteger(this.delay.show, 0), 0)
        delay.hide = mathMax(toInteger(this.delay.hide, 0), 0)
      } else if (isNumber(this.delay) || isString(this.delay)) {
        delay.show = delay.hide = mathMax(toInteger(this.delay, 0), 0)
      }
      return delay
    },
    computedTriggers() {
      // Returns the triggers in sorted array form
      // TODO: Switch this to object form for easier lookup
      return concat(this.triggers)
        .filter(identity)
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
      const { title, content, variant, customClass, noFade, interactive } = this
      return { title, content, variant, customClass, noFade, interactive }
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
    title(newValue, oldValue) {
      // Make sure to hide the tooltip when the title is set empty
      if (newValue !== oldValue && !newValue) {
        this.hide()
      }
    },
    disabled(newValue) {
      if (newValue) {
        this.disable()
      } else {
        this.enable()
      }
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
      this.$parent.$once(HOOK_EVENT_NAME_BEFORE_DESTROY, () => {
        this.$nextTick(() => {
          // In a `requestAF()` to release control back to application
          requestAF(() => {
            this.$destroy()
          })
        })
      })
    }

    this.$nextTick(() => {
      const target = this.getTarget()
      if (target && contains(document.body, target)) {
        // Copy the parent's scoped style attribute
        this.scopeId = getScopeId(this.$parent)
        // Set up all trigger handlers and listeners
        this.listen()
      } else {
        /* istanbul ignore next */
        warn(
          isString(this.target)
            ? `Unable to find target element by ID "#${this.target}" in document.`
            : 'The provided target is no valid HTML element.',
          this.templateType
        )
      }
    })
  },
  /* istanbul ignore next */
  updated() {
    // Usually called when the slots/data changes
    this.$nextTick(this.handleTemplateUpdate)
  },
  /* istanbul ignore next */
  deactivated() {
    // In a keepalive that has been deactivated, so hide
    // the tooltip/popover if it is showing
    this.forceHide()
  },
  beforeDestroy() {
    // Remove all handler/listeners
    this.unListen()
    this.setWhileOpenListeners(false)
    // Clear any timeouts/intervals
    this.clearHoverTimeout()
    this.clearVisibilityInterval()
    // Destroy the template
    this.destroyTemplate()
    // Remove any other private properties created during create
    this.$_noop = null
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
      // If the title has updated, we may need to handle the `title`
      // attribute on the trigger target
      // We only do this while the template is open
      if (titleUpdated && this.localShow) {
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
          offset: toInteger(this.offset, 0),
          arrowPadding: toInteger(this.arrowPadding, 0),
          boundaryPadding: toInteger(this.boundaryPadding, 0)
        }
      }))
      // We set the initial reactive data (values that can be changed while open)
      this.handleTemplateUpdate()
      // Template transition phase events (handled once only)
      // When the template has mounted, but not visibly shown yet
      $tip.$once(EVENT_NAME_SHOW, this.onTemplateShow)
      // When the template has completed showing
      $tip.$once(EVENT_NAME_SHOWN, this.onTemplateShown)
      // When the template has started to hide
      $tip.$once(EVENT_NAME_HIDE, this.onTemplateHide)
      // When the template has completed hiding
      $tip.$once(EVENT_NAME_HIDDEN, this.onTemplateHidden)
      // When the template gets destroyed for any reason
      $tip.$once(HOOK_EVENT_NAME_DESTROYED, this.destroyTemplate)
      // Convenience events from template
      // To save us from manually adding/removing DOM
      // listeners to tip element when it is open
      $tip.$on(EVENT_NAME_FOCUSIN, this.handleEvent)
      $tip.$on(EVENT_NAME_FOCUSOUT, this.handleEvent)
      $tip.$on(EVENT_NAME_MOUSEENTER, this.handleEvent)
      $tip.$on(EVENT_NAME_MOUSELEAVE, this.handleEvent)
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
        this.$_tip.$destroy()
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
      const showEvent = this.buildEvent(EVENT_NAME_SHOW, { cancelable: true })
      this.emitEvent(showEvent)
      // Don't show if event cancelled
      /* istanbul ignore if */
      if (showEvent.defaultPrevented) {
        // Destroy the template (if for some reason it was created)
        this.destroyTemplate()
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
      /* istanbul ignore if */
      if (!tip || !this.localShow) {
        this.restoreTitle()
        return
      }

      // Emit cancelable BvEvent 'hide'
      // We disable cancelling if `force` is true
      const hideEvent = this.buildEvent(EVENT_NAME_HIDE, { cancelable: !force })
      this.emitEvent(hideEvent)
      /* istanbul ignore if: ignore for now */
      if (hideEvent.defaultPrevented) {
        // Don't hide if event cancelled
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
      // This is also done in the template `hide` event handler
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
      this.emitEvent(this.buildEvent(EVENT_NAME_ENABLED))
    },
    disable() {
      this.$_enabled = false
      // Create a non-cancelable BvEvent
      this.emitEvent(this.buildEvent(EVENT_NAME_DISABLED))
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
      /* istanbul ignore next: occasional Node 10 coverage error */
      if (prevHoverState === 'out') {
        this.leave(null)
      }
      // Emit a non-cancelable BvEvent 'shown'
      this.emitEvent(this.buildEvent(EVENT_NAME_SHOWN))
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
      this.emitEvent(this.buildEvent(EVENT_NAME_HIDDEN))
    },
    // --- Helper methods ---
    getTarget() {
      let { target } = this
      if (isString(target)) {
        target = getById(target.replace(/^#/, ''))
      } else if (isFunction(target)) {
        target = target()
      } else if (target) {
        target = target.$el || target
      }
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
      // If we are in a modal, we append to the modal, If we
      // are in a sidebar, we append to the sidebar, else append
      // to body, unless a container is specified
      // TODO:
      //   Template should periodically check to see if it is in dom
      //   And if not, self destruct (if container got v-if'ed out of DOM)
      //   Or this could possibly be part of the visibility check
      return container === false
        ? closest(CONTAINER_SELECTOR, target) || body
        : /*istanbul ignore next */ isString(container)
          ? /*istanbul ignore next */ getById(container.replace(/^#/, '')) || body
          : /*istanbul ignore next */ body
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
      clearTimeout(this.$_hoverTimeout)
      this.$_hoverTimeout = null
    },
    clearVisibilityInterval() {
      clearInterval(this.$_visibleInterval)
      this.$_visibleInterval = null
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
      // If the target has a `title` attribute,
      // remove it and store it on a data attribute
      const target = this.getTarget()
      if (hasAttr(target, 'title')) {
        // Get `title` attribute value and remove it from target
        const title = getAttr(target, 'title')
        setAttr(target, 'title', '')
        // Only set the data attribute when the value is truthy
        if (title) {
          setAttr(target, DATA_TITLE_ATTR, title)
        }
      }
    },
    restoreTitle() {
      // If the target had a `title` attribute,
      // restore it and remove the data attribute
      const target = this.getTarget()
      if (hasAttr(target, DATA_TITLE_ATTR)) {
        // Get data attribute value and remove it from target
        const title = getAttr(target, DATA_TITLE_ATTR)
        removeAttr(target, DATA_TITLE_ATTR)
        // Only restore the `title` attribute when the value is truthy
        if (title) {
          setAttr(target, 'title', title)
        }
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
    emitEvent(bvEvent) {
      const { type } = bvEvent
      this.emitOnRoot(getRootEventName(this.templateType, type), bvEvent)
      this.$emit(type, bvEvent)
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
          // Used to close $tip when element loses focus
          /* istanbul ignore next */
          eventOn(el, 'focusout', this.handleEvent, EVENT_OPTIONS_NO_CAPTURE)
        } else if (trigger === 'hover') {
          eventOn(el, 'mouseenter', this.handleEvent, EVENT_OPTIONS_NO_CAPTURE)
          eventOn(el, 'mouseleave', this.handleEvent, EVENT_OPTIONS_NO_CAPTURE)
        }
      }, this)
    },
    /* istanbul ignore next */
    unListen() {
      // Remove trigger event handlers
      const events = ['click', 'focusin', 'focusout', 'mouseenter', 'mouseleave']
      const target = this.getTarget()

      // Stop listening for global show/hide/enable/disable events
      this.setRootListener(false)

      // Clear out any active target listeners
      events.forEach(event => {
        target && eventOff(target, event, this.handleEvent, EVENT_OPTIONS_NO_CAPTURE)
      }, this)
    },
    setRootListener(on) {
      // Listen for global `bv::{hide|show}::{tooltip|popover}` hide request event
      const $root = this.$root
      if ($root) {
        const method = on ? '$on' : '$off'
        const type = this.templateType
        $root[method](getRootActionEventName(type, EVENT_NAME_HIDE), this.doHide)
        $root[method](getRootActionEventName(type, EVENT_NAME_SHOW), this.doShow)
        $root[method](getRootActionEventName(type, EVENT_NAME_DISABLE), this.doDisable)
        $root[method](getRootActionEventName(type, EVENT_NAME_ENABLE), this.doEnable)
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
      if (on) {
        this.$_visibleInterval = setInterval(() => {
          const tip = this.getTemplateElement()
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
        this.$root[on ? '$on' : '$off'](ROOT_EVENT_NAME_MODAL_HIDDEN, this.forceHide)
      }
    },
    /* istanbul ignore next: JSDOM doesn't support `ontouchstart` */
    setOnTouchStartListener(on) {
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
        target.__vue__[on ? '$on' : '$off'](EVENT_NAME_SHOWN, this.forceHide)
      }
    },
    // --- Event handlers ---
    handleEvent(event) {
      // General trigger event handler
      // target is the trigger element
      const target = this.getTarget()
      if (!target || isDisabled(target) || !this.$_enabled || this.dropdownOpen()) {
        // If disabled or not enabled, or if a dropdown that is open, don't do anything
        // If tip is shown before element gets disabled, then tip will not
        // close until no longer disabled or forcefully closed
        return
      }
      const type = event.type
      const triggers = this.computedTriggers

      if (type === 'click' && arrayIncludes(triggers, 'click')) {
        this.click(event)
      } else if (type === 'mouseenter' && arrayIncludes(triggers, 'hover')) {
        // `mouseenter` is a non-bubbling event
        this.enter(event)
      } else if (type === 'focusin' && arrayIncludes(triggers, 'focus')) {
        // `focusin` is a bubbling event
        // `event` includes `relatedTarget` (element losing focus)
        this.enter(event)
      } else if (
        (type === 'focusout' &&
          (arrayIncludes(triggers, 'focus') || arrayIncludes(triggers, 'blur'))) ||
        (type === 'mouseleave' && arrayIncludes(triggers, 'hover'))
      ) {
        // `focusout` is a bubbling event
        // `mouseleave` is a non-bubbling event
        // `tip` is the template (will be null if not open)
        const tip = this.getTemplateElement()
        // `eventTarget` is the element which is losing focus/hover and
        const eventTarget = event.target
        // `relatedTarget` is the element gaining focus/hover
        const relatedTarget = event.relatedTarget
        /* istanbul ignore next */
        if (
          // From tip to target
          (tip && contains(tip, eventTarget) && contains(target, relatedTarget)) ||
          // From target to tip
          (tip && contains(target, eventTarget) && contains(tip, relatedTarget)) ||
          // Within tip
          (tip && contains(tip, eventTarget) && contains(tip, relatedTarget)) ||
          // Within target
          (contains(target, eventTarget) && contains(target, relatedTarget))
        ) {
          // If focus/hover moves within `tip` and `target`, don't trigger a leave
          return
        }
        // Otherwise trigger a leave
        this.leave(event)
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
    /*istanbul ignore next: ignore for now */
    doDisable(id) /*istanbul ignore next: ignore for now */ {
      // Programmatically disable tooltip or popover
      if (!id || (this.getTargetId() === id || this.computedId === id)) {
        // Disable all tooltips or popovers (no ID), or this specific tip (with ID)
        this.disable()
      }
    },
    /*istanbul ignore next: ignore for now */
    doEnable(id) /*istanbul ignore next: ignore for now */ {
      // Programmatically enable tooltip or popover
      if (!id || (this.getTargetId() === id || this.computedId === id)) {
        // Enable all tooltips or popovers (no ID), or this specific tip (with ID)
        this.enable()
      }
    },
    click(event) {
      if (!this.$_enabled || this.dropdownOpen()) {
        /* istanbul ignore next */
        return
      }
      // Get around a WebKit bug where `click` does not trigger focus events
      // On most browsers, `click` triggers a `focusin`/`focus` event first
      // Needed so that trigger 'click blur' works on iOS
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/5099
      // We use `currentTarget` rather than `target` to trigger on the
      // element, not the inner content
      attemptFocus(event.currentTarget)
      this.activeTrigger.click = !this.activeTrigger.click
      if (this.isWithActiveTrigger) {
        this.enter(null)
      } else {
        /* istanbul ignore next */
        this.leave(null)
      }
    },
    /* istanbul ignore next */
    toggle() {
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
    enter(event = null) {
      // Opening trigger handler
      // Note: Click events are sent with event === null
      if (event) {
        this.activeTrigger[event.type === 'focusin' ? 'focus' : 'hover'] = true
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
    leave(event = null) {
      // Closing trigger handler
      // Note: Click events are sent with event === null
      if (event) {
        this.activeTrigger[event.type === 'focusout' ? 'focus' : 'hover'] = false
        /* istanbul ignore next */
        if (event.type === 'focusout' && arrayIncludes(this.computedTriggers, 'blur')) {
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
