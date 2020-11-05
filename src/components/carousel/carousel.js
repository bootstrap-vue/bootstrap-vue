import Vue from '../../vue'
import { NAME_CAROUSEL } from '../../constants/components'
import { EVENT_OPTIONS_NO_CAPTURE } from '../../constants/events'
import { CODE_ENTER, CODE_LEFT, CODE_RIGHT, CODE_SPACE } from '../../constants/key-codes'
import noop from '../../utils/noop'
import observeDom from '../../utils/observe-dom'
import { makePropsConfigurable } from '../../utils/config'
import {
  addClass,
  getActiveElement,
  reflow,
  removeClass,
  requestAF,
  selectAll,
  setAttr
} from '../../utils/dom'
import { isBrowser, hasTouchSupport, hasPointerEventSupport } from '../../utils/env'
import { eventOn, eventOff, stopEvent } from '../../utils/events'
import { isUndefined } from '../../utils/inspect'
import { mathAbs, mathFloor, mathMax, mathMin } from '../../utils/math'
import { toInteger } from '../../utils/number'
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

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

// Return the browser specific transitionEnd event name
const getTransitionEndEvent = el => {
  for (const name in TransitionEndEvents) {
    if (!isUndefined(el.style[name])) {
      return TransitionEndEvents[name]
    }
  }
  // Fallback
  /* istanbul ignore next */
  return null
}

