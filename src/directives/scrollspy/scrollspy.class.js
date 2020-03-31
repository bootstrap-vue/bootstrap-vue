/*
 * ScrollSpy class definition
 */

import observeDom from '../../utils/observe-dom'
import {
  addClass,
  closest,
  getAttr,
  getBCR,
  hasClass,
  isElement,
  isVisible,
  matches,
  offset,
  position,
  removeClass,
  select,
  selectAll
} from '../../utils/dom'
import { EVENT_OPTIONS_NO_CAPTURE, eventOn, eventOff } from '../../utils/events'
import { isString, isUndefined } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { toString as objectToString } from '../../utils/object'
import { warn } from '../../utils/warn'

/*
 * Constants / Defaults
 */

const NAME = 'v-b-scrollspy'
const ACTIVATE_EVENT = 'bv::scrollspy::activate'

const Default = {
  element: 'body',
  offset: 10,
  method: 'auto',
  throttle: 75
}

const DefaultType = {
  element: '(string|element|component)',
  offset: 'number',
  method: 'string',
  throttle: 'number'
}

const ClassName = {
  DROPDOWN_ITEM: 'dropdown-item',
  ACTIVE: 'active'
}

const Selector = {
  ACTIVE: '.active',
  NAV_LIST_GROUP: '.nav, .list-group',
  NAV_LINKS: '.nav-link',
  NAV_ITEMS: '.nav-item',
  LIST_ITEMS: '.list-group-item',
  DROPDOWN: '.dropdown, .dropup',
  DROPDOWN_ITEMS: '.dropdown-item',
  DROPDOWN_TOGGLE: '.dropdown-toggle'
}

const OffsetMethod = {
  OFFSET: 'offset',
  POSITION: 'position'
}

