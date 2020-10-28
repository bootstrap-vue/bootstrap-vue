import Vue from '../../vue'
import { NAME_IMG_LAZY } from '../../constants/components'
import identity from '../../utils/identity'
import { concat } from '../../utils/array'
import { getComponentConfig } from '../../utils/config'
import { hasIntersectionObserverSupport } from '../../utils/env'
import { toInteger } from '../../utils/number'
import { VBVisible } from '../../directives/visible/visible'
import { BImg } from './img'

export const props = {
  src: {
    type: String,
    required: true
  },
  srcset: {
    type: [String, Array]
    // default: null
  },
  sizes: {
    type: [String, Array]
    // default: null
  },
  alt: {
    type: String
    // default: null
  },
  width: {
    type: [Number, String]
    // default: null
  },
  height: {
    type: [Number, String]
    // default: null
  },
  blankSrc: {
    // If null, a blank image is generated
    type: String,
    default: null
  },
  blankColor: {
    type: String,
    default: () => getComponentConfig(NAME_IMG_LAZY, 'blankColor')
  },
  blankWidth: {
    type: [Number, String]
    // default: null
  },
  blankHeight: {
    type: [Number, String]
    // default: null
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
    // Distance away from viewport (in pixels) before being
    // considered "visible"
    type: [Number, String],
    default: 360
  }
}

// @vue/component
export const BImgLazy = /*#__PURE__*/ Vue.extend({
  name: NAME_IMG_LAZY,
  directives: {
    bVisible: VBVisible
  },
  props,
  data() {
    return {
      isShown: this.show
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
    },
    computedSrcset() {
      const srcset = concat(this.srcset)
        .filter(identity)
        .join(',')
      return !this.blankSrc || this.isShown ? srcset : null
    },
    computedSizes() {
      const sizes = concat(this.sizes)
        .filter(identity)
        .join(',')
      return !this.blankSrc || this.isShown ? sizes : null
    }
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal !== oldVal) {
        // If IntersectionObserver support is not available, image is always shown
        const visible = hasIntersectionObserverSupport ? newVal : true
        this.isShown = visible
        if (visible !== newVal) {
          // Ensure the show prop is synced (when no IntersectionObserver)
          this.$nextTick(this.updateShowProp)
        }
      }
    },
    isShown(newVal, oldVal) {
      if (newVal !== oldVal) {
        // Update synched show prop
        this.updateShowProp()
      }
    }
  },
  mounted() {
    // If IntersectionObserver is not available, image is always shown
    this.isShown = hasIntersectionObserverSupport ? this.show : true
  },
  methods: {
    updateShowProp() {
      this.$emit('update:show', this.isShown)
    },
    doShow(visible) {
      // If IntersectionObserver is not supported, the callback
      // will be called with `null` rather than `true` or `false`
      if ((visible || visible === null) && !this.isShown) {
        this.isShown = true
      }
    }
  },
  render(h) {
    const directives = []
    if (!this.isShown) {
      // We only add the visible directive if we are not shown
      directives.push({
        // Visible directive will silently do nothing if
        // IntersectionObserver is not supported
        name: 'b-visible',
        // Value expects a callback (passed one arg of `visible` = `true` or `false`)
        value: this.doShow,
        modifiers: {
          // Root margin from viewport
          [`${toInteger(this.offset, 0)}`]: true,
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
        srcset: this.computedSrcset || null,
        sizes: this.computedSizes || null,
        // Passthrough props
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
