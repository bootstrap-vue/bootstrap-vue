import Vue from '../../utils/vue'
import { BImg } from './img'
import { getComponentConfig } from '../../utils/config'
import { getBCR, eventOn, eventOff } from '../../utils/dom'
import { hasIntersectionObserverSupport } from '../../utils/env'
import { VBVisible } from '../../directives/visible'

const NAME = 'BImgLazy'

// TODO: if we assume user has IntersectionObserver, then these can be removed
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
  // TODO: if we assume user has IntersectionObserver, then this can be removed
  throttle: {
    type: [Number, String],
    default: THROTTLE
  }
}

// @vue/component
export const BImgLazy = /*#__PURE__*/ Vue.extend({
  name: NAME,
  directives: {
    bVisible: VBVisible
  },
  props,
  data() {
    return {
      isShown: false,
      // TODO: if we assume user has IntersectionObserver, then this can be removed
      scrollTimeout: null
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
        // TODO: if we assume user has IntersectionObserver, then this can be removed
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
    // TODO: if we assume user has IntersectionObserver, then this can be removed
    if (this.isShown) {
      this.setListeners(false)
    } else {
      this.setListeners(true)
    }
  },
  activated() /* istanbul ignore next */ {
    // TODO: if we assume user has IntersectionObserver, then this can be removed
    if (!this.isShown) {
      this.setListeners(true)
    }
  },
  deactivated() /* istanbul ignore next */ {
    // TODO: if we assume user has IntersectionObserver, then this can be removed
    this.setListeners(false)
  },
  beforeDestroy() {
    // TODO: if we assume user has IntersectionObserver, then this can be removed
    this.setListeners(false)
  },
  methods: {
    // TODO: if we assume user has IntersectionObserver, then this can be removed
    setListeners(on) {
      if (!hasIntersectionObserverSupport) {
        // We only instantiate these events if the client
        // doesn't have `InteresctionObserver` support
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout)
          this.scrollTimeout = null
        }
        const events = on => {
          const winEvts = ['scroll', 'resize', 'orientationchange']
          const method = on ? eventOn : eventOff
          winEvts.forEach(evt => method(window, evt, this.onScroll, EVENT_OPTIONS))
          method(this.$el, 'load', this.checkView, EVENT_OPTIONS)
          method(document, 'transitionend', this.onScroll, EVENT_OPTIONS)
        }
        events(false)
        if (on) {
          events(true)
        }
      }
    },
    doShow(visible) {
      if (visible && !this.isShown) {
        this.isShown = true
        // TODO: if we assume user has IntersectionObserver, then this can be removed
        this.setListeners(false)
      }
    },
    checkView() {
      // TODO: if we assume user has IntersectionObserver, then this can be removed
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
        this.doShow(true)
      }
    },
    onScroll() {
      // TODO: if we assume user has IntersectionObserver, then this can be removed
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
    const directives = []
    if (!this.isShown) {
      // We only add the visible directive if we are not shown
      directives.push({
        // Visible directive will silently do nothing if
        // `IntersectionObserver` is not supported
        name: 'b-visible',
        // Value expects a callback (passed on arg of visible = true/false)
        value: this.doShow,
        modifiers: {
          // Root margin from viewport
          [`${parseInt(this.offset, 10) || 0}`]: true,
          // Once the image is shown, stop observing
          once: true
        }
      })
    }

    return h(BImg, {
      directives,
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
