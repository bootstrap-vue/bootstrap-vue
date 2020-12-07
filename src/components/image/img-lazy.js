import { Vue } from '../../vue'
import { NAME_IMG_LAZY } from '../../constants/components'
import { HAS_INTERACTION_OBSERVER_SUPPORT } from '../../constants/env'
import { MODEL_EVENT_NAME_PREFIX } from '../../constants/events'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_NUMBER_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { concat } from '../../utils/array'
import { identity } from '../../utils/identity'
import { toInteger } from '../../utils/number'
import { omit } from '../../utils/object'
import { makeProp, makePropsConfigurable, pluckProps } from '../../utils/props'
import { VBVisible } from '../../directives/visible/visible'
import { BImg, props as BImgProps } from './img'

// --- Constants ---

const MODEL_PROP_NAME_SHOW = 'show'
const MODEL_EVENT_NAME_SHOW = MODEL_EVENT_NAME_PREFIX + MODEL_PROP_NAME_SHOW

// --- Props ---

const imgProps = omit(BImgProps, ['blank'])

export const props = makePropsConfigurable(
  {
    ...imgProps,
    blankColor: makeProp(PROP_TYPE_STRING, 'transparent'),
    blankHeight: makeProp(PROP_TYPE_NUMBER_STRING),
    // If `null`, a blank image is generated
    blankSrc: makeProp(PROP_TYPE_STRING, null),
    blankWidth: makeProp(PROP_TYPE_NUMBER_STRING),
    // Distance away from viewport (in pixels)
    // before being considered "visible"
    offset: makeProp(PROP_TYPE_NUMBER_STRING, 360),
    [MODEL_PROP_NAME_SHOW]: makeProp(PROP_TYPE_BOOLEAN, false)
  },
  NAME_IMG_LAZY
)

// --- Main component ---

// @vue/component
export const BImgLazy = /*#__PURE__*/ Vue.extend({
  name: NAME_IMG_LAZY,
  directives: {
    'b-visible': VBVisible
  },
  props,
  data() {
    return {
      isShown: this[MODEL_PROP_NAME_SHOW]
    }
  },
  computed: {
    computedSrc() {
      const { blankSrc } = this
      return !blankSrc || this.isShown ? this.src : blankSrc
    },
    computedBlank() {
      return !(this.isShown || this.blankSrc)
    },
    computedWidth() {
      const { width } = this
      return this.isShown ? width : this.blankWidth || width
    },
    computedHeight() {
      const { height } = this
      return this.isShown ? height : this.blankHeight || height
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
    [MODEL_PROP_NAME_SHOW](newValue, oldValue) {
      if (newValue !== oldValue) {
        // If `IntersectionObserver` support is not available, image is always shown
        const visible = HAS_INTERACTION_OBSERVER_SUPPORT ? newValue : true

        this.isShown = visible

        // Ensure the show prop is synced (when no `IntersectionObserver`)
        if (visible !== newValue) {
          this.$nextTick(this.updateShowProp)
        }
      }
    },
    isShown(newValue, oldValue) {
      // Update synched show prop
      if (newValue !== oldValue) {
        this.updateShowProp()
      }
    }
  },
  mounted() {
    // If `IntersectionObserver` is not available, image is always shown
    this.isShown = HAS_INTERACTION_OBSERVER_SUPPORT ? this[MODEL_PROP_NAME_SHOW] : true
  },
  methods: {
    updateShowProp() {
      this.$emit(MODEL_EVENT_NAME_SHOW, this.isShown)
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
        ...pluckProps(imgProps, this.$props)
      }
    })
  }
})
