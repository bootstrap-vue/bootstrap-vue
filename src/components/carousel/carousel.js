import { Vue } from '../../vue'
import { NAME_CAROUSEL } from '../../constants/components'
import { IS_BROWSER, HAS_POINTER_EVENT_SUPPORT, HAS_TOUCH_SUPPORT } from '../../constants/env'
import {
  EVENT_NAME_PAUSED,
  EVENT_NAME_SLIDING_END,
  EVENT_NAME_SLIDING_START,
  EVENT_NAME_UNPAUSED,
  EVENT_OPTIONS_NO_CAPTURE
} from '../../constants/events'
import { CODE_ENTER, CODE_LEFT, CODE_RIGHT, CODE_SPACE } from '../../constants/key-codes'
import {
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_NUMBER,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import {
  addClass,
  getActiveElement,
  reflow,
  removeClass,
  requestAF,
  selectAll,
  setAttr
} from '../../utils/dom'
import { eventOn, eventOff, stopEvent } from '../../utils/events'
import { isUndefined } from '../../utils/inspect'
import { mathAbs, mathFloor, mathMax, mathMin } from '../../utils/math'
import { makeModelMixin } from '../../utils/model'
import { toInteger } from '../../utils/number'
import { noop } from '../../utils/noop'
import { sortKeys } from '../../utils/object'
import { observeDom } from '../../utils/observe-dom'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { idMixin, props as idProps } from '../../mixins/id'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Constants ---

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('value', {
  type: PROP_TYPE_NUMBER,
  defaultValue: 0
})

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

// --- Helper methods ---

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

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...modelProps,
    background: makeProp(PROP_TYPE_STRING),
    controls: makeProp(PROP_TYPE_BOOLEAN, false),
    // Enable cross-fade animation instead of slide animation
    fade: makeProp(PROP_TYPE_BOOLEAN, false),
    // Sniffed by carousel-slide
    imgHeight: makeProp(PROP_TYPE_NUMBER_STRING),
    // Sniffed by carousel-slide
    imgWidth: makeProp(PROP_TYPE_NUMBER_STRING),
    indicators: makeProp(PROP_TYPE_BOOLEAN, false),
    interval: makeProp(PROP_TYPE_NUMBER, 5000),
    labelGotoSlide: makeProp(PROP_TYPE_STRING, 'Goto slide'),
    labelIndicators: makeProp(PROP_TYPE_STRING, 'Select a slide to display'),
    labelNext: makeProp(PROP_TYPE_STRING, 'Next slide'),
    labelPrev: makeProp(PROP_TYPE_STRING, 'Previous slide'),
    // Disable slide/fade animation
    noAnimation: makeProp(PROP_TYPE_BOOLEAN, false),
    // Disable pause on hover
    noHoverPause: makeProp(PROP_TYPE_BOOLEAN, false),
    // Sniffed by carousel-slide
    noTouch: makeProp(PROP_TYPE_BOOLEAN, false),
    // Disable wrapping/looping when start/end is reached
    noWrap: makeProp(PROP_TYPE_BOOLEAN, false)
  }),
  NAME_CAROUSEL
)

// --- Main component ---

