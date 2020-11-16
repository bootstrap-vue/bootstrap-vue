import { defineComponent, h, resolveDirective } from '../../vue'
import { NAME_IMG_LAZY } from '../../constants/components'
import { EVENT_NAME_MODEL_PREFIX } from '../../constants/events'
import identity from '../../utils/identity'
import { concat } from '../../utils/array'
import { makePropsConfigurable } from '../../utils/config'
import { hasIntersectionObserverSupport } from '../../utils/env'
import { toInteger } from '../../utils/number'
import { omit } from '../../utils/object'
import { VBVisible } from '../../directives/visible/visible'
import { BImg, props as BImgProps } from './img'

// --- Constants ---

const PROP_NAME_SHOW = 'show'

const EVENT_NAME_MODEL_SHOW = EVENT_NAME_MODEL_PREFIX + PROP_NAME_SHOW

// --- Props ---

export const props = makePropsConfigurable(
  {
    ...omit(BImgProps, ['blank']),
    [PROP_NAME_SHOW]: {
      type: Boolean,
      default: false
    },
    blankSrc: {
      // If null, a blank image is generated
      type: String,
      default: null
    },
    blankColor: {
      type: String,
      default: 'transparent'
    },
    blankWidth: {
      type: [Number, String]
      // default: null
    },
    blankHeight: {
      type: [Number, String]
      // default: null
    },
    offset: {
      // Distance away from viewport (in pixels) before being
      // considered "visible"
      type: [Number, String],
      default: 360
    }
  },
  NAME_IMG_LAZY
)

// --- Main component ---
// @vue/component
export const BImgLazy = /*#__PURE__*/ defineComponent({
  name: NAME_IMG_LAZY,
  directives: { VBVisible },
  props,
  data() {
    return {
      isShown: this[PROP_NAME_SHOW]
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
    [PROP_NAME_SHOW](newValue, oldValue) {
      if (newValue !== oldValue) {
        // If `IntersectionObserver` support is not available, image is always shown
        const visible = hasIntersectionObserverSupport ? newValue : true
        this.isShown = visible
        if (visible !== newValue) {
          // Ensure the show prop is synced (when no `IntersectionObserver`)
          this.$nextTick(this.updateShowProp)
        }
      }
    },
    isShown(newValue, oldValue) {
      if (newValue !== oldValue) {
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
      this.$emit(EVENT_NAME_MODEL_SHOW, this.isShown)
    },
    doShow(visible) {
      // If IntersectionObserver is not supported, the callback
      // will be called with `null` rather than `true` or `false`
      if ((visible || visible === null) && !this.isShown) {
        this.isShown = true
      }
    }
  },
  render() {
    const directives = []
    if (!this.isShown) {
      // We only add the visible directive if we are not shown
      directives.push({
        // Visible directive will silently do nothing if
        // IntersectionObserver is not supported
        name: resolveDirective('VBVisible'),
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
