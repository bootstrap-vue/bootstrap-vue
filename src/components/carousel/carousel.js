import { observeDom, KeyCodes } from '../../utils'
import { selectAll, reflow, addClass, removeClass, setAttr, eventOn, eventOff } from '../../utils/dom'
import { idMixin } from '../../mixins'

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

// Transition Event names
const TransitionEndEvents = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend oTransitionEnd',
  transition: 'transitionend'
}

// Return the browser specific transitionend event name
function getTransisionEndEvent (el) {
  for (const name in TransitionEndEvents) {
    if (el.style[name] !== undefined) {
      return TransitionEndEvents[name]
    }
  }
  // fallback
  return null
}

export default {
  mixins: [ idMixin ],
  render (h) {
    const t = this

    // Wrapper for slides
    const inner = h(
      'div',
      {
        ref: 'inner',
        class: [ 'carousel-inner' ],
        attrs: {
          id: t.safeId('__BV_inner_'),
          role: 'list'
        }
      },
      [ t.$slots.default ]
    )

    // Prev and Next Controls
    let controls = h(false)
    if (t.controls) {
      controls = [
        h(
          'a',
          {
            class: [ 'carousel-control-prev' ],
            attrs: { href: '#', role: 'button', 'aria-controls': t.safeId('__BV_inner_') },
            on: {
              click: (evt) => {
                evt.preventDefault()
                evt.stopPropagation()
                t.prev()
              },
              keydown: (evt) => {
                const keyCode = evt.keyCode
                if (keyCode === KeyCodes.SPACE || keyCode === KeyCodes.ENTER) {
                  evt.preventDefault()
                  evt.stopPropagation()
                  t.prev()
                }
              }
            }
          },
          [
            h('span', { class: [ 'carousel-control-prev-icon' ], attrs: { 'aria-hidden': 'true' } }),
            h('span', { class: [ 'sr-only' ] }, [ t.labelPrev ])
          ]
        ),
        h(
          'a',
          {
            class: [ 'carousel-control-next' ],
            attrs: { href: '#', role: 'button', 'aria-controls': t.safeId('__BV_inner_') },
            on: {
              click: (evt) => {
                evt.preventDefault()
                evt.stopPropagation()
                t.next()
              },
              keydown: (evt) => {
                const keyCode = evt.keyCode
                if (keyCode === KeyCodes.SPACE || keyCode === KeyCodes.ENTER) {
                  evt.preventDefault()
                  evt.stopPropagation()
                  t.next()
                }
              }
            }
          },
          [
            h('span', { class: [ 'carousel-control-next-icon' ], attrs: { 'aria-hidden': 'true' } }),
            h('span', { class: [ 'sr-only' ] }, [ t.labelNext ])
          ]
        )
      ]
    }

    // Indicators
    const indicators = h(
      'ol',
      {
        class: [ 'carousel-indicators' ],
        directives: [
          { name: 'show', rawName: 'v-show', value: t.indicators, expression: 'indicators' }
        ],
        attrs: {
          id: t.safeId('__BV_indicators_'),
          'aria-hidden': t.indicators ? 'false' : 'true',
          'aria-label': t.labelIndicators,
          'aria-owns': t.safeId('__BV_inner_')
        }
      },
      t.slides.map((slide, n) => {
        return h(
          'li',
          {
            key: `slide_${n}`,
            class: { active: n === t.index },
            attrs: {
              role: 'button',
              id: t.safeId(`__BV_indicator_${n + 1}_`),
              tabindex: t.indicators ? '0' : '-1',
              'aria-current': n === t.index ? 'true' : 'false',
              'aria-label': `${t.labelGotoSlide} ${n + 1}`,
              'aria-describedby': t.slides[n].id || null,
              'aria-controls': t.safeId('__BV_inner_')
            },
            on: {
              click: (evt) => {
                t.setSlide(n)
              },
              keydown: (evt) => {
                const keyCode = evt.keyCode
                if (keyCode === KeyCodes.SPACE || keyCode === KeyCodes.ENTER) {
                  evt.preventDefault()
                  evt.stopPropagation()
                  t.setSlide(n)
                }
              }
            }
          }
        )
      })
    )

    // Return the carousel
    return h(
      'div',
      {
        class: [ 'carousel', 'slide' ],
        style: { background: t.background },
        attrs: {
          role: 'region',
          id: t.safeId(),
          'aria-busy': t.isSliding ? 'true' : 'false'
        },
        on: {
          mouseenter: t.pause,
          mouseleave: t.restart,
          focusin: t.pause,
          focusout: t.restart,
          keydown: (evt) => {
            const keyCode = evt.keyCode
            if (keyCode === KeyCodes.LEFT || keyCode === KeyCodes.RIGHT) {
              evt.preventDefault()
              evt.stopPropagation()
              t[keyCode === KeyCodes.LEFT ? 'prev' : 'next']()
            }
          }
        }
      },
      [ inner, controls, indicators ]
    )
  },
  data () {
    return {
      index: this.value || 0,
      isSliding: false,
      intervalId: null,
      transitionEndEvent: null,
      slides: []
    }
  },
  props: {
    labelPrev: {
      type: String,
      default: 'Previous Slide'
    },
    labelNext: {
      type: String,
      default: 'Next Slide'
    },
    labelGotoSlide: {
      type: String,
      default: 'Goto Slide'
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
    imgWidth: {
      // Sniffed by carousel-slide
      type: [Number, String]
    },
    imgHeight: {
      // Sniffed by carousel-slide
      type: [Number, String]
    },
    background: {
      type: String
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isCycling () {
      return Boolean(this.intervalId)
    }
  },
  methods: {
    // Set slide
    setSlide (slide) {
      // Don't animate when page is not visible
      if (typeof document !== 'undefined' && document.visibilityState && document.hidden) {
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
        this.$once('sliding-end', () => this.setSlide(slide))
        return
      }
      // Make sure we have an integer (you never know!)
      slide = Math.floor(slide)
      // Set new slide index. Wrap around if necessary
      this.index = slide >= len ? 0 : (slide >= 0 ? slide : len - 1)
    },
    // Previous slide
    prev () {
      this.setSlide(this.index - 1)
    },
    // Next slide
    next () {
      this.setSlide(this.index + 1)
    },
    // Pause auto rotation
    pause () {
      if (this.isCycling) {
        clearInterval(this.intervalId)
        this.intervalId = null
        if (this.slides[this.index]) {
          // Make current slide focusable for screen readers
          this.slides[this.index].tabIndex = 0
        }
      }
    },
    // Start auto rotate slides
    start () {
      // Don't start if no intetrval, or if we are already running
      if (!this.interval || this.isCycling) {
        return
      }
      this.slides.forEach(slide => {
        slide.tabIndex = -1
      })
      this.intervalId = setInterval(() => {
        this.next()
      }, Math.max(1000, this.interval))
    },
    // Re-Start auto rotate slides when focus/hover leaves the carousel
    restart (evt) {
      if (!this.$el.contains(document.activeElement)) {
        this.start()
      }
    },
    // Update slide list
    updateSlides () {
      this.pause()
      // Get all slides as DOM elements
      this.slides = selectAll('.carousel-item', this.$refs.inner)
      const numSlides = this.slides.length
      // Keep slide number in range
      const index = Math.max(0, Math.min(Math.floor(this.index), numSlides - 1))
      this.slides.forEach((slide, idx) => {
        const n = idx + 1
        if (idx === index) {
          addClass(slide, 'active')
        } else {
          removeClass(slide, 'active')
        }
        setAttr(slide, 'aria-current', idx === index ? 'true' : 'false')
        setAttr(slide, 'aria-posinset', String(n))
        setAttr(slide, 'aria-setsize', String(numSlides))
        slide.tabIndex = -1
      })
      // Set slide as active
      this.setSlide(index)
      this.start()
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setSlide(newVal)
      }
    },
    interval (newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }
      if (!newVal) {
        // Pausing slide show
        this.pause()
      } else {
        // Restarting or Changing interval
        this.pause()
        this.start()
      }
    },
    index (val, oldVal) {
      if (val === oldVal || this.isSliding) {
        return
      }
      // Determine sliding direction
      let direction = (val > oldVal) ? DIRECTION.next : DIRECTION.prev
      // Rotates
      if (oldVal === 0 && val === this.slides.length - 1) {
        direction = DIRECTION.prev
      } else if (oldVal === this.slides.length - 1 && val === 0) {
        direction = DIRECTION.next
      }
      // Determine current and next slides
      const currentSlide = this.slides[oldVal]
      const nextSlide = this.slides[val]
      // Don't do anything if there aren't any slides to slide to
      if (!currentSlide || !nextSlide) {
        return
      }
      // Start animating
      this.isSliding = true
      this.$emit('sliding-start', val)
      // Update v-model
      this.$emit('input', this.index)
      nextSlide.classList.add(direction.overlayClass)
      // Trigger a reflow of next slide
      reflow(nextSlide)
      addClass(currentSlide, direction.dirClass)
      addClass(nextSlide, direction.dirClass)
      // Transition End handler
      let called = false
      /* istanbul ignore next: dificult to test */
      const onceTransEnd = (evt) => {
        if (called) {
          return
        }
        called = true
        if (this.transitionEndEvent) {
          const events = this.transitionEndEvent.split(/\s+/)
          events.forEach(event => {
            eventOff(currentSlide, event, onceTransEnd)
          })
        }
        this._animationTimeout = null
        removeClass(nextSlide, direction.dirClass)
        removeClass(nextSlide, direction.overlayClass)
        addClass(nextSlide, 'active')
        removeClass(currentSlide, 'active')
        removeClass(currentSlide, direction.dirClass)
        removeClass(currentSlide, direction.overlayClass)
        setAttr(currentSlide, 'aria-current', 'false')
        setAttr(nextSlide, 'aria-current', 'true')
        setAttr(currentSlide, 'aria-hidden', 'true')
        setAttr(nextSlide, 'aria-hidden', 'false')
        currentSlide.tabIndex = -1
        nextSlide.tabIndex = -1
        if (!this.isCycling) {
          // Focus the next slide for screen readers if not in play mode
          nextSlide.tabIndex = 0
          this.$nextTick(() => {
            nextSlide.focus()
          })
        }
        this.isSliding = false
        // Notify ourselves that we're done sliding (slid)
        this.$nextTick(() => this.$emit('sliding-end', val))
      }
      // Clear transition classes after transition ends
      if (this.transitionEndEvent) {
        const events = this.transitionEndEvent.split(/\s+/)
        events.forEach(event => {
          eventOn(currentSlide, event, onceTransEnd)
        })
      }
      // Fallback to setTimeout
      this._animationTimeout = setTimeout(onceTransEnd, TRANS_DURATION)
    }
  },
  created () {
    // Create private non-reactive props
    this._animationTimeout = null
  },
  mounted () {
    // Cache current browser transitionend event name
    this.transitionEndEvent = getTransisionEndEvent(this.$el) || null
    // Get all slides
    this.updateSlides()
    // Observe child changes so we can update slide list
    observeDom(this.$refs.inner, this.updateSlides.bind(this), {
      subtree: false,
      childList: true,
      attributes: true,
      attributeFilter: [ 'id' ]
    })
  },
  /* istanbul ignore next: dificult to test */
  beforeDestroy () {
    clearInterval(this.intervalId)
    clearTimeout(this._animationTimeout)
    this.intervalId = null
    this._animationTimeout = null
  }
}
