import Vue from '../../utils/vue'
import KeyCodes from '../../utils/key-codes'
import noop from '../../utils/noop'
import observeDom from '../../utils/observe-dom'
import { getComponentConfig } from '../../utils/config'
import {
  selectAll,
  reflow,
  addClass,
  removeClass,
  setAttr,
  eventOn,
  eventOff
} from '../../utils/dom'
import { isBrowser, hasTouchSupport, hasPointerEventSupport } from '../../utils/env'
import { isUndefined } from '../../utils/inspect'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

const NAME = 'BCarousel'

// Slide directional classes
const DIRECTION = {
  next: {
    dirClass: 'carousel-item-left',
    overlayClass: 'carousel-item-next'
  },
  prev: {
    dirClass: 'carousel-item-right',
    overlayClass: 'carousel-item-prev'
  }
}

// Fallback Transition duration (with a little buffer) in ms
const TRANS_DURATION = 600 + 50

// Time for mouse compat events to fire after touch
const TOUCH_EVENT_COMPAT_WAIT = 500

// Number of pixels to consider touch move a swipe
const SWIPE_THRESHOLD = 40

// PointerEvent pointer types
const PointerType = {
  TOUCH: 'touch',
  PEN: 'pen'
}

// Transition Event names
const TransitionEndEvents = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend oTransitionEnd',
  transition: 'transitionend'
}

const EventOptions = { passive: true, capture: false }

// Return the browser specific transitionEnd event name
function getTransitionEndEvent(el) {
  for (const name in TransitionEndEvents) {
    if (!isUndefined(el.style[name])) {
      return TransitionEndEvents[name]
    }
  }
  // fallback
  /* istanbul ignore next */
  return null
}

