import Popper from 'popper.js'
import BvEvent from './bv-event.class'
import noop from './noop'
import { from as arrayFrom } from './array'
import {
  closest,
  select,
  isVisible,
  isDisabled,
  getCS,
  addClass,
  removeClass,
  hasClass,
  setAttr,
  removeAttr,
  getAttr,
  eventOn,
  eventOff
} from './dom'

const NAME = 'tooltip'
const CLASS_PREFIX = 'bs-tooltip'
const BS_CLASS_PREFIX_REGEX = new RegExp(`\\b${CLASS_PREFIX}\\S+`, 'g')

const TRANSITION_DURATION = 150

// Modal $root hidden event
const MODAL_CLOSE_EVENT = 'bv::modal::hidden'
// Modal container for appending tooltip/popover
const MODAL_CLASS = '.modal-content'

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

const HoverState = {
  SHOW: 'show',
  OUT: 'out'
}

const ClassName = {
  FADE: 'fade',
  SHOW: 'show'
}

const Selector = {
  TOOLTIP: '.tooltip',
  TOOLTIP_INNER: '.tooltip-inner',
  ARROW: '.arrow'
}

const Defaults = {
  animation: true,
  template:
    '<div class="tooltip" role="tooltip">' +
    '<div class="arrow"></div>' +
    '<div class="tooltip-inner"></div>' +
    '</div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  placement: 'top',
  offset: 0,
  arrowPadding: 6,
  container: false,
  fallbackPlacement: 'flip',
  callbacks: {},
  boundary: 'scrollParent'
}

// Transition event names
const TransitionEndEvents = {
  WebkitTransition: ['webkitTransitionEnd'],
  MozTransition: ['transitionend'],
  OTransition: ['otransitionend', 'oTransitionEnd'],
  transition: ['transitionend']
}

// Options for Native Event Listeners (since we never call preventDefault)
const EvtOpts = { passive: true, capture: false }

// Client-side tip ID counter for aria-describedby attribute
// Each tooltip requires a unique client side ID
let NEXTID = 1
/* istanbul ignore next */
const generateId = name => `__BV_${name}_${NEXTID++}__`

/*
 * ToolTip class definition
 */
class ToolTip {
  // Main constructor
  constructor(element, config, $root) {
    // New tooltip object
    this.$isEnabled = true
    this.$fadeTimeout = null
    this.$hoverTimeout = null
    this.$visibleInterval = null
    this.$hoverState = ''
    this.$activeTrigger = {}
    this.$popper = null
    this.$element = element
    this.$tip = null
    this.$id = generateId(this.constructor.NAME)
    this.$root = $root || null
    this.$routeWatcher = null
    // We use a bound version of the following handlers for root/modal
    // listeners to maintain the 'this' context
    this.$forceHide = this.forceHide.bind(this)
    this.$doHide = this.doHide.bind(this)
    this.$doShow = this.doShow.bind(this)
    this.$doDisable = this.doDisable.bind(this)
    this.$doEnable = this.doEnable.bind(this)
    this._noop = noop.bind(this)
    // Set the configuration
    this.updateConfig(config)
  }

  // NOTE: Overridden by PopOver class
  static get Default() {
    return Defaults
  }

  // NOTE: Overridden by PopOver class
  static get NAME() {
    return NAME
  }

  // Update config
  updateConfig(config) {
    // Merge config into defaults. We use "this" here because PopOver overrides Default
    let updatedConfig = { ...this.constructor.Default, ...config }

    // Sanitize delay
    if (config.delay && typeof config.delay === 'number') {
      /* istanbul ignore next */
      updatedConfig.delay = {
        show: config.delay,
        hide: config.delay
      }
    }

    // Title for tooltip and popover
    if (config.title && typeof config.title === 'number') {
      /* istanbul ignore next */
      updatedConfig.title = config.title.toString()
    }

    // Content only for popover
    if (config.content && typeof config.content === 'number') {
      /* istanbul ignore next */
      updatedConfig.content = config.content.toString()
    }

    // Hide element original title if needed
    this.fixTitle()
    // Update the config
    this.$config = updatedConfig
    // Stop/Restart listening
    this.unListen()
    this.listen()
  }