// HREFs must end with a hash followed by at least one non-hash character.
// HREFs in the links are assumed to point to non-external links.
// Comparison to the current page base URL is not performed!
const HREF_REGEX = /^.*(#[^#]+)$/

// Transition Events
const TransitionEndEvents = [
  'webkitTransitionEnd',
  'transitionend',
  'otransitionend',
  'oTransitionEnd'
]

/*
 * Utility Methods
 */

// Better var type detection
const toType = obj => /* istanbul ignore next: not easy to test */ {
  return objectToString(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

// Check config properties for expected types
const typeCheckConfig = (
  componentName,
  config,
  configTypes
) => /* istanbul ignore next: not easy to test */ {
  for (const property in configTypes) {
    if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
      const expectedTypes = configTypes[property]
      const value = config[property]
      let valueType = value && isElement(value) ? 'element' : toType(value)
      // handle Vue instances
      valueType = value && value._isVue ? 'component' : valueType

      if (!new RegExp(expectedTypes).test(valueType)) {
        /* istanbul ignore next */
        warn(
          `${componentName}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}"`
        )
      }
    }
  }
}

/*
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

/* istanbul ignore next: not easy to test */
class ScrollSpy /* istanbul ignore next: not easy to test */ {
  constructor(element, config, $root) {
    // The element we activate links in
    this.$el = element
    this.$scroller = null
    this.$selector = [Selector.NAV_LINKS, Selector.LIST_ITEMS, Selector.DROPDOWN_ITEMS].join(',')
    this.$offsets = []
    this.$targets = []
    this.$activeTarget = null
    this.$scrollHeight = 0
    this.$resizeTimeout = null
    this.$obs_scroller = null
    this.$obs_targets = null
    this.$root = $root || null
    this.$config = null

    this.updateConfig(config)
  }

  static get Name() {
    return NAME
  }

  static get Default() {
    return Default
  }

  static get DefaultType() {
    return DefaultType
  }

  updateConfig(config, $root) {
    if (this.$scroller) {
      // Just in case out scroll element has changed
      this.unlisten()
      this.$scroller = null
    }
    const cfg = { ...this.constructor.Default, ...config }
    if ($root) {
      this.$root = $root
    }
    typeCheckConfig(this.constructor.Name, cfg, this.constructor.DefaultType)
    this.$config = cfg

    if (this.$root) {
      const self = this
      this.$root.$nextTick(() => {
        self.listen()
      })
    } else {
      this.listen()
    }
  }

  dispose() {
    this.unlisten()
    clearTimeout(this.$resizeTimeout)
    this.$resizeTimeout = null
    this.$el = null
    this.$config = null
    this.$scroller = null
    this.$selector = null
    this.$offsets = null
    this.$targets = null
    this.$activeTarget = null
    this.$scrollHeight = null
  }

  listen() {
    const scroller = this.getScroller()
    if (scroller && scroller.tagName !== 'BODY') {
      eventOn(scroller, 'scroll', this, EVENT_OPTIONS_NO_CAPTURE)
    }
    eventOn(window, 'scroll', this, EVENT_OPTIONS_NO_CAPTURE)
    eventOn(window, 'resize', this, EVENT_OPTIONS_NO_CAPTURE)
    eventOn(window, 'orientationchange', this, EVENT_OPTIONS_NO_CAPTURE)
    TransitionEndEvents.forEach(evtName => {
      eventOn(window, evtName, this, EVENT_OPTIONS_NO_CAPTURE)
    })
    this.setObservers(true)
    // Schedule a refresh
    this.handleEvent('refresh')
  }

  unlisten() {
    const scroller = this.getScroller()
    this.setObservers(false)
    if (scroller && scroller.tagName !== 'BODY') {
      eventOff(scroller, 'scroll', this, EVENT_OPTIONS_NO_CAPTURE)
    }
    eventOff(window, 'scroll', this, EVENT_OPTIONS_NO_CAPTURE)
    eventOff(window, 'resize', this, EVENT_OPTIONS_NO_CAPTURE)
    eventOff(window, 'orientationchange', this, EVENT_OPTIONS_NO_CAPTURE)
    TransitionEndEvents.forEach(evtName => {
      eventOff(window, evtName, this, EVENT_OPTIONS_NO_CAPTURE)
    })
  }

  setObservers(on) {
    // We observe both the scroller for content changes, and the target links
    if (this.$obs_scroller) {
      this.$obs_scroller.disconnect()
      this.$obs_scroller = null
    }
    if (this.$obs_targets) {
      this.$obs_targets.disconnect()
      this.$obs_targets = null
    }
    if (on) {
      this.$obs_targets = observeDom(
        this.$el,
        () => {
          this.handleEvent('mutation')
        },
        {
          subtree: true,
          childList: true,
          attributes: true,
          attributeFilter: ['href']
        }
      )
      this.$obs_scroller = observeDom(
        this.getScroller(),
        () => {
          this.handleEvent('mutation')
        },
        {
          subtree: true,
          childList: true,
          characterData: true,
          attributes: true,
          attributeFilter: ['id', 'style', 'class']
        }
      )
    }
  }

  // General event handler
  handleEvent(evt) {
    const type = isString(evt) ? evt : evt.type

    const self = this
    const resizeThrottle = () => {
      if (!self.$resizeTimeout) {
        self.$resizeTimeout = setTimeout(() => {
          self.refresh()
          self.process()
          self.$resizeTimeout = null
        }, self.$config.throttle)
      }
    }

    if (type === 'scroll') {
      if (!this.$obs_scroller) {
        // Just in case we are added to the DOM before the scroll target is
        // We re-instantiate our listeners, just in case
        this.listen()
      }
      this.process()
    } else if (/(resize|orientationchange|mutation|refresh)/.test(type)) {
      // Postpone these events by throttle time
      resizeThrottle()
    }
  }

  // Refresh the list of target links on the element we are applied to
  refresh() {
    const scroller = this.getScroller()
    if (!scroller) {
      return
    }
    const autoMethod = scroller !== scroller.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET
    const method = this.$config.method === 'auto' ? autoMethod : this.$config.method
    const methodFn = method === OffsetMethod.POSITION ? position : offset
    const offsetBase = method === OffsetMethod.POSITION ? this.getScrollTop() : 0

    this.$offsets = []
    this.$targets = []

    this.$scrollHeight = this.getScrollHeight()

    // Find all the unique link HREFs that we will control
    selectAll(this.$selector, this.$el)
      // Get HREF value
      .map(link => getAttr(link, 'href'))
      // Filter out HREFs that do not match our RegExp
      .filter(href => href && HREF_REGEX.test(href || ''))
      // Find all elements with ID that match HREF hash
      .map(href => {
        // Convert HREF into an ID (including # at beginning)
        const id = href.replace(HREF_REGEX, '$1').trim()
        if (!id) {
          return null
        }
        // Find the element with the ID specified by id
        const el = select(id, scroller)
        if (el && isVisible(el)) {
          return {
            offset: toInteger(methodFn(el).top, 0) + offsetBase,
            target: id
          }
        }
        return null
      })
      .filter(Boolean)
      // Sort them by their offsets (smallest first)
      .sort((a, b) => a.offset - b.offset)
      // record only unique targets/offsets
      .reduce((memo, item) => {
        if (!memo[item.target]) {
          this.$offsets.push(item.offset)
          this.$targets.push(item.target)
          memo[item.target] = true
        }
        return memo
      }, {})

    // Return this for easy chaining
    return this
  }

  // Handle activating/clearing
  process() {
    const scrollTop = this.getScrollTop() + this.$config.offset
    const scrollHeight = this.getScrollHeight()
    const maxScroll = this.$config.offset + scrollHeight - this.getOffsetHeight()

    if (this.$scrollHeight !== scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      const target = this.$targets[this.$targets.length - 1]
      if (this.$activeTarget !== target) {
        this.activate(target)
      }
      return
    }

    if (this.$activeTarget && scrollTop < this.$offsets[0] && this.$offsets[0] > 0) {
      this.$activeTarget = null
      this.clear()
      return
    }

    for (let i = this.$offsets.length; i--; ) {
      const isActiveTarget =
        this.$activeTarget !== this.$targets[i] &&
        scrollTop >= this.$offsets[i] &&
        (isUndefined(this.$offsets[i + 1]) || scrollTop < this.$offsets[i + 1])

      if (isActiveTarget) {
        this.activate(this.$targets[i])
      }
    }
  }

  getScroller() {
    if (this.$scroller) {
      return this.$scroller
    }
    let scroller = this.$config.element
    if (!scroller) {
      return null
    } else if (isElement(scroller.$el)) {
      scroller = scroller.$el
    } else if (isString(scroller)) {
      scroller = select(scroller)
    }
    if (!scroller) {
      return null
    }
    this.$scroller = scroller.tagName === 'BODY' ? window : scroller
    return this.$scroller
  }

  getScrollTop() {
    const scroller = this.getScroller()
    return scroller === window ? scroller.pageYOffset : scroller.scrollTop
  }

  getScrollHeight() {
    return (
      this.getScroller().scrollHeight ||
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    )
  }

  getOffsetHeight() {
    const scroller = this.getScroller()
    return scroller === window ? window.innerHeight : getBCR(scroller).height
  }

  activate(target) {
    this.$activeTarget = target
    this.clear()

    // Grab the list of target links (<a href="{$target}">)
    const links = selectAll(
      this.$selector
        // Split out the base selectors
        .split(',')
        // Map to a selector that matches links with HREF ending in the ID (including '#')
        .map(selector => `${selector}[href$="${target}"]`)
        // Join back into a single selector string
        .join(','),
      this.$el
    )

    links.forEach(link => {
      if (hasClass(link, ClassName.DROPDOWN_ITEM)) {
        // This is a dropdown item, so find the .dropdown-toggle and set its state
        const dropdown = closest(Selector.DROPDOWN, link)
        if (dropdown) {
          this.setActiveState(select(Selector.DROPDOWN_TOGGLE, dropdown), true)
        }
        // Also set this link's state
        this.setActiveState(link, true)
      } else {
        // Set triggered link as active
        this.setActiveState(link, true)
        if (matches(link.parentElement, Selector.NAV_ITEMS)) {
          // Handle nav-link inside nav-item, and set nav-item active
          this.setActiveState(link.parentElement, true)
        }
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        let el = link
        while (el) {
          el = closest(Selector.NAV_LIST_GROUP, el)
          const sibling = el ? el.previousElementSibling : null
          if (sibling && matches(sibling, `${Selector.NAV_LINKS}, ${Selector.LIST_ITEMS}`)) {
            this.setActiveState(sibling, true)
          }
          // Handle special case where nav-link is inside a nav-item
          if (sibling && matches(sibling, Selector.NAV_ITEMS)) {
            this.setActiveState(select(Selector.NAV_LINKS, sibling), true)
            // Add active state to nav-item as well
            this.setActiveState(sibling, true)
          }
        }
      }
    })

    // Signal event to via $root, passing ID of activated target and reference to array of links
    if (links && links.length > 0 && this.$root) {
      this.$root.$emit(ACTIVATE_EVENT, target, links)
    }
  }

  clear() {
    selectAll(`${this.$selector}, ${Selector.NAV_ITEMS}`, this.$el)
      .filter(el => hasClass(el, ClassName.ACTIVE))
      .forEach(el => this.setActiveState(el, false))
  }

  setActiveState(el, active) {
    if (!el) {
      return
    }
    if (active) {
      addClass(el, ClassName.ACTIVE)
    } else {
      removeClass(el, ClassName.ACTIVE)
    }
  }
}

export default ScrollSpy
