import Vue from '../../utils/vue'
import normalizeSlotMixin from '../../mixins/normalize-slot'

const positionCover = { top: 0, left: 0, bottom: 0, right: 0 }

export const BOverlay = /*#__PURE__*/ Vue.extend({
  name: 'BOverlay',
  mixins: [normalizeSlotMixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'light'
    },
    bgColor: {
      // Alternative to variant, allowing a specfic
      // CSS color to be applied to the overlay
      type: String,
      default: null
    },
    opacity: {
      type: [Number, String],
      default: 0.8
      // should have a validator to restrict to 0..1
    },
    rounded: {
      type: [Boolean, String],
      default: false
    },
    noCenter: {
      type: Boolean,
      default: false
    },
    spinnerType: {
      type: String,
      default: 'border'
    },
    spinnerVariant: {
      type: String,
      default: null
    },
    spinnerSmall: {
      type: Boolean,
      default: False
    },
    overlayTag: {
      type: String,
      default: 'div'
    },
    wrapTag: {
      type: String,
      default: 'div'
    },
    noWrap: {
      // If set, does not render the default slot
      // and switches to absolute positioning
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 10
    }
  },
  computed: {
    computedRounded() {
      const rounded = this.rounded
      return (
        rounded === true || rounded === ''
          ? 'rounded'
          : !rounded
            ? ''
            : `rounded-${rounded}`
      )
    },
    computedVariant() {
      return this.variant && !this.bgColor ? `bg-${this.variant}` : ''
    },
    overlayScope() {
      return {
        spinnerType: this.spinnerType,
        spinnerVariant: this.spinnerVariant || null,
        spinnerSmall: this.spinnerSmall
      }
    }
  },
  methods: {
    defaultOverlayFn({ spinnerType, spinnerVariant, spinnerSmall }) {
      return this.$createElement(BSpinner, {
        props: {
          type: spinnerType,
          variant: spinnerVariant,
          small: spinnerSmall
        }
      })
    }
  },
  render(h) {
    let $overlay = h()
    if (this.show) {
      const scope = this.overlayScope
      // Overlay backdrop
      const $background = h(
        'div',
        {
          staticClass: 'position-absolute',
          class: [this.computedVariant, this.computedRounded],
          style: {
            ...positionCover,
            opacity: this.opacity,
            backgroundColor: this.bgColor || null
          }
        }
      )
      // Overlay content
      const $content = h(
        'div',
        {
          staticClass: 'position-absolute',
          style: this.noCenter
            ? { ...positionCover }
            : { top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }
        },
        [this.normalizeSlot('overlay', scope) || this.defaultOverlayFn(scope)]
      )
      // Overlay positioning
      $overlay = h(
        this.overlayTag,
        {
          key: 'overlay',
          staticClass: 'b-overlay position-absolute',
          style: { ...positionCover }
        },
        [$background, $content]
      )
    }
    // TODO:
    //   Support transitions (default fade-show)
    //   Wrap $overlay in a BvTansition component
    //
    // $overlay = h(BvTransition, {}, $overlay)

    if (this.noWrap) {
      return $overlay
    }

    return h(
      this.wrapTag,
      {
        staticClass: 'b-overlay-wrap position-relative',
        attrs: { 'aria-busy': this.show ? 'true' : null }
      },
      this.noWrap ? [$overlay] : [this.normalizeSlot('default'), $overlay]
    )
  }
})