  // Destroy this instance
  destroy() {
    // Stop listening to trigger events
    this.unListen()
    // Disable while open listeners/watchers
    this.setWhileOpenListeners(false)
    // Clear any timeouts
    clearTimeout(this.$hoverTimeout)
    this.$hoverTimeout = null
    clearTimeout(this.$fadeTimeout)
    this.$fadeTimeout = null
    // Remove popper
    if (this.$popper) {
      this.$popper.destroy()
    }
    this.$popper = null
    // Remove tip from document
    if (this.$tip && this.$tip.parentElement) {
      this.$tip.parentElement.removeChild(this.$tip)
    }
    this.$tip = null
    // Null out other properties
    this.$id = null
    this.$isEnabled = null
    this.$root = null
    this.$element = null
    this.$config = null
    this.$hoverState = null
    this.$activeTrigger = null
    this.$forceHide = null
    this.$doHide = null
    this.$doShow = null
    this.$doDisable = null
    this.$doEnable = null
  }

  enable() {
    // Create a non-cancelable BvEvent
    const enabledEvt = new BvEvent('enabled', {
      cancelable: false,
      target: this.$element,
      relatedTarget: null
    })
    this.$isEnabled = true
    this.emitEvent(enabledEvt)
  }

  disable() {
    // Create a non-cancelable BvEvent
    const disabledEvt = new BvEvent('disabled', {
      cancelable: false,
      target: this.$element,
      relatedTarget: null
    })
    this.$isEnabled = false
    this.emitEvent(disabledEvt)
  }

  // Click toggler
  toggle(event) {
    if (!this.$isEnabled) {
      /* istanbul ignore next */
      return
    }
    /* istanbul ignore else */
    if (event) {
      this.$activeTrigger.click = !this.$activeTrigger.click

      if (this.isWithActiveTrigger()) {
        this.enter(null)
      } else {
        this.leave(null)
      }
    } else {
      if (hasClass(this.getTipElement(), ClassName.SHOW)) {
        this.leave(null)
      } else {
        this.enter(null)
      }
    }
  }

  // Show tooltip
  show() {
    if (!document.body.contains(this.$element) || !isVisible(this.$element)) {
      // If trigger element isn't in the DOM or is not visible
      return
    }
    // Build tooltip element (also sets this.$tip)
    const tip = this.getTipElement()
    this.fixTitle()
    this.setContent(tip)
    if (!this.isWithContent(tip)) {
      // If no content, don't bother showing
      /* istanbul ignore next */
      this.$tip = null
      /* istanbul ignore next */
      return
    }

    // Set ID on tip and aria-describedby on element
    setAttr(tip, 'id', this.$id)
    this.addAriaDescribedby()

    // Set animation on or off
    if (this.$config.animation) {
      addClass(tip, ClassName.FADE)
    } else {
      removeClass(tip, ClassName.FADE)
    }

    const placement = this.getPlacement()
    const attachment = this.constructor.getAttachment(placement)
    this.addAttachmentClass(attachment)

    // Create a cancelable BvEvent
    const showEvt = new BvEvent('show', {
      cancelable: true,
      target: this.$element,
      relatedTarget: tip
    })
    this.emitEvent(showEvt)
    if (showEvt.defaultPrevented) {
      // Don't show if event cancelled
      this.$tip = null
      return
    }

    // Insert tooltip if needed
    const container = this.getContainer()
    if (!document.body.contains(tip)) {
      container.appendChild(tip)
    }

    // Refresh popper
    this.removePopper()
    this.$popper = new Popper(this.$element, tip, this.getPopperConfig(placement, tip))

    // Transitionend callback
    const complete = () => {
      if (this.$config.animation) {
        this.fixTransition(tip)
      }
      const prevHoverState = this.$hoverState
      this.$hoverState = null
      if (prevHoverState === HoverState.OUT) {
        this.leave(null)
      }
      // Create a non-cancelable BvEvent
      const shownEvt = new BvEvent('shown', {
        cancelable: false,
        target: this.$element,
        relatedTarget: tip
      })
      this.emitEvent(shownEvt)
    }

    // Enable while open listeners/watchers
    this.setWhileOpenListeners(true)

    // Show tip
    addClass(tip, ClassName.SHOW)

    // Start the transition/animation
    this.transitionOnce(tip, complete)
  }