// @vue/component
export const BCarousel = /*#__PURE__*/ Vue.extend({
  name: 'BCarousel',
  mixins: [idMixin, normalizeSlotMixin],
  provide() {
    return { bvCarousel: this }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    labelPrev: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelPrev')
    },
    labelNext: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelNext')
    },
    labelGotoSlide: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelGotoSlide')
    },
    labelIndicators: {
      type: String,
      default: () => getComponentConfig(NAME, 'labelIndicators')
    },
    interval: {
      type: Number,
      default: 5000
    },
    indicators: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: false
    },
    noAnimation: {
      // Disable slide/fade animation
      type: Boolean,
      default: false
    },
    fade: {
      // Enable cross-fade animation instead of slide animation
      type: Boolean,
      default: false
    },
    noTouch: {
      // Sniffed by carousel-slide
      type: Boolean,
      default: false
    },
    noHoverPause: {
      // Disable pause on hover
      type: Boolean,
      default: false
    },
    imgWidth: {
      // Sniffed by carousel-slide
      type: [Number, String]
      // default: undefined
    },
    imgHeight: {
      // Sniffed by carousel-slide
      type: [Number, String]
      // default: undefined
    },
    background: {
      type: String
      // default: undefined
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      index: this.value || 0,
      isSliding: false,
      transitionEndEvent: null,
      slides: [],
      direction: null,
      isPaused: !(parseInt(this.interval, 10) > 0),
      // Touch event handling values
      touchStartX: 0,
      touchDeltaX: 0
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setSlide(newVal)
      }
    },
    interval(newVal, oldVal) {
      if (newVal === oldVal) {
        /* istanbul ignore next */
        return
      }
      if (!newVal) {
        // Pausing slide show
        this.pause(false)
      } else {
        // Restarting or Changing interval
        this.pause(true)
        this.start(false)
      }
    },
    isPaused(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit(newVal ? 'paused' : 'unpaused')
      }
    },
    index(to, from) {
      if (to === from || this.isSliding) {
        /* istanbul ignore next */
        return
      }
      this.doSlide(to, from)
    }
  },
  created() {
    // Create private non-reactive props
    this._intervalId = null
    this._animationTimeout = null
    this._touchTimeout = null
    // Set initial paused state
    this.isPaused = !(parseInt(this.interval, 10) > 0)
  },
  mounted() {
    // Cache current browser transitionend event name
    this.transitionEndEvent = getTransitionEndEvent(this.$el) || null
    // Get all slides
    this.updateSlides()
    // Observe child changes so we can update slide list
    observeDom(this.$refs.inner, this.updateSlides.bind(this), {
      subtree: false,
      childList: true,
      attributes: true,
      attributeFilter: ['id']
    })
  },
  beforeDestroy() {
    clearTimeout(this._animationTimeout)
    clearTimeout(this._touchTimeout)
    clearInterval(this._intervalId)
    this._intervalId = null
    this._animationTimeout = null
    this._touchTimeout = null
  },
  methods: {
    // Set slide
    setSlide(slide, direction = null) {
      // Don't animate when page is not visible
      /* istanbul ignore if: difficult to test */
      if (isBrowser && document.visibilityState && document.hidden) {
        return
      }
      const len = this.slides.length
      // Don't do anything if nothing to slide to
      if (len === 0) {
        return
      }
      // Don't change slide while transitioning, wait until transition is done
      if (this.isSliding) {
        // Schedule slide after sliding complete
        this.$once('sliding-end', () => this.setSlide(slide, direction))
        return
      }
      this.direction = direction
      // Make sure we have an integer (you never know!)
      slide = Math.floor(slide)
      // Set new slide index. Wrap around if necessary
      this.index = slide >= len ? 0 : slide >= 0 ? slide : len - 1
    },
    // Previous slide
    prev() {
      this.setSlide(this.index - 1, 'prev')
    },
    // Next slide
    next() {
      this.setSlide(this.index + 1, 'next')
    },
    // Pause auto rotation
    pause(evt) {
      if (!evt) {
        this.isPaused = true
      }
      if (this._intervalId) {
        clearInterval(this._intervalId)
        this._intervalId = null
      }
    },
    // Start auto rotate slides
    start(evt) {
      if (!evt) {
        this.isPaused = false
      }
      /* istanbul ignore next: most likely will never happen, but just in case */
      if (this._intervalId) {
        clearInterval(this._intervalId)
        this._intervalId = null
      }
      // Don't start if no interval, or less than 2 slides
      if (this.interval && this.slides.length > 1) {
        this._intervalId = setInterval(this.next, Math.max(1000, this.interval))
      }
    },
    // Restart auto rotate slides when focus/hover leaves the carousel
    restart(evt) /* istanbul ignore next: difficult to test */ {
      if (!this.$el.contains(document.activeElement)) {
        this.start()
      }
    },
    doSlide(to, from) {
      const isCycling = Boolean(this.interval)
      // Determine sliding direction
      let direction = this.calcDirection(this.direction, from, to)
      const overlayClass = direction.overlayClass
      const dirClass = direction.dirClass
      // Determine current and next slides
      const currentSlide = this.slides[from]
      const nextSlide = this.slides[to]
      // Don't do anything if there aren't any slides to slide to
      if (!currentSlide || !nextSlide) {
        /* istanbul ignore next */
        return
      }
      // Start animating
      this.isSliding = true
      if (isCycling) {
        this.pause(false)
      }
      this.$emit('sliding-start', to)
      // Update v-model
      this.$emit('input', this.index)
      if (this.noAnimation) {
        addClass(nextSlide, 'active')
        removeClass(currentSlide, 'active')
        this.isSliding = false
        // Notify ourselves that we're done sliding (slid)
        this.$nextTick(() => this.$emit('sliding-end', to))
      } else {
        addClass(nextSlide, overlayClass)
        // Trigger a reflow of next slide
        reflow(nextSlide)
        addClass(currentSlide, dirClass)
        addClass(nextSlide, dirClass)
        // Transition End handler
        let called = false
        /* istanbul ignore next: difficult to test */
        const onceTransEnd = evt => {
          if (called) {
            return
          }
          called = true
          /* istanbul ignore if: transition events cant be tested in JSDOM */
          if (this.transitionEndEvent) {
            const events = this.transitionEndEvent.split(/\s+/)
            events.forEach(evt => eventOff(currentSlide, evt, onceTransEnd, EventOptions))
          }
          this._animationTimeout = null
          removeClass(nextSlide, dirClass)
          removeClass(nextSlide, overlayClass)
          addClass(nextSlide, 'active')
          removeClass(currentSlide, 'active')
          removeClass(currentSlide, dirClass)
          removeClass(currentSlide, overlayClass)
          setAttr(currentSlide, 'aria-current', 'false')
          setAttr(nextSlide, 'aria-current', 'true')
          setAttr(currentSlide, 'aria-hidden', 'true')
          setAttr(nextSlide, 'aria-hidden', 'false')
          this.isSliding = false
          this.direction = null
          // Notify ourselves that we're done sliding (slid)
          this.$nextTick(() => this.$emit('sliding-end', to))
        }
        // Set up transitionend handler
        /* istanbul ignore if: transition events cant be tested in JSDOM */
        if (this.transitionEndEvent) {
          const events = this.transitionEndEvent.split(/\s+/)
          events.forEach(event => eventOn(currentSlide, event, onceTransEnd, EventOptions))
        }
        // Fallback to setTimeout()
        this._animationTimeout = setTimeout(onceTransEnd, TRANS_DURATION)
      }
      if (isCycling) {
        this.start(false)
      }
    },
    // Update slide list
    updateSlides() {
      this.pause(true)
      // Get all slides as DOM elements
      this.slides = selectAll('.carousel-item', this.$refs.inner)
      const numSlides = this.slides.length
      // Keep slide number in range
      const index = Math.max(0, Math.min(Math.floor(this.index), numSlides - 1))
      this.slides.forEach((slide, idx) => {
        const n = idx + 1
        if (idx === index) {
          addClass(slide, 'active')
          setAttr(slide, 'aria-current', 'true')
        } else {
          removeClass(slide, 'active')
          setAttr(slide, 'aria-current', 'false')
        }
        setAttr(slide, 'aria-posinset', String(n))
        setAttr(slide, 'aria-setsize', String(numSlides))
      })
      // Set slide as active
      this.setSlide(index)
      this.start(this.isPaused)
    },
    calcDirection(direction = null, curIndex = 0, nextIndex = 0) {
      if (!direction) {
        return nextIndex > curIndex ? DIRECTION.next : DIRECTION.prev
      }
      return DIRECTION[direction]
    },
    handleClick(evt, fn) {
      const keyCode = evt.keyCode
      if (evt.type === 'click' || keyCode === KeyCodes.SPACE || keyCode === KeyCodes.ENTER) {
        evt.preventDefault()
        evt.stopPropagation()
        fn()
      }
    },
    handleSwipe() /* istanbul ignore next: JSDOM doesn't support touch events */ {
      const absDeltaX = Math.abs(this.touchDeltaX)
      if (absDeltaX <= SWIPE_THRESHOLD) {
        return
      }
      const direction = absDeltaX / this.touchDeltaX
      if (direction > 0) {
        // Swipe left
        this.prev()
      } else if (direction < 0) {
        // Swipe right
        this.next()
      }
    },
    touchStart(evt) /* istanbul ignore next: JSDOM doesn't support touch events */ {
      if (hasPointerEventSupport && PointerType[evt.pointerType.toUpperCase()]) {
        this.touchStartX = evt.clientX
      } else if (!hasPointerEventSupport) {
        this.touchStartX = evt.touches[0].clientX
      }
    },
    touchMove(evt) /* istanbul ignore next: JSDOM doesn't support touch events */ {
      // Ensure swiping with one touch and not pinching
      if (evt.touches && evt.touches.length > 1) {
        this.touchDeltaX = 0
      } else {
        this.touchDeltaX = evt.touches[0].clientX - this.touchStartX
      }
    },
    touchEnd(evt) /* istanbul ignore next: JSDOM doesn't support touch events */ {
      if (hasPointerEventSupport && PointerType[evt.pointerType.toUpperCase()]) {
        this.touchDeltaX = evt.clientX - this.touchStartX
      }
      this.handleSwipe()
      // If it's a touch-enabled device, mouseenter/leave are fired as
      // part of the mouse compatibility events on first tap - the carousel
      // would stop cycling until user tapped out of it;
      // here, we listen for touchend, explicitly pause the carousel
      // (as if it's the second time we tap on it, mouseenter compat event
      // is NOT fired) and after a timeout (to allow for mouse compatibility
      // events to fire) we explicitly restart cycling
      this.pause(false)
      if (this._touchTimeout) {
        clearTimeout(this._touchTimeout)
      }
      this._touchTimeout = setTimeout(
        this.start,
        TOUCH_EVENT_COMPAT_WAIT + Math.max(1000, this.interval)
      )
    }
  },
  render(h) {
    // Wrapper for slides
    const inner = h(
      'div',
      {
        ref: 'inner',
        class: ['carousel-inner'],
        attrs: {
          id: this.safeId('__BV_inner_'),
          role: 'list'
        }
      },
      [this.normalizeSlot('default')]
    )

    // Prev and next controls
    let controls = h(false)
    if (this.controls) {
      controls = [
        h(
          'a',
          {
            class: ['carousel-control-prev'],
            attrs: { href: '#', role: 'button', 'aria-controls': this.safeId('__BV_inner_') },
            on: {
              click: evt => {
                this.handleClick(evt, this.prev)
              },
              keydown: evt => {
                this.handleClick(evt, this.prev)
              }
            }
          },
          [
            h('span', { class: ['carousel-control-prev-icon'], attrs: { 'aria-hidden': 'true' } }),
            h('span', { class: ['sr-only'] }, [this.labelPrev])
          ]
        ),
        h(
          'a',
          {
            class: ['carousel-control-next'],
            attrs: { href: '#', role: 'button', 'aria-controls': this.safeId('__BV_inner_') },
            on: {
              click: evt => {
                this.handleClick(evt, this.next)
              },
              keydown: evt => {
                this.handleClick(evt, this.next)
              }
            }
          },
          [
            h('span', { class: ['carousel-control-next-icon'], attrs: { 'aria-hidden': 'true' } }),
            h('span', { class: ['sr-only'] }, [this.labelNext])
          ]
        )
      ]
    }

    // Indicators
    const indicators = h(
      'ol',
      {
        class: ['carousel-indicators'],
        directives: [
          { name: 'show', rawName: 'v-show', value: this.indicators, expression: 'indicators' }
        ],
        attrs: {
          id: this.safeId('__BV_indicators_'),
          'aria-hidden': this.indicators ? 'false' : 'true',
          'aria-label': this.labelIndicators,
          'aria-owns': this.safeId('__BV_inner_')
        }
      },
      this.slides.map((slide, n) => {
        return h('li', {
          key: `slide_${n}`,
          class: { active: n === this.index },
          attrs: {
            role: 'button',
            id: this.safeId(`__BV_indicator_${n + 1}_`),
            tabindex: this.indicators ? '0' : '-1',
            'aria-current': n === this.index ? 'true' : 'false',
            'aria-label': `${this.labelGotoSlide} ${n + 1}`,
            'aria-describedby': this.slides[n].id || null,
            'aria-controls': this.safeId('__BV_inner_')
          },
          on: {
            click: evt => {
              this.handleClick(evt, () => {
                this.setSlide(n)
              })
            },
            keydown: evt => {
              this.handleClick(evt, () => {
                this.setSlide(n)
              })
            }
          }
        })
      })
    )

    const on = {
      mouseenter: this.noHoverPause ? noop : this.pause,
      mouseleave: this.noHoverPause ? noop : this.restart,
      focusin: this.pause,
      focusout: this.restart,
      keydown: evt => {
        if (/input|textarea/i.test(evt.target.tagName)) {
          /* istanbul ignore next */
          return
        }
        const keyCode = evt.keyCode
        if (keyCode === KeyCodes.LEFT || keyCode === KeyCodes.RIGHT) {
          evt.preventDefault()
          evt.stopPropagation()
          this[keyCode === KeyCodes.LEFT ? 'prev' : 'next']()
        }
      }
    }
    // Touch support event handlers for environment
    if (!this.noTouch && hasTouchSupport) {
      // Attach appropriate listeners (prepend event name with '&' for passive mode)
      /* istanbul ignore next: JSDOM doesn't support touch events */
      if (hasPointerEventSupport) {
        on['&pointerdown'] = this.touchStart
        on['&pointerup'] = this.touchEnd
      } else {
        on['&touchstart'] = this.touchStart
        on['&touchmove'] = this.touchMove
        on['&touchend'] = this.touchEnd
      }
    }

    // Return the carousel
    return h(
      'div',
      {
        staticClass: 'carousel',
        class: {
          slide: !this.noAnimation,
          'carousel-fade': !this.noAnimation && this.fade,
          'pointer-event': !this.noTouch && hasTouchSupport && hasPointerEventSupport
        },
        style: { background: this.background },
        attrs: {
          role: 'region',
          id: this.safeId(),
          'aria-busy': this.isSliding ? 'true' : 'false'
        },
        on
      },
      [inner, controls, indicators]
    )
  }
})

export default BCarousel