// @vue/component
export const BCarousel = /*#__PURE__*/ Vue.extend({
  name: NAME_CAROUSEL,
  mixins: [idMixin, modelMixin, normalizeSlotMixin],
  provide() {
    return { bvCarousel: this }
  },
  props,
  data() {
    return {
      index: this[MODEL_PROP_NAME] || 0,
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
    [MODEL_PROP_NAME](newValue, oldValue) {
      if (newValue !== oldValue) {
        this.setSlide(toInteger(newValue, 0))
      }
    },
    interval(newValue, oldValue) {
      /* istanbul ignore next */
      if (newValue === oldValue) {
        return
      }
      if (!newValue) {
        // Pausing slide show
        this.pause(false)
      } else {
        // Restarting or Changing interval
        this.pause(true)
        this.start(false)
      }
    },
    isPaused(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit(newValue ? EVENT_NAME_PAUSED : EVENT_NAME_UNPAUSED)
      }
    },
    index(to, from) {
      /* istanbul ignore next */
      if (to === from || this.isSliding) {
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
      if (IS_BROWSER && document.visibilityState && document.hidden) {
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
        this.$once(EVENT_NAME_SLIDING_END, () => {
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
      if (noWrap && this.index !== slide && this.index !== this[MODEL_PROP_NAME]) {
        this.$emit(MODEL_EVENT_NAME, this.index)
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
    pause(event) {
      if (!event) {
        this.isPaused = true
      }
      this.clearInterval()
    },
    // Start auto rotate slides
    start(event) {
      if (!event) {
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
      this.$emit(EVENT_NAME_SLIDING_START, to)
      // Update v-model
      this.$emit(MODEL_EVENT_NAME, this.index)
      if (this.noAnimation) {
        addClass(nextSlide, 'active')
        removeClass(currentSlide, 'active')
        this.isSliding = false
        // Notify ourselves that we're done sliding (slid)
        this.$nextTick(() => this.$emit(EVENT_NAME_SLIDING_END, to))
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
            events.forEach(event =>
              eventOff(nextSlide, event, onceTransEnd, EVENT_OPTIONS_NO_CAPTURE)
            )
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
          this.$nextTick(() => this.$emit(EVENT_NAME_SLIDING_END, to))
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
    handleClick(event, fn) {
      const keyCode = event.keyCode
      if (event.type === 'click' || keyCode === CODE_SPACE || keyCode === CODE_ENTER) {
        stopEvent(event)
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
    touchStart(event) {
      if (HAS_POINTER_EVENT_SUPPORT && PointerType[event.pointerType.toUpperCase()]) {
        this.touchStartX = event.clientX
      } else if (!HAS_POINTER_EVENT_SUPPORT) {
        this.touchStartX = event.touches[0].clientX
      }
    },
    /* istanbul ignore next: JSDOM doesn't support touch events */
    touchMove(event) {
      // Ensure swiping with one touch and not pinching
      if (event.touches && event.touches.length > 1) {
        this.touchDeltaX = 0
      } else {
        this.touchDeltaX = event.touches[0].clientX - this.touchStartX
      }
    },
    /* istanbul ignore next: JSDOM doesn't support touch events */
    touchEnd(event) {
      if (HAS_POINTER_EVENT_SUPPORT && PointerType[event.pointerType.toUpperCase()]) {
        this.touchDeltaX = event.clientX - this.touchStartX
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
    const {
      indicators,
      background,
      noAnimation,
      noHoverPause,
      noTouch,
      index,
      isSliding,
      pause,
      restart,
      touchStart,
      touchEnd
    } = this
    const idInner = this.safeId('__BV_inner_')

    // Wrapper for slides
    const $inner = h(
      'div',
      {
        staticClass: 'carousel-inner',
        attrs: {
          id: idInner,
          role: 'list'
        },
        ref: 'inner'
      },
      [this.normalizeSlot()]
    )

    // Prev and next controls
    let $controls = h()
    if (this.controls) {
      const makeControl = (direction, label, handler) => {
        const handlerWrapper = event => {
          /* istanbul ignore next */
          if (!isSliding) {
            this.handleClick(event, handler)
          } else {
            stopEvent(event, { propagation: false })
          }
        }

        return h(
          'a',
          {
            staticClass: `carousel-control-${direction}`,
            attrs: {
              href: '#',
              role: 'button',
              'aria-controls': idInner,
              'aria-disabled': isSliding ? 'true' : null
            },
            on: {
              click: handlerWrapper,
              keydown: handlerWrapper
            }
          },
          [
            h('span', {
              staticClass: `carousel-control-${direction}-icon`,
              attrs: { 'aria-hidden': 'true' }
            }),
            h('span', { class: 'sr-only' }, [label])
          ]
        )
      }

      $controls = [
        makeControl('prev', this.labelPrev, this.prev),
        makeControl('next', this.labelNext, this.next)
      ]
    }

    // Indicators
    const $indicators = h(
      'ol',
      {
        staticClass: 'carousel-indicators',
        directives: [{ name: 'show', value: indicators }],
        attrs: {
          id: this.safeId('__BV_indicators_'),
          'aria-hidden': indicators ? 'false' : 'true',
          'aria-label': this.labelIndicators,
          'aria-owns': idInner
        }
      },
      this.slides.map((slide, i) => {
        const handler = event => {
          this.handleClick(event, () => {
            this.setSlide(i)
          })
        }

        return h('li', {
          class: { active: i === index },
          attrs: {
            role: 'button',
            id: this.safeId(`__BV_indicator_${i + 1}_`),
            tabindex: indicators ? '0' : '-1',
            'aria-current': i === index ? 'true' : 'false',
            'aria-label': `${this.labelGotoSlide} ${i + 1}`,
            'aria-describedby': slide.id || null,
            'aria-controls': idInner
          },
          on: {
            click: handler,
            keydown: handler
          },
          key: `slide_${i}`
        })
      })
    )

    const on = {
      mouseenter: noHoverPause ? noop : pause,
      mouseleave: noHoverPause ? noop : restart,
      focusin: pause,
      focusout: restart,
      keydown: event => {
        /* istanbul ignore next */
        if (/input|textarea/i.test(event.target.tagName)) {
          return
        }
        const { keyCode } = event
        if (keyCode === CODE_LEFT || keyCode === CODE_RIGHT) {
          stopEvent(event)
          this[keyCode === CODE_LEFT ? 'prev' : 'next']()
        }
      }
    }
    // Touch support event handlers for environment
    if (HAS_TOUCH_SUPPORT && !noTouch) {
      // Attach appropriate listeners (prepend event name with '&' for passive mode)
      /* istanbul ignore next: JSDOM doesn't support touch events */
      if (HAS_POINTER_EVENT_SUPPORT) {
        on['&pointerdown'] = touchStart
        on['&pointerup'] = touchEnd
      } else {
        on['&touchstart'] = touchStart
        on['&touchmove'] = this.touchMove
        on['&touchend'] = touchEnd
      }
    }

    // Return the carousel
    return h(
      'div',
      {
        staticClass: 'carousel',
        class: {
          slide: !noAnimation,
          'carousel-fade': !noAnimation && this.fade,
          'pointer-event': HAS_TOUCH_SUPPORT && HAS_POINTER_EVENT_SUPPORT && !noTouch
        },
        style: { background },
        attrs: {
          role: 'region',
          id: this.safeId(),
          'aria-busy': isSliding ? 'true' : 'false'
        },
        on
      },
      [$inner, $controls, $indicators]
    )
  }
})