  // Handler for periodic visibility check
  visibleCheck(on) {
    clearInterval(this.$visibleInterval)
    this.$visibleInterval = null
    if (on) {
      this.$visibleInterval = setInterval(() => {
        const tip = this.$tip
        if (tip && !isVisible(this.$element) && hasClass(tip, ClassName.SHOW)) {
          // Element is no longer visible, so force-hide the tooltip
          this.forceHide()
        }
      }, 100)
    }
  }

  setWhileOpenListeners(on) {
    // Modal close events
    this.setModalListener(on)
    // Periodic $element visibility check
    // For handling when tip is in <keepalive>, tabs, carousel, etc
    this.visibleCheck(on)
    // Route change events
    this.setRouteWatcher(on)
    // On-touch start listeners
    this.setOnTouchStartListener(on)
    if (on && /(focus|blur)/.test(this.$config.trigger)) {
      // If focus moves between trigger element and tip container, don't close
      eventOn(this.$tip, 'focusout', this, EvtOpts)
    } else {
      eventOff(this.$tip, 'focusout', this, EvtOpts)
    }
  }

  // Force hide of tip (internal method)
  forceHide() {
    if (!this.$tip || !hasClass(this.$tip, ClassName.SHOW)) {
      /* istanbul ignore next */
      return
    }
    // Disable while open listeners/watchers
    this.setWhileOpenListeners(false)
    // Clear any hover enter/leave event
    clearTimeout(this.$hoverTimeout)
    this.$hoverTimeout = null
    this.$hoverState = ''
    // Hide the tip
    this.hide(null, true)
  }

  // Hide tooltip
  hide(callback, force) {
    const tip = this.$tip
    if (!tip) {
      /* istanbul ignore next */
      return
    }

    // Create a cancelable BvEvent
    const hideEvt = new BvEvent('hide', {
      // We disable cancelling if force is true
      cancelable: !force,
      target: this.$element,
      relatedTarget: tip
    })
    this.emitEvent(hideEvt)
    if (hideEvt.defaultPrevented) {
      // Don't hide if event cancelled
      return
    }

    // Transitionend callback
    const complete = () => {
      if (this.$hoverState !== HoverState.SHOW && tip.parentNode) {
        // Remove tip from DOM, and force recompile on next show
        tip.parentNode.removeChild(tip)
        this.removeAriaDescribedby()
        this.removePopper()
        this.$tip = null
      }
      if (callback) {
        callback()
      }
      // Create a non-cancelable BvEvent
      const hiddenEvt = new BvEvent('hidden', {
        cancelable: false,
        target: this.$element,
        relatedTarget: null
      })
      this.emitEvent(hiddenEvt)
    }

    // Disable while open listeners/watchers
    this.setWhileOpenListeners(false)

    // If forced close, disable animation
    if (force) {
      removeClass(tip, ClassName.FADE)
    }
    // Hide tip
    removeClass(tip, ClassName.SHOW)

    this.$activeTrigger.click = false
    this.$activeTrigger.focus = false
    this.$activeTrigger.hover = false

    // Start the hide transition
    this.transitionOnce(tip, complete)

    this.$hoverState = ''
  }

