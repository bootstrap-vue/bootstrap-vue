import BImg from '../image/img'
import idMixin from '../../mixins/id'

// Time for mouse compat events to fire after touch
const TOUCHEVENT_COMPAT_WAIT = 500
// Number of pixels to consider touch move a swipe
const SWIPE_THRESHOLD = 40

const HAS_POINTER_EVENT = Boolean(document && window && (window.PointerEvent || window.MSPointerEvent))
const HAS_TOUCH_SUPPORT = document && ('ontouchstart' in document.documentElement) || navigator.maxTouchPoints > 0)
const PointerType = {
  TOUCH: 'touch',
  PEN: 'pen'
}

// @vue/component
export default {
  name: 'BCarouselSlide',
  components: { BImg },
  mixins: [ idMixin ],
  inject: {
    carousel: {
      from: 'carousel',
      default: function () {
        return {
          // Explicitly disable touch if not a child of carousel
          noTouch: true
        }
      }
    }
  },
  props: {
    imgSrc: {
      type: String
      // default: undefined
    },
    imgAlt: {
      type: String
      // default: undefined
    },
    imgWidth: {
      type: [Number, String]
      // default: undefined
    },
    imgHeight: {
      type: [Number, String]
      // default: undefined
    },
    imgBlank: {
      type: Boolean,
      default: false
    },
    imgBlankColor: {
      type: String,
      default: 'transparent'
    },
    contentVisibleUp: {
      type: String
      // default: undefined
    },
    contentTag: {
      type: String,
      default: 'div'
    },
    caption: {
      type: String
      // default: undefined
    },
    captionTag: {
      type: String,
      default: 'h3'
    },
    text: {
      type: String
      // default: undefined
    },
    textTag: {
      type: String,
      default: 'p'
    },
    background: {
      type: String
      // default: undefined
    }
  },
  data () {
    return {
      touchTimeout: null,
      touchStartX: 0,
      touchDeltaX: 0
    }
  },
  computed: {
    contentClasses () {
      return [
        this.contentVisibleUp ? 'd-none' : '',
        this.contentVisibleUp ? `d-${this.contentVisibleUp}-block` : ''
      ]
    },
    computedWidth () {
      // Use local width, or try parent width
      return this.imgWidth || this.carousel.imgWidth || null
    },
    computedHeight () {
      // Use local height, or try parent height
      return this.imgHeight || this.carousel.imgHeight || null
    }
  },
  beforeDestroy () /* istanbul ignore next */ {
    if (this.touchTimeout) {
      clearTimeout(this.touchTimeout)
      this.touchTimeout = null
    }
  },
  methods: {
    handleSwipe () {
      const absDeltax = Math.abs(this.touchDeltaX)
      if (absDeltax <= SWIPE_THRESHOLD) {
        return
      }
      const direction = absDeltax / this.touchDeltaX
      if (direction > 0) {
        // swipe left
        this.carousel.prev()
      } else if (direction < 0) {
        // swipe right
        this.carousel.next()
      }
    },
    touchStart (evt) {
      if (HAS_POINTER_EVENT && PointerType[evt.originalEvent.pointerType.toUpperCase()]) {
        this.touchStartX = evt.originalEvent.clientX
      } else if (!HAS_POINTER_EVENT) {
        this.touchStartX = evt.originalEvent.touches[0].clientX
      }
    },
    touchMove (evt) {
      // ensure swiping with one touch and not pinching
      if (evt.originalEvent.touches && evt.originalEvent.touches.length > 1) {
        this.touchDeltaX = 0
      } else {
        this.touchDeltaX = evt.originalEvent.touches[0].clientX - this.touchStartX
      }
    },
    touchEnd (evt) {
      if (HAS_POINTER_EVENT && PointerType[evt.originalEvent.pointerType.toUpperCase()]) {
        this.touchDeltaX = evt.originalEvent.clientX - this.touchStartX
      }

      this.handleSwipe()
      if (this._config.pause === 'hover') {
        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        this.carousel.pause()
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout)
        }
        this.touchTimeout = setTimeout(this.carousel.start, TOUCHEVENT_COMPAT_WAIT)
      }
    }
  },
  render (h) {
    const $slots = this.$slots

    let img = $slots.img
    if (!img && (this.imgSrc || this.imgBlank)) {
      img = h(
        'b-img',
        {
          props: {
            fluidGrow: true,
            block: true,
            src: this.imgSrc,
            blank: this.imgBlank,
            blankColor: this.imgBlankColor,
            width: this.computedWidth,
            height: this.computedHeight,
            alt: this.imgAlt
          }
        }
      )
    }
    if (!img) {
      img = h(false)
    }

    const content = h(
      this.contentTag,
      { staticClass: 'carousel-caption', class: this.contentClasses },
      [
        this.caption ? h(this.captionTag, { domProps: { innerHTML: this.caption } }) : h(false),
        this.text ? h(this.textTag, { domProps: { innerHTML: this.text } }) : h(false),
        $slots.default
      ]
    )

    // Touch support event handlers
    const on = {}
    if (!this.carousel.noTouch && HAS_TOUCH_SUPPORT) {
      // Prevent default for dragstart
      on.dragstart = (evt) => { evt.preventDefault() }
      // Attach appropriate listeners
      if (HAS_POINTER_EVENT) {
        on.pointerdown = this.touchStart
        on.pointerup = this.touchEnd
      } else {
        on.touchstart = this.touchStart
        on.touchmove = this.touchMove
        on.touchend = this.touchEnd
      }
    }

    return h(
      'div',
      {
        staticClass: 'carousel-item',
        class: {
          'pointer-event': !this.carousel.noTouch && HAS_TOUCH_SUPPORT && HAS_POINTER_EVENT
        },
        style: { background: this.background || this.carousel.background || null },
        attrs: { id: this.safeId(), role: 'listitem' },
        on
      },
      [ img, content ]
    )
  }
}