// @vue/component
export const BCarousel = /*#__PURE__*/ Vue.extend({
  name: NAME_CAROUSEL,
  mixins: [idMixin, normalizeSlotMixin],
  provide() {
    return { bvCarousel: this }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: makePropsConfigurable(
    {
      labelPrev: {
        type: String,
        default: 'Previous slide'
      },
      labelNext: {
        type: String,
        default: 'Next slide'
      },
      labelGotoSlide: {
        type: String,
        default: 'Goto slide'
      },
      labelIndicators: {
        type: String,
        default: 'Select a slide to display'
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
      noWrap: {
        // Disable wrapping/looping when start/end is reached
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
    NAME_CAROUSEL
  ),
  data() {
    return {
      index: this.value || 0,
      isSliding: false,
      transitionEndEvent: null,
      slides: [],
      direction: null,
      isPaused: !(toInteger(this.interval, 0) > 0),
      // Touch event handling values
      touchStartX: 0,
      touchDeltaX: 0
    }
  },
  computed: {
    numSlides() {
      return this.slides.length
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setSlide(toInteger(newVal, 0))
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
    this.$_interval = null
    this.$_animationTimeout = null
    this.$_touchTimeout = null
    this.$_observer = null
    // Set initial paused state
    this.isPaused = !(toInteger(this.interval, 0) > 0)
  },
  mounted() {
    // Cache current browser transitionend event name
    this.transitionEndEvent = getTransitionEndEvent(this.$el) || null
    // Get all slides
    this.updateSlides()
    // Observe child changes so we can update slide list
    this.setObserver(true)
  },
  beforeDestroy() {
    this.clearInterval()
    this.clearAnimationTimeout()
    this.clearTouchTimeout()
    this.setObserver(false)
  },
  methods: {
    clearInterval() {
      clearInterval(this.$_interval)
      this.$_interval = null
    },
    clearAnimationTimeout() {
      clearTimeout(this.$_animationTimeout)
      this.$_animationTimeout = null
    },
    clearTouchTimeout() {
      clearTimeout(this.$_touchTimeout)
      this.$_touchTimeout = null
    },
    setObserver(on = false) {
      this.$_observer && this.$_observer.disconnect()
      this.$_observer = null
      if (on) {
        this.$_observer = observeDom(this.$refs.inner, this.updateSlides.bind(this), {
          subtree: false,
          childList: true,
          attributes: true,
          attributeFilter: ['id']
        })
      }
    },
    // Set slide
    setSlide(slide, direction = null) {
      // Don't animate when page is not visible
      /* istanbul ignore if: difficult to test */
      if (isBrowser && document.visibilityState && document.hidden) {
        return
      }
      const noWrap = this.noWrap
      const numSlides = this.numSlides
      // Make sure we have an integer (you never know!)
      slide = mathFloor(slide)
      // Don't do anything if nothing to slide to
      if (numSlides === 0) {
        return
      }
      // Don't change slide while transitioning, wait until transition is done
      if (this.isSliding) {
        // Schedule slide after sliding complete
        this.$once('sliding-end', () => {
          // Wrap in `requestAF()` to allow the slide to properly finish to avoid glitching
          requestAF(() => this.setSlide(slide, direction))
        })
        return
      }
      this.direction = direction
      // Set new slide index
      // Wrap around if necessary (if no-wrap not enabled)
      this.index =
        slide >= numSlides
          ? noWrap
            ? numSlides - 1
            : 0
          : slide < 0
            ? noWrap
              ? 0
              : numSlides - 1
            : slide
      // Ensure the v-model is synched up if no-wrap is enabled
      // and user tried to slide pass either ends
      if (noWrap && this.index !== slide && this.index !== this.value) {
        this.$emit('input', this.index)
      }
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
      this.clearInterval()
    },
    // Start auto rotate slides
    start(evt) {
      if (!evt) {
        this.isPaused = false
      }
      /* istanbul ignore next: most likely will never happen, but just in case */
      this.clearInterval()
      // Don't start if no interval, or less than 2 slides
      if (this.interval && this.numSlides > 1) {
        this.$_interval = setInterval(this.next, mathMax(1000, this.interval))
      }
    },
    // Restart auto rotate slides when focus/hover leaves the carousel
    /* istanbul ignore next */
    restart() {
      if (!this.$el.contains(getActiveElement())) {
        this.start()
      }
    },
    doSlide(to, from) {
      const isCycling = Boolean(this.interval)
      // Determine sliding direction
      const direction = this.calcDirection(this.direction, from, to)
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
        const onceTransEnd = () => {
          if (called) {
            return
          }
          called = true
          /* istanbul ignore if: transition events cant be tested in JSDOM */
          if (this.transitionEndEvent) {
            const events = this.transitionEndEvent.split(/\s+/)
            events.forEach(evt => eventOff(nextSlide, evt, onceTransEnd, EVENT_OPTIONS_NO_CAPTURE))
          }
          this.clearAnimationTimeout()
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
          events.forEach(event => eventOn(nextSlide, event, onceTransEnd, EVENT_OPTIONS_NO_CAPTURE))
        }
        // Fallback to setTimeout()
        this.$_animationTimeout = setTimeout(onceTransEnd, TRANS_DURATION)
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
      const index = mathMax(0, mathMin(mathFloor(this.index), numSlides - 1))
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
      if (evt.type === 'click' || keyCode === CODE_SPACE || keyCode === CODE_ENTER) {
        stopEvent(evt)
        fn()
      }
    },
    /* istanbul ignore next: JSDOM doesn't support touch events */
    handleSwipe() {
      const absDeltaX = mathAbs(this.touchDeltaX)
      if (absDeltaX <= SWIPE_THRESHOLD) {
        return
      }
      const direction = absDeltaX / this.touchDeltaX
      // Reset touch delta X
      // https://github.com/twbs/bootstrap/pull/28558
      this.touchDeltaX = 0
      if (direction > 0) {
        // Swipe left
        this.prev()
      } else if (direction < 0) {
        // Swipe right
        this.next()
      }
    },
    /* istanbul ignore next: JSDOM doesn't support touch events */
    touchStart(evt) {
      if (hasPointerEventSupport && PointerType[evt.pointerType.toUpperCase()]) {
        this.touchStartX = evt.clientX
      } else if (!hasPointerEventSupport) {
        this.touchStartX = evt.touches[0].clientX
      }
    },
    /* istanbul ignore next: JSDOM doesn't support touch events */
    touchMove(evt) {
      // Ensure swiping with one touch and not pinching
      if (evt.touches && evt.touches.length > 1) {
        this.touchDeltaX = 0
      } else {
        this.touchDeltaX = evt.touches[0].clientX - this.touchStartX
      }
    },
    /* istanbul ignore next: JSDOM doesn't support touch events */
    touchEnd(evt) {
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
      this.clearTouchTimeout()
      this.$_touchTimeout = setTimeout(
        this.start,
        TOUCH_EVENT_COMPAT_WAIT + mathMax(1000, this.interval)
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
      [this.normalizeSlot()]
    )

    // Prev and next controls
    let controls = h()
    if (this.controls) {
      const prevHandler = evt => {
        /* istanbul ignore next */
        if (!this.isSliding) {
          this.handleClick(evt, this.prev)
        } else {
          stopEvent(evt, { propagation: false })
        }
      }
      const nextHandler = evt => {
        /* istanbul ignore next */
        if (!this.isSliding) {
          this.handleClick(evt, this.next)
        } else {
          stopEvent(evt, { propagation: false })
        }
      }
      controls = [
        h(
          'a',
          {
            class: ['carousel-control-prev'],
            attrs: {
              href: '#',
              role: 'button',
              'aria-controls': this.safeId('__BV_inner_'),
              'aria-disabled': this.isSliding ? 'true' : null
            },
            on: {
              click: prevHandler,
              keydown: prevHandler
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
            attrs: {
              href: '#',
              role: 'button',
              'aria-controls': this.safeId('__BV_inner_'),
              'aria-disabled': this.isSliding ? 'true' : null
            },
            on: {
              click: nextHandler,
              keydown: nextHandler
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
        if (keyCode === CODE_LEFT || keyCode === CODE_RIGHT) {
          stopEvent(evt)
          this[keyCode === CODE_LEFT ? 'prev' : 'next']()
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