  emitEvent(evt) {
    const evtName = evt.type
    if (this.$root && this.$root.$emit) {
      // Emit an event on $root
      this.$root.$emit(`bv::${this.constructor.NAME}::${evtName}`, evt)
    }
    const callbacks = this.$config.callbacks || {}
    if (typeof callbacks[evtName] === 'function') {
      callbacks[evtName](evt)
    }
  }

  getContainer() {
    const container = this.$config.container
    const body = document.body
    // If we are in a modal, we append to the modal instead of body,
    // unless a container is specified
    return container === false
      ? closest(MODAL_CLASS, this.$element) || body
      : select(container, body) || body
  }

  // Will be overridden by PopOver if needed
  addAriaDescribedby() {
    // Add aria-describedby on trigger element, without removing any other IDs
    let desc = getAttr(this.$element, 'aria-describedby') || ''
    desc = desc
      .split(/\s+/)
      .concat(this.$id)
      .join(' ')
      .trim()
    setAttr(this.$element, 'aria-describedby', desc)
  }

  // Will be overridden by PopOver if needed
  removeAriaDescribedby() {
    let desc = getAttr(this.$element, 'aria-describedby') || ''
    desc = desc
      .split(/\s+/)
      .filter(d => d !== this.$id)
      .join(' ')
      .trim()
    if (desc) {
      /* istanbul ignore next */
      setAttr(this.$element, 'aria-describedby', desc)
    } else {
      removeAttr(this.$element, 'aria-describedby')
    }
  }

  removePopper() {
    if (this.$popper) {
      this.$popper.destroy()
    }
    this.$popper = null
  }

  transitionOnce(tip, complete) {
    const transEvents = this.getTransitionEndEvents()
    let called = false
    clearTimeout(this.$fadeTimeout)
    this.$fadeTimeout = null
    const fnOnce = () => {
      if (called) {
        /* istanbul ignore next */
        return
      }
      called = true
      clearTimeout(this.$fadeTimeout)
      this.$fadeTimeout = null
      transEvents.forEach(evtName => {
        eventOff(tip, evtName, fnOnce, EvtOpts)
      })
      // Call complete callback
      complete()
    }
    if (hasClass(tip, ClassName.FADE)) {
      transEvents.forEach(evtName => {
        eventOn(tip, evtName, fnOnce, EvtOpts)
      })
      // Fallback to setTimeout()
      this.$fadeTimeout = setTimeout(fnOnce, TRANSITION_DURATION)
    } else {
      fnOnce()
    }
  }

  // What transitionend event(s) to use? (returns array of event names)
  getTransitionEndEvents() {
    for (const name in TransitionEndEvents) {
      if (this.$element.style[name] !== undefined) {
        return TransitionEndEvents[name]
      }
    }
    // Fallback
    /* istanbul ignore next */
    return []
  }

  /* istanbul ignore next */
  update() {
    if (this.$popper !== null) {
      this.$popper.scheduleUpdate()
    }
  }

  // NOTE: Overridden by PopOver class
  isWithContent(tip) {
    tip = tip || this.$tip
    if (!tip) {
      /* istanbul ignore next */
      return false
    }
    return Boolean((select(Selector.TOOLTIP_INNER, tip) || {}).innerHTML)
  }

  // NOTE: Overridden by PopOver class
  addAttachmentClass(attachment) {
    addClass(this.getTipElement(), `${CLASS_PREFIX}-${attachment}`)
  }

  getTipElement() {
    if (!this.$tip) {
      // Try and compile user supplied template, or fallback to default template
      this.$tip =
        this.compileTemplate(this.$config.template) ||
        this.compileTemplate(this.constructor.Default.template)
    }
    // Add tab index so tip can be focused, and to allow it to be
    // set as relatedTarget in focusin/out events
    this.$tip.tabIndex = -1
    return this.$tip
  }

  compileTemplate(html) {
    if (!html || typeof html !== 'string') {
      /* istanbul ignore next */
      return null
    }
    let div = document.createElement('div')
    div.innerHTML = html.trim()
    const node = div.firstElementChild ? div.removeChild(div.firstElementChild) : null
    div = null
    return node
  }

