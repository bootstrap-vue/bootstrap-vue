import Vue from '../../utils/vue'
import { BImg } from './img'
import { getComponentConfig } from '../../utils/config'
import { getBCR, eventOn, eventOff } from '../../utils/dom'
import { hasIntersectionObserverSupport } from '../../utils/env'

const NAME = 'BImgLazy'

const THROTTLE = 100
const EVENT_OPTIONS = { passive: true, capture: false }

export const props = {
  src: {
    type: String,
    default: null,
    required: true
  },
  alt: {
    type: String,
    default: null
  },
  width: {
    type: [Number, String],
    default: null
  },
  height: {
    type: [Number, String],
    default: null
  },
  blankSrc: {
    // If null, a blank image is generated
    type: String,
    default: null
  },
  blankColor: {
    type: String,
    default: () => getComponentConfig(NAME, 'blankColor')
  },
  blankWidth: {
    type: [Number, String],
    default: null
  },
  blankHeight: {
    type: [Number, String],
    default: null
  },
  show: {
    type: Boolean,
    default: false
  },
  fluid: {
    type: Boolean,
    default: false
  },
  fluidGrow: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  thumbnail: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: [Boolean, String],
    default: false
  },
  left: {
    type: Boolean,
    default: false
  },
  right: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  offset: {
    type: [Number, String],
    default: 360
  },
  throttle: {
    type: [Number, String],
    default: THROTTLE
  }
}

// @vue/component
export const BImgLazy = /*#__PURE__*/ Vue.extend({
  name: NAME,
  props,
  data() {
    return {
      isShown: false,
      scrollTimeout: null,
      observer: null
    }
  },
  computed: {
    computedSrc() {
      return !this.blankSrc || this.isShown ? this.src : this.blankSrc
    },
    computedBlank() {
      return !(this.isShown || this.blankSrc)
    },
    computedWidth() {
      return this.isShown ? this.width : this.blankWidth || this.width
    },
    computedHeight() {
      return this.isShown ? this.height : this.blankHeight || this.height
    }
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.isShown = newVal
        if (!newVal) {
          // Make sure listeners are re-enabled if img is force set to blank
          this.setListeners(true)
        }
      }
    },
    isShown(newVal, oldVal) {
      if (newVal !== oldVal) {
        // Update synched show prop
        this.$emit('update:show', newVal)
      }
    }
  },
  created() {
    this.isShown = this.show
  },
  mounted() {
    if (this.isShown) {
      this.setListeners(false)
    } else {
      this.setListeners(true)
    }
  },
  activated() /* istanbul ignore next */ {
    if (!this.isShown) {
      this.setListeners(true)
    }
  },
  deactivated() /* istanbul ignore next */ {
    this.setListeners(false)
  },
  beforeDestroy() {
    this.setListeners(false)
  },
  methods: {
    setListeners(on) {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout)
        this.scrollTimeout = null
      }
      /* istanbul ignore next: JSDOM doen't support IntersectionObserver */
      if (this.observer) {
        this.observer.unobserve(this.$el)
        this.observer.disconnect()
        this.observer = null
      }
      const winEvts = ['scroll', 'resize', 'orientationchange']
      winEvts.forEach(evt => eventOff(window, evt, this.onScroll, EVENT_OPTIONS))
      eventOff(this.$el, 'load', this.checkView, EVENT_OPTIONS)
      eventOff(document, 'transitionend', this.onScroll, EVENT_OPTIONS)
      if (on) {
        /* istanbul ignore if: JSDOM doen't support IntersectionObserver */
        if (hasIntersectionObserverSupport) {
          this.observer = new IntersectionObserver(this.doShow, {
            root: null, // viewport
            rootMargin: `${parseInt(this.offset, 10) || 0}px`,
            threshold: 0 // percent intersection
          })
          this.observer.observe(this.$el)
        } else {
          // Fallback to scroll/etc events
          winEvts.forEach(evt => eventOn(window, evt, this.onScroll, EVENT_OPTIONS))
          eventOn(this.$el, 'load', this.checkView, EVENT_OPTIONS)
          eventOn(document, 'transitionend', this.onScroll, EVENT_OPTIONS)
        }
      }
    },
    doShow(entries) {
      if (entries && (entries[0].isIntersecting || entries[0].intersectionRatio > 0.0)) {
        this.isShown = true
        this.setListeners(false)
      }
    },
    checkView() {
      // check bounding box + offset to see if we should show
      /* istanbul ignore next: should rarely occur */
      if (this.isShown) {
        this.setListeners(false)
        return
      }
      const offset = parseInt(this.offset, 10) || 0
      const docElement = document.documentElement
      const view = {
        l: 0 - offset,
        t: 0 - offset,
        b: docElement.clientHeight + offset,
        r: docElement.clientWidth + offset
      }
      // JSDOM Doesn't support BCR, but we fake it in the tests
      const box = getBCR(this.$el)
      if (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b) {
        // image is in view (or about to be in view)
        this.doShow([{ isIntersecting: true }])
      }
    },
    onScroll() {
      /* istanbul ignore if: should rarely occur */
      if (this.isShown) {
        this.setListeners(false)
      } else {
        clearTimeout(this.scrollTimeout)
        this.scrollTimeout = setTimeout(this.checkView, parseInt(this.throttle, 10) || THROTTLE)
      }
    }
  },
  render(h) {
    return h(BImg, {
      props: {
        // Computed value props
        src: this.computedSrc,
        blank: this.computedBlank,
        width: this.computedWidth,
        height: this.computedHeight,
        // Passthough props
        alt: this.alt,
        blankColor: this.blankColor,
        fluid: this.fluid,
        fluidGrow: this.fluidGrow,
        block: this.block,
        thumbnail: this.thumbnail,
        rounded: this.rounded,
        left: this.left,
        right: this.right,
        center: this.center
      }
    })
  }
})

export default BImgLazy
