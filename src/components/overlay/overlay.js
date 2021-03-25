import { Vue } from '../../vue'
import { NAME_OVERLAY } from '../../constants/components'
import { EVENT_NAME_CLICK, EVENT_NAME_HIDDEN, EVENT_NAME_SHOWN } from '../../constants/events'
import {
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_STRING,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { SLOT_NAME_OVERLAY } from '../../constants/slots'
import { toFloat } from '../../utils/number'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { BSpinner } from '../spinner/spinner'
import { BVTransition } from '../transition/bv-transition'

// --- Constants ---

const POSITION_COVER = { top: 0, left: 0, bottom: 0, right: 0 }

// --- Props ---

export const props = makePropsConfigurable(
  {
    // Alternative to variant, allowing a specific
    // CSS color to be applied to the overlay
    bgColor: makeProp(PROP_TYPE_STRING),
    blur: makeProp(PROP_TYPE_STRING, '2px'),
    fixed: makeProp(PROP_TYPE_BOOLEAN, false),
    noCenter: makeProp(PROP_TYPE_BOOLEAN, false),
    noFade: makeProp(PROP_TYPE_BOOLEAN, false),
    // If `true, does not render the default slot
    // and switches to absolute positioning
    noWrap: makeProp(PROP_TYPE_BOOLEAN, false),
    opacity: makeProp(PROP_TYPE_NUMBER_STRING, 0.85, value => {
      const number = toFloat(value, 0)
      return number >= 0 && number <= 1
    }),
    overlayTag: makeProp(PROP_TYPE_STRING, 'div'),
    rounded: makeProp(PROP_TYPE_BOOLEAN_STRING, false),
    show: makeProp(PROP_TYPE_BOOLEAN, false),
    spinnerSmall: makeProp(PROP_TYPE_BOOLEAN, false),
    spinnerType: makeProp(PROP_TYPE_STRING, 'border'),
    spinnerVariant: makeProp(PROP_TYPE_STRING),
    variant: makeProp(PROP_TYPE_STRING, 'light'),
    wrapTag: makeProp(PROP_TYPE_STRING, 'div'),
    zIndex: makeProp(PROP_TYPE_NUMBER_STRING, 10)
  },
  NAME_OVERLAY
)

// --- Main component ---

// @vue/component
export const BOverlay = /*#__PURE__*/ Vue.extend({
  name: NAME_OVERLAY,
  mixins: [normalizeSlotMixin],
  props,
  computed: {
    computedRounded() {
      const { rounded } = this
      return rounded === true || rounded === '' ? 'rounded' : !rounded ? '' : `rounded-${rounded}`
    },
    computedVariant() {
      const { variant } = this
      return variant && !this.bgColor ? `bg-${variant}` : ''
    },
    slotScope() {
      return {
        spinnerType: this.spinnerType || null,
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
    const { show, fixed, noFade, noWrap, slotScope } = this

    let $overlay = h()
    if (show) {
      const $background = h('div', {
        staticClass: 'position-absolute',
        class: [this.computedVariant, this.computedRounded],
        style: {
          ...POSITION_COVER,
          opacity: this.opacity,
          backgroundColor: this.bgColor || null,
          backdropFilter: this.blur ? `blur(${this.blur})` : null
        }
      })

      const $content = h(
        'div',
        {
          staticClass: 'position-absolute',
          style: this.noCenter
            ? /* istanbul ignore next */ { ...POSITION_COVER }
            : { top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }
        },
        [this.normalizeSlot(SLOT_NAME_OVERLAY, slotScope) || this.defaultOverlayFn(slotScope)]
      )

      $overlay = h(
        this.overlayTag,
        {
          staticClass: 'b-overlay',
          class: {
            'position-absolute': !noWrap || (noWrap && !fixed),
            'position-fixed': noWrap && fixed
          },
          style: {
            ...POSITION_COVER,
            zIndex: this.zIndex || 10
          },
          on: { click: event => this.$emit(EVENT_NAME_CLICK, event) },
          key: 'overlay'
        },
        [$background, $content]
      )
    }

    // Wrap in a fade transition
    $overlay = h(
      BVTransition,
      {
        props: {
          noFade,
          appear: true
        },
        on: {
          'after-enter': () => this.$emit(EVENT_NAME_SHOWN),
          'after-leave': () => this.$emit(EVENT_NAME_HIDDEN)
        }
      },
      [$overlay]
    )

    if (noWrap) {
      return $overlay
    }

    return h(
      this.wrapTag,
      {
        staticClass: 'b-overlay-wrap position-relative',
        attrs: { 'aria-busy': show ? 'true' : null }
      },
      noWrap ? [$overlay] : [this.normalizeSlot(), $overlay]
    )
  }
})