  // NOTE: Overridden by PopOver class
  setContent(tip) {
    this.setElementContent(select(Selector.TOOLTIP_INNER, tip), this.getTitle())
    removeClass(tip, ClassName.FADE)
    removeClass(tip, ClassName.SHOW)
  }

  setElementContent(container, content) {
    if (!container) {
      // If container element doesn't exist, just return
      /* istanbul ignore next */
      return
    }
    const allowHtml = this.$config.html
    if (typeof content === 'object' && content.nodeType) {
      // Content is a DOM node
      if (allowHtml) {
        if (content.parentElement !== container) {
          container.innerHTML = ''
          container.appendChild(content)
        }
      } else {
        /* istanbul ignore next */
        container.innerText = content.innerText
      }
    } else {
      // We have a plain HTML string or Text
      container[allowHtml ? 'innerHTML' : 'innerText'] = content
    }
  }

  // NOTE: Overridden by PopOver class
  getTitle() {
    let title = this.$config.title || ''
    if (typeof title === 'function') {
      // Call the function to get the title value
      /* istanbul ignore next */
      title = title(this.$element)
    }
    if (typeof title === 'object' && title.nodeType && !title.innerHTML.trim()) {
      // We have a DOM node, but without inner content,
      // so just return empty string
      /* istanbul ignore next */
      title = ''
    }
    if (typeof title === 'string') {
      title = title.trim()
    }
    if (!title) {
      // If an explicit title is not given, try element's title attributes
      title = getAttr(this.$element, 'title') || getAttr(this.$element, 'data-original-title') || ''
      title = title.trim()
    }

    return title
  }

  static getAttachment(placement) {
    return AttachmentMap[placement.toUpperCase()]
  }

  listen() {
    const triggers = this.$config.trigger.trim().split(/\s+/)
    const el = this.$element

    // Listen for global show/hide events
    this.setRootListener(true)

    // Using 'this' as the handler will get automatically directed to
    // this.handleEvent and maintain our binding to 'this'
    triggers.forEach(trigger => {
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
  }

  unListen() {
    const events = ['click', 'focusin', 'focusout', 'mouseenter', 'mouseleave']
    // Using "this" as the handler will get automatically directed to this.handleEvent
    events.forEach(evt => {
      eventOff(this.$element, evt, this, EvtOpts)
    }, this)

    // Stop listening for global show/hide/enable/disable events
    this.setRootListener(false)
  }

  handleEvent(e) {
    // This special method allows us to use "this" as the event handlers
    if (isDisabled(this.$element)) {
      // If disabled, don't do anything. Note: If tip is shown before element gets
      // disabled, then tip not close until no longer disabled or forcefully closed.
      /* istanbul ignore next */
      return
    }
    if (!this.$isEnabled) {
      // If not enable
      return
    }
    const type = e.type
    const target = e.target
    const relatedTarget = e.relatedTarget
    const $element = this.$element
    const $tip = this.$tip
    if (type === 'click') {
      this.toggle(e)
    } else if (type === 'focusin' || type === 'mouseenter') {
      this.enter(e)
    } else if (type === 'focusout') {
      // target is the element which is loosing focus
      // and relatedTarget is the element gaining focus
      if ($tip && $element && $element.contains(target) && $tip.contains(relatedTarget)) {
        // If focus moves from $element to $tip, don't trigger a leave
        /* istanbul ignore next */
        return
      }
      if ($tip && $element && $tip.contains(target) && $element.contains(relatedTarget)) {
        // If focus moves from $tip to $element, don't trigger a leave
        /* istanbul ignore next */
        return
      }
      /* istanbul ignore next: dificult to test */
      if ($tip && $tip.contains(target) && $tip.contains(relatedTarget)) {
        // If focus moves within $tip, don't trigger a leave
        return
      }
      /* istanbul ignore next: dificult to test */
      if ($element && $element.contains(target) && $element.contains(relatedTarget)) {
        // If focus moves within $element, don't trigger a leave
        return
      }
      // Otherwise trigger a leave
      this.leave(e)
    } else if (type === 'mouseleave') {
      this.leave(e)
    }
  }

  /* istanbul ignore next */
  setRouteWatcher(on) {
    if (on) {
      this.setRouteWatcher(false)
      if (this.$root && Boolean(this.$root.$route)) {
        this.$routeWatcher = this.$root.$watch('$route', (newVal, oldVal) => {
          if (newVal === oldVal) {
            return
          }
          // If route has changed, we force hide the tooltip/popover
          this.forceHide()
        })
      }
    } else {
      if (this.$routeWatcher) {
        // Cancel the route watcher by calling the stored reference
        this.$routeWatcher()
        this.$routeWatcher = null
      }
    }
  }

  /* istanbul ignore next */
  setModalListener(on) {
    const modal = closest(MODAL_CLASS, this.$element)
    if (!modal) {
      // If we are not in a modal, don't worry. be happy
      return
    }
    // We can listen for modal hidden events on $root
    if (this.$root) {
      this.$root[on ? '$on' : '$off'](MODAL_CLOSE_EVENT, this.$forceHide)
    }
  }

  setRootListener(on) {
    // Listen for global 'bv::{hide|show}::{tooltip|popover}' hide request event
    if (this.$root) {
      this.$root[on ? '$on' : '$off'](`bv::hide::${this.constructor.NAME}`, this.$doHide)
      this.$root[on ? '$on' : '$off'](`bv::show::${this.constructor.NAME}`, this.$doShow)
      this.$root[on ? '$on' : '$off'](`bv::disable::${this.constructor.NAME}`, this.$doDisable)
      this.$root[on ? '$on' : '$off'](`bv::enable::${this.constructor.NAME}`, this.$doEnable)
    }
  }

  doHide(id) {
    // Programmatically hide tooltip or popover
    if (!id) {
      // Close all tooltips or popovers
      this.forceHide()
    } else if (this.$element && this.$element.id && this.$element.id === id) {
      // Close this specific tooltip or popover
      this.hide()
    }
  }

  doShow(id) {
    // Programmatically show tooltip or popover
    if (!id) {
      // Open all tooltips or popovers
      this.show()
    } else if (id && this.$element && this.$element.id && this.$element.id === id) {
      // Show this specific tooltip or popover
      this.show()
    }
  }

  doDisable(id) {
    // Programmatically disable tooltip or popover
    if (!id) {
      // Disable all tooltips or popovers
      this.disable()
    } else if (this.$element && this.$element.id && this.$element.id === id) {
      // Disable this specific tooltip or popover
      this.disable()
    }
  }

  doEnable(id) {
    // Programmatically enable tooltip or popover
    if (!id) {
      // Enable all tooltips or popovers
      this.enable()
    } else if (this.$element && this.$element.id && this.$element.id === id) {
      // Enable this specific tooltip or popover
      this.enable()
    }
  }

  setOnTouchStartListener(on) {
    // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children
    // Only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
    if ('ontouchstart' in document.documentElement) {
      /* istanbul ignore next: JSDOM does not support 'ontouchstart' event */
      arrayFrom(document.body.children).forEach(el => {
        if (on) {
          eventOn(el, 'mouseover', this._noop)
        } else {
          eventOff(el, 'mouseover', this._noop)
        }
      })
    }
  }

  fixTitle() {
    const el = this.$element
    const titleType = typeof getAttr(el, 'data-original-title')
    if (getAttr(el, 'title') || titleType !== 'string') {
      setAttr(el, 'data-original-title', getAttr(el, 'title') || '')
      setAttr(el, 'title', '')
    }
  }

  // Enter handler
  enter(e) {
    if (e) {
      this.$activeTrigger[e.type === 'focusin' ? 'focus' : 'hover'] = true
    }
    if (hasClass(this.getTipElement(), ClassName.SHOW) || this.$hoverState === HoverState.SHOW) {
      this.$hoverState = HoverState.SHOW
      return
    }
    clearTimeout(this.$hoverTimeout)
    this.$hoverState = HoverState.SHOW
    if (!this.$config.delay || !this.$config.delay.show) {
      this.show()
      return
    }
    this.$hoverTimeout = setTimeout(() => {
      if (this.$hoverState === HoverState.SHOW) {
        this.show()
      }
    }, this.$config.delay.show)
  }

  // Leave handler
  leave(e) {
    if (e) {
      this.$activeTrigger[e.type === 'focusout' ? 'focus' : 'hover'] = false
      if (e.type === 'focusout' && /blur/.test(this.$config.trigger)) {
        // Special case for `blur`: we clear out the other triggers
        this.$activeTrigger.click = false
        this.$activeTrigger.hover = false
      }
    }
    if (this.isWithActiveTrigger()) {
      return
    }
    clearTimeout(this.$hoverTimeout)
    this.$hoverState = HoverState.OUT
    if (!this.$config.delay || !this.$config.delay.hide) {
      this.hide()
      return
    }
    this.$hoverTimeout = setTimeout(() => {
      if (this.$hoverState === HoverState.OUT) {
        this.hide()
      }
    }, this.$config.delay.hide)
  }

  getPopperConfig(placement, tip) {
    return {
      placement: this.constructor.getAttachment(placement),
      modifiers: {
        offset: { offset: this.getOffset(placement, tip) },
        flip: { behavior: this.$config.fallbackPlacement },
        arrow: { element: '.arrow' },
        preventOverflow: {
          padding: this.$config.boundaryPadding,
          boundariesElement: this.$config.boundary
        }
      },
      onCreate: data => {
        // Handle flipping arrow classes
        /* istanbul ignore next */
        if (data.originalPlacement !== data.placement) {
          this.handlePopperPlacementChange(data)
        }
      },
      onUpdate: data => {
        // Handle flipping arrow classes
        /* istanbul ignore next */
        this.handlePopperPlacementChange(data)
      }
    }
  }

  /* istanbul ignore next */
  getOffset(placement, tip) {
    if (!this.$config.offset) {
      const arrow = select(Selector.ARROW, tip)
      const arrowOffset = parseFloat(getCS(arrow).width) + parseFloat(this.$config.arrowPadding)
      switch (OffsetMap[placement.toUpperCase()]) {
        case +1:
          return `+50%p - ${arrowOffset}px`
        case -1:
          return `-50%p + ${arrowOffset}px`
        default:
          return 0
      }
    }
    return this.$config.offset
  }

  getPlacement() {
    const placement = this.$config.placement
    if (typeof placement === 'function') {
      /* istanbul ignore next */
      return placement.call(this, this.$tip, this.$element)
    }
    return placement
  }

  isWithActiveTrigger() {
    for (const trigger in this.$activeTrigger) {
      if (this.$activeTrigger[trigger]) {
        return true
      }
    }
    return false
  }

  // NOTE: Overridden by PopOver class
  /* istanbul ignore next */
  cleanTipClass() {
    const tip = this.getTipElement()
    const tabClass = tip.className.match(BS_CLASS_PREFIX_REGEX)
    if (tabClass !== null && tabClass.length > 0) {
      tabClass.forEach(cls => {
        removeClass(tip, cls)
      })
    }
  }

  /* istanbul ignore next */
  handlePopperPlacementChange(data) {
    this.cleanTipClass()
    this.addAttachmentClass(this.constructor.getAttachment(data.placement))
  }

  /* istanbul ignore next */
  fixTransition(tip) {
    const initConfigAnimation = this.$config.animation || false
    if (getAttr(tip, 'x-placement') !== null) {
      return
    }
    removeClass(tip, ClassName.FADE)
    this.$config.animation = false
    this.hide()
    this.show()
    this.$config.animation = initConfigAnimation
  }
}

export default ToolTip
